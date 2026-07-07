import { cache, Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/shared/i18n/navigation";
import { PageShell } from "@/shared/components/layout/page-shell";
import { JsonLd } from "@/shared/components/seo/json-ld";
import { Button } from "@/shared/components/ui/button";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { RichText } from "@/shared/components/rich-text";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { isRtlLocale } from "@/shared/lib/locale";
import { fetchBlogPost, fetchBlogPostsWithDetails } from "./lib/queries";
import type { Post as BlogPost } from "./types";
import { PLACEHOLDER_IMAGE } from "@/shared/lib/image";
import { RelatedEntries } from "./components/related-entries";
import type { Locale } from "@/shared/i18n/routing";
import { formatLocaleDate } from "@/shared/lib/date";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  plainText,
} from "@/shared/seo";

// Deduplicate the post fetch across generateMetadata + the page render.
const getPost = cache((slug: string, locale: string) =>
  fetchBlogPost(slug, locale)
);

// The latest entries close the article — fetched without blocking the render
// and streamed in via <Suspense>. Errors degrade to an empty list.
async function loadRelatedPosts(
  currentPostId: number,
  locale: string
): Promise<BlogPost[]> {
  try {
    const result = await fetchBlogPostsWithDetails({
      page: 1,
      perPage: 4,
      locale,
    });
    return result.posts
      .filter((entry) => entry.id !== currentPostId)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const path = `/blog/${slug}`;

  try {
    const post = await getPost(slug, locale);

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
  const BackArrow = isRtlLocale(locale) ? ArrowRight : ArrowLeft;

  let post = null;
  let error: string | null = null;

  try {
    post = await getPost(slug, locale);
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

  // Kick off the related fetch without awaiting — streamed on the client.
  const relatedPostsPromise: Promise<BlogPost[]> = post
    ? loadRelatedPosts(post.id, locale)
    : Promise.resolve([]);

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
                className="space-y-6 text-base leading-8 text-muted-foreground [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:rounded-lg [&_.tableWrapper]:border [&_.tableWrapper]:border-border [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground [&_blockquote]:border-s-2 [&_blockquote]:border-primary/30 [&_blockquote]:ps-5 [&_blockquote]:text-foreground/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-foreground [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-foreground [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-foreground [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-foreground [&_hr]:border-border [&_img]:rounded-xl [&_ol]:list-inside [&_ol]:list-decimal [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:w-full [&_table]:min-w-max [&_table]:border-collapse [&_tbody_tr:nth-child(even)]:bg-muted/35 [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-start [&_th]:font-semibold [&_th]:text-foreground [&_ul]:list-inside [&_ul]:list-disc"
              />
            </div>
          </article>

          <Suspense fallback={null}>
            <RelatedEntries postsPromise={relatedPostsPromise} />
          </Suspense>
        </>
      ) : null}
    </PageShell>
  );
}
