"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn, formatLocalizedPrice, normalizeImageUrl } from "@/lib/utils";
import { createReadableResourcePath } from "@/lib/slug-url";
import type { Product } from "@/lib/api/products/types";

interface HomeProductCategory {
  slug: string;
  title: string;
  description: string | null;
  image?: string;
  products: Product[];
}

interface HomeProductsSectionProps {
  locale: string;
  t: (key: string, values?: Record<string, string | number>) => string;
  categories: HomeProductCategory[];
  loading?: boolean;
}

interface HomeProductCardProps {
  product: Product;
  locale: string;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const RTL_LOCALES = ["fa", "ar", "he"];

function HomeProductCard({ product, locale, t }: HomeProductCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const detailHref = `/products/${createReadableResourcePath(
    product.id,
    product.slug
  )}`;
  const inStock = product.inStock !== false;
  const hasPrice = Number(product.price) > 0 && inStock;
  const displayPrice = formatLocalizedPrice(
    product.price,
    locale,
    product.formattedPrice
  );
  const isLowQuantity = product.quantity != null && product.quantity < 2;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
      {/* the swatch tab — a paint-chip of this band's bloom colour */}
      <div className="px-3 pt-3">
        <span className="swatch-tab block w-10" aria-hidden="true" />
      </div>

      <div className="relative mt-3 aspect-[4/5] overflow-hidden bg-secondary/50">
        <Link href={detailHref} className="block h-full w-full">
          {hasImageError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
              <span className="flex size-14 items-center justify-center rounded-full bg-background/75 shadow-sm ring-1 ring-border">
                <ImageOff className="h-6 w-6" />
              </span>
              <span className="max-w-28 text-center text-xs font-semibold leading-5">
                {t("products.imageUnavailable") || "Image unavailable"}
              </span>
            </div>
          ) : (
            <Image
              src={normalizeImageUrl(product.image)}
              alt={product.name}
              width={360}
              height={450}
              className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
              unoptimized
              loading="lazy"
              onError={() => setHasImageError(true)}
            />
          )}
        </Link>
      </div>

      <div className="flex min-h-20 flex-1 flex-col gap-2 px-4 pb-2 pt-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5">
          <Link
            href={detailHref}
            className="flex items-start gap-2 transition-colors hover:text-foreground/70"
          >
            <span className="petal-dot mt-1.5" aria-hidden="true" />
            <span className="min-w-0">{product.name}</span>
          </Link>
        </h3>
        {isLowQuantity ? (
          <p className="ms-4 truncate text-xs font-semibold leading-4 text-foreground">
            {t("products.remainingQuantity", {
              quantity: new Intl.NumberFormat(locale).format(
                product.quantity as number
              ),
            })}
          </p>
        ) : null}
      </div>

      <div className="mt-auto flex justify-end px-4 pb-4 pt-2 text-end">
        <span
          dir="ltr"
          className={cn(
            "block truncate text-base font-bold leading-6",
            inStock ? "text-card-foreground" : "text-muted-foreground"
          )}
        >
          {inStock
            ? hasPrice
              ? displayPrice
              : t("products.priceOnRequest")
            : t("products.outOfStock")}
        </span>
      </div>
    </div>
  );
}

interface HomeProductsCarouselProps {
  products: Product[];
  locale: string;
  t: (key: string, values?: Record<string, string | number>) => string;
}

function HomeProductsCarousel({ products, locale, t }: HomeProductsCarouselProps) {
  const isRTL = RTL_LOCALES.includes(locale);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
        direction: isRTL ? "rtl" : "ltr",
      }}
      className="w-full"
    >
      <CarouselContent className="-ms-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-[82%] ps-4 sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
          >
            <HomeProductCard product={product} locale={locale} t={t} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`z-10 bg-card/95 shadow-md hover:bg-card ${
          isRTL ? "right-2 left-auto md:-right-4" : "left-2 right-auto md:-left-4"
        }`}
      >
        {isRTL ? (
          <ArrowRight className="h-4 w-4" />
        ) : (
          <ArrowLeft className="h-4 w-4" />
        )}
        <span className="sr-only">{t("common.previousSlide")}</span>
      </CarouselPrevious>
      <CarouselNext
        className={`z-10 bg-card/95 shadow-md hover:bg-card ${
          isRTL ? "left-2 right-auto md:-left-4" : "right-2 left-auto md:-right-4"
        }`}
      >
        {isRTL ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        <span className="sr-only">{t("common.nextSlide")}</span>
      </CarouselNext>
    </Carousel>
  );
}

interface ProductCategorySectionHeaderProps {
  category: HomeProductCategory;
  t: (key: string, values?: Record<string, string | number>) => string;
  arrowIcon: typeof ArrowRight;
}

function ProductCategorySectionHeader({
  category,
  t,
  arrowIcon: ArrowIcon,
}: ProductCategorySectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <span className="mb-4 flex items-center gap-3">
          <span className="petal-dot" aria-hidden="true" />
          <span className="golzar-swatch-bar" aria-hidden="true" />
        </span>
        <h3 className="font-display truncate text-4xl leading-[1.05] text-foreground sm:text-5xl">
          {category.title}
        </h3>
        {category.description ? (
          <p className="mt-3 line-clamp-1 max-w-xl text-sm text-muted-foreground">
            {category.description}
          </p>
        ) : null}
      </div>

      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-fit shrink-0 gap-2 rounded-full bg-card/70 backdrop-blur-sm hover:bg-card"
        style={
          {
            borderColor: "var(--border)",
          } as React.CSSProperties
        }
      >
        <Link
          href={{
            pathname: "/products",
            query: { category: category.slug },
          }}
        >
          {t("common.viewAllProducts") || "View All Products"}
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function ProductCategorySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {[0, 1, 2, 3, 4].map((index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
          <CardHeader>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardFooter className="justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-9 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function HomeProductsSection({
  locale,
  t,
  categories,
  loading = false,
}: HomeProductsSectionProps) {
  const isRTL = RTL_LOCALES.includes(locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full">
      {loading && categories.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <ProductCategorySkeleton />
        </div>
      ) : categories.length === 0 ? (
        <p className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground sm:px-6 sm:py-14 lg:px-8">
          {t("products.noProducts") || "No products found"}
        </p>
      ) : (
        <div className="storefront-product-sections">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="storefront-snap-panel w-full scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 md:min-h-[100svh]"
            >
              <div className="mx-auto flex max-w-7xl flex-col justify-center gap-8 md:min-h-[calc(100svh-6rem)]">
                <ProductCategorySectionHeader
                  category={category}
                  t={t}
                  arrowIcon={ArrowIcon}
                />
                {loading ? (
                  <ProductCategorySkeleton />
                ) : category.products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("products.noProductsInCategory") ||
                      "There are no products available in this category."}
                  </p>
                ) : (
                  <HomeProductsCarousel
                    products={category.products.slice(0, 20)}
                    locale={locale}
                    t={t}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
