"use client";

import Image from "next/image";
import { PageShell } from "@/shared/components/layout/page-shell";
import { BlogPostCard } from "./blog-post-card";
import { Link } from "@/shared/i18n/navigation";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/shared/components/ui/empty";
import { useState, useEffect, useMemo, useRef, useCallback, type FormEvent } from "react";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/shared/i18n/navigation";
import { Loader2, BookOpen, Calendar, Search, ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { fetchBlogPostsWithDetails, type FetchBlogPostsResult } from "@/modules/blog";
import type { Post as BlogPost, PostCategory } from "@/modules/blog";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatLocaleDate } from "@/shared/lib/date";
import { createReadableResourcePath } from "@/shared/lib/slug-url";
import { cn, normalizeImageUrl } from "@/shared/lib/utils";

interface BlogPostsClientProps {
  initialPosts: BlogPost[];
  initialPagination: FetchBlogPostsResult["pagination"] | null;
  initialError: string | null;
  initialQueryKey: string;
  categories: PostCategory[];
}

function buildBlogQueryKey(category: string, searchQuery: string): string {
  return `${category}|${searchQuery}`;
}

/* The featured lead — the journal opens on its most recent entry, set as an
   asymmetric editorial spread rather than a stock-photo hero. */
function FeaturedPost({
  post,
  metaText,
  dateText,
  dateValue,
  readMoreText,
  isRtl,
}: {
  post: BlogPost;
  metaText: string;
  dateText: string;
  dateValue: string;
  readMoreText: string;
  isRtl: boolean;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/blog/${createReadableResourcePath(post.id, post.slug)}`}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <article className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted lg:col-span-7">
          {hasImageError ? (
            <div className="flex h-full w-full items-center justify-center text-storefront-text-muted">
              <ImageOff className="h-8 w-8" />
            </div>
          ) : (
            <Image
              src={normalizeImageUrl(post.image)}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              unoptimized
              priority
              onError={() => setHasImageError(true)}
            />
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-foreground">{metaText}</span>
            {post.category ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
              </>
            ) : null}
          </div>

          <h2 className="font-display mt-4 text-3xl leading-[1.1] tracking-tight text-foreground transition-colors group-hover:text-muted-foreground [.locale-fa_&]:leading-[1.45] sm:text-4xl lg:text-5xl">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={dateValue}>{dateText}</time>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            {readMoreText}
            <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPostsClient({
  initialPosts,
  initialPagination,
  initialError,
  initialQueryKey,
  categories,
}: BlogPostsClientProps) {
  const { t, locale } = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRtl = ["fa", "ar", "he"].includes(locale);
  const selectedCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const queryKey = buildBlogQueryKey(selectedCategory, searchQuery);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [pagination, setPagination] = useState<FetchBlogPostsResult["pagination"] | null>(
    initialPagination
  );
  const observerTarget = useRef<HTMLDivElement>(null);
  const hasLoadedInitialQuery = useRef(false);

  const hasMore = pagination
    ? pagination.currentPage < pagination.lastPage
    : false;

  const ledgerItems = useMemo(
    () => [
      { value: "all", label: t("blog.allCategories") || "All" },
      ...categories.map((category) => ({
        value: category.slug,
        label: category.name,
      })),
    ],
    [categories, t]
  );

  // Fetch blog posts from API
  const loadPosts = useCallback(async (page: number, reset: boolean = false) => {
    if (reset) {
      setLoading(true);
      setPosts([]);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const result = await fetchBlogPostsWithDetails({
        page,
        perPage: 12,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });

      if (reset) {
        setPosts(result.posts);
      } else {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          return [...prev, ...result.posts.filter(p => !existingIds.has(p.id))];
        });
      }

      setPagination(result.pagination);
    } catch (err) {
      console.error("Error loading blog posts:", err);
      setError(err instanceof Error ? err.message : "Failed to load blog posts");
      if (reset) setPosts([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (!hasLoadedInitialQuery.current) {
      hasLoadedInitialQuery.current = true;
      if (queryKey === initialQueryKey) {
        return;
      }
    }

    loadPosts(1, true);
  }, [initialQueryKey, loadPosts, queryKey]);

  // Keep the search field in sync with the URL (e.g. global header search)
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          const nextPage = (pagination?.currentPage ?? 1) + 1;
          loadPosts(nextPage, false);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, loadPosts, pagination]);

  const formatDate = useCallback(
    (dateString: string) => formatLocaleDate(dateString, locale),
    [locale]
  );

  const navigate = useCallback(
    (next: { category?: string; search?: string }) => {
      const category = next.category ?? selectedCategory;
      const search = (next.search ?? searchQuery).trim();
      const params = new URLSearchParams();
      if (category && category !== "all") params.set("category", category);
      if (search) params.set("search", search);
      router.replace(
        {
          pathname: "/blog",
          query: Object.fromEntries(params),
        },
        { scroll: false }
      );
    },
    [router, selectedCategory, searchQuery]
  );

  const handleCategoryChange = useCallback(
    (value: string) => navigate({ category: value }),
    [navigate]
  );

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate({ search: searchInput });
    },
    [navigate, searchInput]
  );

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    navigate({ search: "" });
  }, [navigate]);

  // The latest entry leads as a featured spread — but never while searching,
  // where a results grid reads more honestly.
  const showFeatured = !searchQuery && !loading && !error && posts.length > 0;
  const featuredPost = showFeatured ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  const totalLabel = pagination
    ? `${new Intl.NumberFormat(locale).format(pagination.total)} ${
        pagination.total === 1
          ? t("blog.postAvailable") || "post"
          : t("blog.postsAvailable") || "posts"
      }`
    : null;

  return (
    <PageShell>
      <section className="bg-background pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Masthead */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="golzar-seam mb-3 max-w-[7rem]">
                <span className="petal-dot" aria-hidden="true" />
                <span className="h-px flex-1" aria-hidden="true" />
              </span>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("blog.eyebrow") || "Field notes"}
              </p>
              <h1 className="font-display mt-3 text-4xl leading-none tracking-tight text-foreground sm:text-6xl">
                {t("blog.title") || "Blog"}
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t("blog.subtitle") || "Read our latest articles and updates"}
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="relative w-full lg:max-w-xs"
            >
              <button
                type="submit"
                aria-label={t("blog.searchAction") || "Search"}
                className="absolute start-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
              <Input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                aria-label={t("blog.searchPlaceholder") || "Search the journal"}
                placeholder={t("blog.searchPlaceholder") || "Search the journal"}
                className="h-11 rounded-full bg-card ps-11 pe-4"
              />
            </form>
          </div>

          {/* Category ledger — the journal's contents rail */}
          {ledgerItems.length > 1 && (
            <nav
              aria-label={t("blog.browseBy") || "Browse by topic"}
              className="mt-10"
            >
              <div className="-mx-1 flex items-stretch gap-1 overflow-x-auto px-1 [mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {ledgerItems.map((item) => {
                  const isActive = selectedCategory === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleCategoryChange(item.value)}
                      className={cn(
                        "group/cat relative shrink-0 whitespace-nowrap px-3 py-2.5 font-mono text-xs uppercase tracking-[0.16em] outline-none transition-colors focus-visible:text-foreground",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="inline-flex items-center gap-2">
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-foreground"
                            aria-hidden="true"
                          />
                        )}
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-colors",
                          isActive
                            ? "bg-foreground"
                            : "bg-transparent group-hover/cat:bg-border"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="h-px bg-border" />
            </nav>
          )}

          {/* Results meta */}
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {searchQuery ? (
                <>
                  {t("blog.searchResults") || "Search results"}
                  <span className="text-foreground"> / “{searchQuery}”</span>
                </>
              ) : loading ? (
                <Loader2 className="inline h-3.5 w-3.5 animate-spin" />
              ) : (
                totalLabel
              )}
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {t("search.clearSearch") || "Clear search"}
              </button>
            )}
          </div>

          <div className="mt-8">
            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertDescription>
                  <p>
                    {t("blog.loadError") ||
                      "We couldn't load the journal just now. Please check your connection and try again."}
                  </p>
                  <button
                    className="mt-4 text-sm underline"
                    onClick={() => {
                      setError(null);
                      loadPosts(1, true);
                    }}
                  >
                    {t("products.tryAgain") || "Try Again"}
                  </button>
                </AlertDescription>
              </Alert>
            )}

            {loading ? (
              <>
                {!searchQuery && (
                  <div className="mb-12 border-b border-border pb-12 sm:mb-14 sm:pb-14">
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
                      <Skeleton className="aspect-[16/10] w-full rounded-2xl lg:col-span-7" />
                      <div className="lg:col-span-5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-4 h-10 w-full" />
                        <Skeleton className="mt-3 h-10 w-3/4" />
                        <Skeleton className="mt-5 h-4 w-40" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="aspect-video w-full" />
                      <CardHeader>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="mt-2 h-6 w-full" />
                        <Skeleton className="mt-2 h-4 w-3/4" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </>
            ) : posts.length === 0 ? (
              <Empty className="py-12">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BookOpen className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>{t("blog.noPosts") || "No posts found"}</EmptyTitle>
                  <EmptyDescription>
                    {searchQuery
                      ? t("blog.noResultsDescription", { query: searchQuery })
                      : t("blog.noPostsDescription") ||
                        "There are no blog posts available yet. Check back soon."}
                  </EmptyDescription>
                </EmptyHeader>
                {searchQuery && (
                  <Button onClick={handleClearSearch} variant="outline">
                    {t("blog.clearSearch") || "Clear search"}
                  </Button>
                )}
              </Empty>
            ) : (
              <>
                {featuredPost && (
                  <div className="mb-12 border-b border-border pb-12 sm:mb-14 sm:pb-14">
                    <FeaturedPost
                      post={featuredPost}
                      metaText={t("blog.latestEntry") || "Latest entry"}
                      dateText={formatDate(
                        featuredPost.publishedAt || featuredPost.createdAt
                      )}
                      dateValue={featuredPost.publishedAt || featuredPost.createdAt}
                      readMoreText={t("blog.readMore") || "Read More"}
                      isRtl={isRtl}
                    />
                  </div>
                )}

                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {gridPosts.map((post) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        formatDate={formatDate}
                        readMoreText={t("blog.readMore") || "Read More"}
                      />
                    ))}
                  </div>
                )}

                {/* Infinite scroll sentinel (progressive enhancement) */}
                <div ref={observerTarget} className="h-px" aria-hidden="true" />
                {loadingMore ? (
                  <div className="mt-8 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ms-2 text-sm text-muted-foreground">
                      {t("blog.loadingMore") || "Loading more posts..."}
                    </span>
                  </div>
                ) : hasMore ? (
                  // Manual fallback so keyboard/screen-reader users can advance
                  // and everyone can reach the footer past the feed.
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() =>
                        loadPosts((pagination?.currentPage ?? 1) + 1, false)
                      }
                    >
                      {t("blog.loadMore") || "Load more posts"}
                    </Button>
                  </div>
                ) : null}
                {!hasMore && posts.length > 0 && (
                  <div className="mt-10">
                    <span className="golzar-seam mx-auto max-w-xs">
                      <span className="h-px flex-1" aria-hidden="true" />
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                        {t("blog.allPostsLoaded") || "All posts loaded"}
                      </span>
                      <span className="h-px flex-1" aria-hidden="true" />
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
