"use client";

import { useCallback, useMemo, useState } from "react";
import { HelpCircle, Search } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/use-translations";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { fetchFaqs } from "@/lib/api";
import type { Faq, FaqCategory } from "@/lib/api/faqs/types";
import { cn } from "@/lib/utils";

interface FaqClientProps {
  initialFaqs: Faq[];
  initialCategories: FaqCategory[];
  initialError: string | null;
}

const UNCATEGORIZED_KEY = "__uncategorized__";

interface Bucket {
  key: string;
  name: string;
}

export default function FaqClient({
  initialFaqs,
  initialCategories,
  initialError,
}: FaqClientProps) {
  const { t, locale } = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category")?.trim() || "all";

  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [error, setError] = useState<string | null>(initialError);
  const [reloading, setReloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const reload = useCallback(async () => {
    setReloading(true);
    setError(null);
    try {
      const result = await fetchFaqs({ perPage: 100 });
      setFaqs(result);
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setError(err instanceof Error ? err.message : "Failed to load FAQs");
    } finally {
      setReloading(false);
    }
  }, []);

  // Category buckets in catalogue order, with uncategorized last.
  const buckets = useMemo<Bucket[]>(() => {
    const present = new Set(
      faqs.map((faq) => faq.categorySlug || UNCATEGORIZED_KEY)
    );
    const ordered: Bucket[] = [];
    for (const category of initialCategories) {
      if (present.has(category.slug)) {
        ordered.push({ key: category.slug, name: category.name });
      }
    }
    if (present.has(UNCATEGORIZED_KEY)) {
      ordered.push({ key: UNCATEGORIZED_KEY, name: t("faq.generalCategory") });
    }
    return ordered;
  }, [faqs, initialCategories, t]);

  // Search narrows the working set; counts and the ledger derive from it.
  const matched = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase(locale);
    if (!query) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLocaleLowerCase(locale).includes(query) ||
        faq.answer.toLocaleLowerCase(locale).includes(query)
    );
  }, [faqs, searchQuery, locale]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const faq of matched) {
      const key = faq.categorySlug || UNCATEGORIZED_KEY;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [matched]);

  const visible = useMemo(() => {
    if (selectedCategory === "all") return matched;
    return matched.filter(
      (faq) => (faq.categorySlug || UNCATEGORIZED_KEY) === selectedCategory
    );
  }, [matched, selectedCategory]);

  // Group the visible entries by bucket so the ledger reads as a guide.
  const groups = useMemo(() => {
    return buckets
      .map((bucket) => ({
        ...bucket,
        items: visible.filter(
          (faq) => (faq.categorySlug || UNCATEGORIZED_KEY) === bucket.key
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [buckets, visible]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === "all") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      router.replace(
        {
          pathname: "/faq",
          query: Object.fromEntries(params),
        },
        { scroll: false }
      );
    },
    [router, searchParams]
  );

  const toggle = useCallback((id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const railItems = [
    { key: "all", name: t("faq.allCategories"), count: matched.length },
    ...buckets.map((bucket) => ({
      key: bucket.key,
      name: bucket.name,
      count: counts.get(bucket.key) ?? 0,
    })),
  ];

  const showGroupHeadings = groups.length > 1;
  const hasResults = visible.length > 0;

  return (
    <PageShell showFooterNewsletter={false}>
      {/* Masthead — quiet porcelain, search promoted as the real task */}
      <section className="border-b border-border pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12">
          <span className="golzar-seam mb-4 max-w-[7rem]">
            <span className="petal-dot" aria-hidden="true" />
            <span className="h-px flex-1" aria-hidden="true" />
          </span>
          <h1 className="font-display max-w-2xl text-4xl leading-[1.04] tracking-tight text-foreground sm:text-6xl">
            {t("faq.heading")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("faq.subtitle")}
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t("faq.searchPlaceholder")}
              aria-label={t("faq.searchPlaceholder")}
              className="h-11 ps-9"
            />
          </div>
        </div>
      </section>

      {/* Index rail + hairline ledger */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>
              <p>{t("faq.loadError")}</p>
              <button
                className="mt-4 rounded-sm text-sm underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                onClick={reload}
                disabled={reloading}
              >
                {reloading ? t("faq.retrying") : t("faq.tryAgain")}
              </button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
            {/* Rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p
                id="faq-index-label"
                className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
              >
                {t("faq.indexLabel")}
              </p>
              {/* Mobile: hairline tab row · Desktop: vertical index */}
              <ul
                aria-labelledby="faq-index-label"
                className="mt-4 flex gap-x-5 overflow-x-auto pb-1 lg:mt-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
              >
                {railItems.map((item) => {
                  const isActive = selectedCategory === item.key;
                  return (
                    <li key={item.key} className="shrink-0 lg:shrink">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleCategoryChange(item.key)}
                        className={cn(
                          "group flex min-h-11 w-full items-center justify-between gap-3 whitespace-nowrap rounded-sm py-1.5 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:border-t lg:border-border lg:py-2.5 lg:first:border-t-0",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "petal-dot transition-colors",
                              isActive
                                ? "bg-foreground"
                                : "group-hover:bg-foreground/70"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              "text-sm",
                              isActive && "font-display tracking-tight"
                            )}
                          >
                            {item.name}
                          </span>
                        </span>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {item.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Ledger */}
            <div className="min-w-0">
              <p className="sr-only" role="status" aria-live="polite">
                {t("faq.resultsCount", { count: visible.length })}
              </p>
              {!hasResults ? (
                <Empty className="py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <HelpCircle className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>{t("faq.noResults")}</EmptyTitle>
                    <EmptyDescription>
                      {searchQuery ? t("faq.noSearchResults") : t("faq.noFaqs")}
                    </EmptyDescription>
                  </EmptyHeader>
                  {searchQuery && (
                    <EmptyContent>
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="rounded-sm text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {t("faq.clearSearch")}
                      </button>
                    </EmptyContent>
                  )}
                </Empty>
              ) : (
                <div className="space-y-12">
                  {groups.map((group) => (
                    <section key={group.key} aria-label={group.name}>
                      {showGroupHeadings ? (
                        <div className="mb-1 flex items-center gap-2.5">
                          <span className="petal-dot" aria-hidden="true" />
                          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                            {group.name}
                          </h2>
                        </div>
                      ) : (
                        <h2 className="sr-only">{group.name}</h2>
                      )}
                      <ul>
                        {group.items.map((faq) => {
                          const open = openIds.has(faq.id);
                          const panelId = `faq-panel-${faq.id}`;
                          return (
                            <li
                              key={faq.id}
                              className="border-t border-border first:border-t-0"
                            >
                              <h3>
                                <button
                                  type="button"
                                  aria-expanded={open}
                                  aria-controls={panelId}
                                  onClick={() => toggle(faq.id)}
                                  className="group flex w-full items-start justify-between gap-5 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                  <span className="font-display text-lg leading-snug tracking-tight text-foreground sm:text-xl">
                                    {faq.question}
                                  </span>
                                  {/* +/− hairline toggle, no chevron */}
                                  <span
                                    className="relative mt-1.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                                    aria-hidden="true"
                                  >
                                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                                    <span
                                      data-open={open ? "" : undefined}
                                      className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current motion-safe:transition-transform data-[open]:scale-y-0"
                                    />
                                  </span>
                                </button>
                              </h3>
                              <div
                                id={panelId}
                                data-open={open ? "" : undefined}
                                className="grid grid-rows-[0fr] motion-safe:transition-[grid-template-rows] motion-safe:duration-300 data-[open]:grid-rows-[1fr]"
                              >
                                <div className="overflow-hidden">
                                  {faq.answer && (
                                    <p className="max-w-2xl pb-6 text-[0.95rem] leading-7 text-muted-foreground">
                                      {faq.answer}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
