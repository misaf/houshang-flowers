"use client";

import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/hooks/use-translations";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  const { t } = useTranslations();

  return (
    <PageShell showFooter={false}>
      {/* Success Content */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-storefront-brand-soft">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("checkout.successTitle")}</CardTitle>
            <CardDescription className="text-base">
              {t("checkout.successDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                {t("checkout.successDetails")}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/products">{t("checkout.continueShopping")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">{t("checkout.backToHome")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
