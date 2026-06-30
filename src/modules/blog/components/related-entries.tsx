"use client";

import { use, useCallback } from "react";
import { Link } from "@/shared/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostCard } from "./blog-post-card";
import { useTranslations } from "@/shared/hooks/use-translations";
import { formatLocaleDate } from "@/shared/lib/date";
import { isRtlLocale } from "@/shared/lib/locale";
import type { Post as BlogPost } from "@/modules/blog";

export function RelatedEntries({
  postsPromise,
}: {
  postsPromise: Promise<BlogPost[]>;
}) {
  const posts = use(postsPromise);
  const { t, locale } = useTranslations();
  const isRtl = isRtlLocale(locale);
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
