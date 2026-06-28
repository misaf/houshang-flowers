import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/shared/seo";
import { CheckoutClient } from "@/modules/checkout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });

  return buildMetadata({
    locale,
    path: "/checkout",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    noIndex: true,
  });
}

export default function Checkout() {
  return <CheckoutClient />;
}
