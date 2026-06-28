"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { useTranslations } from "@/shared/hooks/use-translations";
import { Mail, Loader2, CheckCircle2, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Newsletter({ variant = "default", className = "" }: NewsletterProps) {
  const { t } = useTranslations();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    setStatus("submitting");
    setError(null);
    
    try {
      // TODO: Replace with actual API endpoint
      // await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: data.email }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("newsletter.error") || "Failed to subscribe. Please try again.");
    }
  };

  const isSubmitting = status === "submitting";
  const isSubmitted = status === "success";

  if (variant === "compact") {
    return (
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("newsletter.emailPlaceholder") || "Enter your email"}
                      aria-label={t("newsletter.emailPlaceholder") || "Enter your email"}
                      className="min-w-0 border-border bg-card/80"
                      suppressHydrationWarning
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="rounded-full"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSubmitted ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                t("newsletter.subscribe") || "Subscribe"
              )}
            </Button>
          </form>
        </Form>
        {error && (
          <Alert variant="destructive" role="alert" className="mt-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isSubmitted && (
          <Alert role="status" aria-live="polite" className="mt-2 border-primary/30 bg-storefront-brand-soft text-primary dark:bg-storefront-brand-soft dark:text-primary">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              {t("newsletter.success") || "Thank you for subscribing!"}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <section className={`bg-background py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-storefront-brand-soft shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-storefront-surface lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-72 overflow-hidden bg-primary lg:min-h-[30rem]">
            <Image
              src="/hero-florist-studio.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                <Mail className="h-4 w-4" />
                {t("newsletter.title") || "Newsletter"}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-foreground/10">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="font-display mt-6 text-3xl leading-tight text-foreground sm:text-4xl">
                {t("newsletter.title") || "Subscribe to Our Newsletter"}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {t("newsletter.description") || "Get the latest updates, news, and exclusive offers delivered to your inbox."}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("newsletter.emailPlaceholder") || "Enter your email address"}
                            aria-label={t("newsletter.emailPlaceholder") || "Enter your email address"}
                            className="h-12 rounded-full border-border bg-card px-5 text-card-foreground placeholder:text-muted-foreground focus:bg-card"
                            suppressHydrationWarning
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    size="lg"
                    className="h-12 gap-2 whitespace-nowrap rounded-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("newsletter.subscribing") || "Subscribing..."}
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t("newsletter.subscribed") || "Subscribed!"}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t("newsletter.subscribe") || "Subscribe"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {error && (
              <Alert variant="destructive" role="alert" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted && (
              <Alert role="status" aria-live="polite" className="mt-4 border-border bg-secondary text-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  {t("newsletter.success") || "Thank you for subscribing! Check your email for confirmation."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
