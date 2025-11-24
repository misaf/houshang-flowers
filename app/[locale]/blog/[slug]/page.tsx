import { cache } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SafeImage } from "@/components/ui/safe-image";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { fetchBlogPost } from "@/lib/api";
import type { Locale } from "@/i18n/routing";
import { formatLocaleDate } from "@/lib/date";
import { sanitizeHtmlContent } from "@/lib/utils";
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

  const safePostContent = sanitizeHtmlContent(post?.content);

  return (
    <PageShell>
      {error ? (
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Alert variant="destructive">
              <AlertDescription>
                <p>{error}</p>
                <Button asChild variant="outline" className="mt-4 gap-2">
                  <Link href="/blog">
                    <BackArrow className="h-4 w-4" />
                    {t("blog.backToBlog")}
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
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
          <section className="relative h-[22rem] overflow-hidden bg-storefront-brand dark:bg-storefront-surface sm:h-[28rem]">
            <SafeImage
              src={post.image || "/hero-florist-studio.png"}
              alt={post.image ? post.title : ""}
              fill
              className="object-cover opacity-70"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-storefront-brand via-storefront-brand/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
                {post.category && (
                  <Badge variant="secondary" className="mb-4 bg-card/90 text-primary backdrop-blur">
                    {post.category}
                  </Badge>
                )}
                <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
                  {post.title}
                </h1>
              </div>
            </div>
          </section>

          <article className="bg-background py-12 dark:bg-background sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Button asChild variant="ghost" className="mb-8 gap-2">
                <Link href="/blog">
                  <BackArrow className="h-4 w-4" />
                  {t("blog.backToBlog")}
                </Link>
              </Button>

              <div className="mb-8 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatLocaleDate(
                      post.publishedAt || post.createdAt,
                      locale as Locale
                    )}
                  </div>
                </div>
              </div>

              <div
                className="prose prose-zinc max-w-none rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm dark:prose-invert sm:p-8"
                dangerouslySetInnerHTML={{ __html: safePostContent }}
              />
            </div>
          </article>
        </>
      ) : null}
    </PageShell>
  );
}
