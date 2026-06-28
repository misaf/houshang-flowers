"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslations();

  useEffect(() => {
    // Surface the error for diagnostics; users only see the friendly screen.
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <section className="bg-background pb-20 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <span className="golzar-seam mx-auto mb-8 max-w-[10rem]">
            <span className="h-px flex-1" aria-hidden="true" />
            <span className="petal-dot" aria-hidden="true" />
            <span className="h-px flex-1" aria-hidden="true" />
          </span>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("errors.errorEyebrow")}
          </p>
          <h1 className="font-display mt-4 text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("errors.errorTitle")}
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            {t("errors.errorDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => reset()} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {t("errors.tryAgain")}
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t("errors.backHome")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
