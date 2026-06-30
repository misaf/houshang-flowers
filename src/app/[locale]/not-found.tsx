"use client";

import { Link } from "@/shared/i18n/navigation";
import { PageShell } from "@/shared/components/layout/page-shell";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "@/shared/hooks/use-translations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isRtlLocale } from "@/shared/lib/locale";

export default function NotFound() {
  const { t, locale } = useTranslations();
  const HomeArrow = isRtlLocale(locale) ? ArrowRight : ArrowLeft;

  return (
    <PageShell>
      <section className="bg-background pb-20 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <span className="golzar-seam mx-auto mb-8 max-w-[10rem]">
            <span className="h-px flex-1" aria-hidden="true" />
            <span className="petal-dot" aria-hidden="true" />
            <span className="h-px flex-1" aria-hidden="true" />
          </span>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("errors.notFoundEyebrow")}
          </p>
          <h1 className="font-display mt-4 text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("errors.notFoundTitle")}
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            {t("errors.notFoundDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/">
                <HomeArrow className="h-4 w-4" />
                {t("errors.backHome")}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">
                {t("common.viewAllProducts") || "View all products"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
