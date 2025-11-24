"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkipLink } from "@/components/layout/skip-link";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  showFooter?: boolean;
  showFooterNewsletter?: boolean;
  className?: string;
}

export function PageShell({
  children,
  showFooter = true,
  showFooterNewsletter = true,
  className,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <SkipLink />
      <Header />
      <main id="main-content">{children}</main>
      {showFooter ? <Footer showNewsletter={showFooterNewsletter} /> : null}
    </div>
  );
}
