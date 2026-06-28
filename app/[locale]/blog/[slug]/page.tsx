import { cache } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { RichText } from "@/components/rich-text";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { fetchBlogPost, fetchBlogPostsWithDetails } from "@/lib/api";
import type { Post as BlogPost } from "@/lib/api/posts/types";
import { PLACEHOLDER_IMAGE } from "@/lib/image";
import { RelatedEntries } from "./related-entries";
import type { Locale } from "@/i18n/routing";
import { formatLocaleDate } from "@/lib/date";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  plainText,
} from "@/lib/seo";

// Deduplicate the post fetch across generateMetadata + the page render.
const getPost = cache((slug: string) => fetchBlogPost(slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const path = `/blog/${slug}`;

  try {
    const post = await getPost(slug);

    if (post) {
      return buildMetadata({
        locale,
        path,
        type: "article",
        title: post.title,
        description:
          plainText(post.excerpt) ||
          plainText(post.content) ||
          t("metadataDescription"),
        images: post.image ? [post.image] : undefined,
        publishedTime: post.publishedAt || post.createdAt,
        modifiedTime: post.updatedAt,
      });
    }
  } catch {
    // Fall through to generic blog metadata when the API is unavailable.
  }

  return buildMetadata({
    locale,
    path,
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default async function BlogPostDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const BackArrow = locale === "fa" ? ArrowRight : ArrowLeft;

  let post = null;
  let error: string | null = null;

  try {
    post = await getPost(slug);
    if (!post) {
      error = t("blog.postNotFound");
    }
  } catch (caughtError) {
    error =
      caughtError instanceof Error
        ? caughtError.message
        : t("blog.loadPostError");
  }

  const hasLeadImage = Boolean(post?.image && post.image !== PLACEHOLDER_IMAGE);

  // The latest entries close the article — a quiet invitation to keep reading.
  let relatedPosts: BlogPost[] = [];
  if (post) {
    try {
      const result = await fetchBlogPostsWithDetails({ page: 1, perPage: 4 });
      relatedPosts = result.posts
        .filter((entry) => entry.id !== post!.id)
        .slice(0, 3);
    } catch {
      // Related entries are optional — never block the article on them.
    }
  }

  return (
    <PageShell>
      {error ? (
        <section className="bg-background pb-20 pt-28 sm:pb-28 sm:pt-32">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <span className="golzar-seam mx-auto mb-8 max-w-[10rem]">
              <span className="h-px flex-1" aria-hidden="true" />
              <span className="petal-dot" aria-hidden="true" />
              <span className="h-px flex-1" aria-hidden="true" />
            </span>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t("blog.eyebrow")}
            </p>
            <h1 className="font-display mt-4 text-3xl tracking-tight text-foreground sm:text-4xl">
              {error}
            </h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              {t("blog.errorDescription")}
            </p>
            <Button asChild className="mt-8 gap-2">
              <Link href="/blog">
                <BackArrow className="h-4 w-4" />
                {t("blog.backToBlog")}
              </Link>
            </Button>
          </div>
        </section>
      ) : post ? (
        <>
          <JsonLd
            data={[
              articleSchema(locale, {
                title: post.title,
                description: plainText(post.excerpt) || plainText(post.content),
                image: post.image,
                publishedAt: post.publishedAt || post.createdAt,
                modifiedAt: post.updatedAt,
                path: `/blog/${slug}`,
              }),
              breadcrumbSchema(locale, [
                { name: "Home", path: "" },
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${slug}` },
              ]),
            ]}
          />
          {/* Masthead — porcelain, title-led, no photo overlay */}
          <header className="bg-background pt-28 sm:pt-32">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <BackArrow className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
                {t("blog.backToBlog")}
              </Link>

              {/* Petal-seam eyebrow — the shared page-H1 marker used sitewide */}
              <span className="golzar-seam mb-3 mt-8 max-w-[7rem]">
                <span className="petal-dot" aria-hidden="true" />
                <span className="h-px flex-1" aria-hidden="true" />
              </span>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>{t("blog.eyebrow")}</span>
                {post.category && (
                  <>
                    <span aria-hidden="true">/</span>
                    <span className="text-foreground">{post.category}</span>
                  </>
                )}
              </div>

              <h1 className="font-display mt-3 text-4xl leading-[1.1] tracking-tight text-foreground [.locale-fa_&]:leading-[1.45] sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.publishedAt || post.createdAt}>
                  {formatLocaleDate(
                    post.publishedAt || post.createdAt,
                    locale as Locale
                  )}
                </time>
              </div>
            </div>
          </header>

          {/* Lead image — an honest editorial figure with the offset frame */}
          {hasLeadImage && (
            <figure className="mx-auto mt-10 max-w-5xl px-4 sm:mt-12 sm:px-6 lg:px-8">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-2xl border border-border"
                />
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </figure>
          )}

          {/* Article body — TipTap rich text rendered on porcelain */}
          <article className="bg-background py-12 sm:py-16">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
              <RichText
                content={post.richContent ?? post.content}
                className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-border prose-a:underline-offset-4 hover:prose-a:decoration-foreground prose-strong:text-foreground prose-img:rounded-xl"
              />
            </div>
          </article>

          <RelatedEntries posts={relatedPosts} />
        </>
      ) : null}
    </PageShell>
  );
}
