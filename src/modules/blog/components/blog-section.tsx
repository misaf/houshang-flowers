"use client";

import { Link } from "@/shared/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostCard } from "./blog-post-card";
import { FeaturedBlogPostCard } from "./featured-blog-post-card";
import { isRtlLocale } from "@/shared/lib/locale";
import type { Post as BlogPost, PostCategory } from "@/modules/blog";

// 1 featured lead post + 8 grid posts
const MAX_STOREFRONT_POSTS = 9;

interface BlogSectionProps {
  allPosts: BlogPost[];
  category?: PostCategory | null;
  locale: string;
  formatDate: (dateString: string) => string;
  t: (key: string) => string;
}

export function BlogSection({
  allPosts,
  category,
  locale,
  formatDate,
  t,
}: BlogSectionProps) {
  const isRTL = isRtlLocale(locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const sectionTitle = t("blog.title") || "Blog";
  const posts = allPosts.slice(0, MAX_STOREFRONT_POSTS);
  const [featuredPost, ...gridPosts] = posts;
  const blogHref = category
    ? {
        pathname: "/blog" as const,
        query: { category: category.slug },
      }
    : "/blog";

  return (
    <section className="storefront-snap-panel relative scroll-mt-24 overflow-hidden bg-storefront-brand py-16 text-storefront-brand-foreground dark:bg-storefront-surface dark:text-foreground sm:py-24 md:min-h-[100svh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_oklch,white_6%,transparent),transparent_55%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 md:min-h-[calc(100svh-6rem)]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-2xl text-4xl leading-[1.0] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {sectionTitle}
          </h2>
          <Link
            href={blogHref}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <span className="border-b border-white/30 pb-1 transition-colors group-hover:border-white">
              {t("blog.viewAllPosts") || "View All Posts"}
            </span>
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 bg-white/5 px-5 py-8 text-sm leading-6 text-storefront-brand-foreground/75 dark:text-muted-foreground">
            {t("blog.noPosts") || "No posts found"}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-12">
            <div className={gridPosts.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
              <FeaturedBlogPostCard
                post={featuredPost}
                imageUnavailableText={t("blog.imageUnavailable")}
              />
            </div>
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    formatDate={formatDate}
                    showDate={false}
                    showExcerpt={false}
                    showReadMore={false}
                    showCategory={false}
                    compact
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
