import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getContactInfo } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import ContactClient from "./contact-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return buildMetadata({
    locale,
    path: "/contact",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default function Contact() {
  return <ContactClient contactInfo={getContactInfo()} />;
}
