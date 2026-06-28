"use client";

import { useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog-post-card";
import { useTranslations } from "@/hooks/use-translations";
import { formatLocaleDate } from "@/lib/date";
import type { Post as BlogPost } from "@/lib/api/posts/types";

export function RelatedEntries({ posts }: { posts: BlogPost[] }) {
  const { t, locale } = useTranslations();
  const isRtl = ["fa", "ar", "he"].includes(locale);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const formatDate = useCallback(
    (dateString: string) => formatLocaleDate(dateString, locale),
    [locale]
  );

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="petal-dot" aria-hidden="true" />
            {t("blog.moreEntries") || "More from the Journal"}
          </h2>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            {t("blog.viewAllPosts") || "View All Posts"}
            <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
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
      </div>
    </section>
  );
}
