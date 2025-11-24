"use client";

import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { BlogPostCard } from "@/components/blog-post-card";
import { Card, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { Loader2, BookOpen } from "lucide-react";
import { fetchBlogPostsWithDetails, type FetchBlogPostsResult } from "@/lib/api";
import type { Post as BlogPost } from "@/lib/api/posts/types";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLocaleDate } from "@/lib/date";

interface BlogPostsClientProps {
  initialPosts: BlogPost[];
  initialPagination: FetchBlogPostsResult["pagination"] | null;
  initialError: string | null;
  initialQueryKey: string;
}

function buildBlogQueryKey(category: string, searchQuery: string): string {
  return `${category}|${searchQuery}`;
}

export default function BlogPostsClient({
  initialPosts,
  initialPagination,
  initialError,
  initialQueryKey,
}: BlogPostsClientProps) {
  const { t, locale } = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const queryKey = buildBlogQueryKey(selectedCategory, searchQuery);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [pagination, setPagination] = useState<FetchBlogPostsResult["pagination"] | null>(
    initialPagination
  );
  const observerTarget = useRef<HTMLDivElement>(null);
  const hasLoadedInitialQuery = useRef(false);
  
  const hasMore = pagination
    ? pagination.currentPage < pagination.lastPage
    : false;

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

  const handleClearSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const nextQuery = params.toString();
    router.replace(
      {
        pathname: "/blog",
        query: Object.fromEntries(new URLSearchParams(nextQuery)),
      },
      { scroll: false }
    );
  }, [router, searchParams]);

  return (
    <PageShell>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-storefront-brand py-20 text-storefront-brand-foreground dark:bg-storefront-surface dark:text-foreground sm:py-24">
        <Image
          src="/hero-florist-studio.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-storefront-brand/75 dark:bg-background/75" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl">
              {t("blog.title") || "Blog"}
            </h1>
            <p className="mt-6 text-lg leading-8 text-storefront-brand-foreground/78 dark:text-muted-foreground sm:text-xl">
              {t("blog.subtitle") || "Read our latest articles and updates"}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
            <div>
              <span className="golzar-seam mb-3 max-w-[7rem]">
                <span className="petal-dot" aria-hidden="true" />
                <span className="h-px flex-1" aria-hidden="true" />
              </span>
              <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                {searchQuery ? (
                  <>
                    {t("blog.searchResults") || "Search Results"} - &quot;{searchQuery}&quot;
                  </>
                ) : (
                  t("blog.allPosts") || "All Posts"
                )}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {loading ? (
                  <Loader2 className="inline h-4 w-4 animate-spin" />
                ) : pagination ? (
                  <>
                    {pagination.total} {pagination.total === 1 ? t("blog.postAvailable") || "post available" : t("blog.postsAvailable") || "posts available"}
                    {posts.length > 0 && ` (${posts.length} ${t("blog.loaded") || "loaded"})`}
                  </>
                ) : (
                  "0 posts available"
                )}
              </p>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="mt-2 text-sm text-muted-foreground underline hover:text-foreground"
                >
                  {t("search.clearSearch") || "Clear search"}
                </button>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>
                <p>{error}</p>
                <button
                  className="mt-4 text-sm underline"
                  onClick={() => {
                    setError(null);
                    loadPosts(1, true);
                  }}
                >
                  Try Again
                </button>
              </AlertDescription>
            </Alert>
          )}

          {loading ? (
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
          ) : posts.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen className="h-6 w-6" />
                </EmptyMedia>
                <EmptyTitle>{t("blog.noPosts") || "No posts found"}</EmptyTitle>
                <EmptyDescription>
                  {searchQuery 
                    ? `We couldn't find any posts matching "${searchQuery}". Try adjusting your search.`
                    : "There are no blog posts available."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    formatDate={formatDate}
                    readMoreText={t("blog.readMore") || "Read More"}
                  />
                ))}
              </div>

              {/* Infinite scroll sentinel and loading indicator */}
              <div ref={observerTarget} className="h-10" />
              {loadingMore && (
                <div className="mt-8 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ms-2 text-sm text-muted-foreground">
                    {t("blog.loadingMore") || "Loading more posts..."}
                  </span>
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t("blog.allPostsLoaded") || "All posts loaded"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

    </PageShell>
  );
}
