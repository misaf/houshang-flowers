"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "@/i18n/navigation";
import type { ContactInfo } from "@/lib/config";
import { useFaqs } from "@/lib/api/faqs/queries";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flower2,
  HelpCircle,
  MapPin,
  PhoneCall,
  Smartphone,
  Send,
} from "lucide-react";

function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t("contact.nameRequired")),
    email: z.string().email(t("contact.emailInvalid")),
    phone: z.string().optional(),
    subject: z.string().min(3, t("contact.subjectRequired")),
    message: z.string().min(10, t("contact.messageRequired")),
  });
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toLocaleDigits(value: string, locale: string): string {
  return locale === "fa"
    ? value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
    : value;
}

function formatBusinessHours(open: string, close: string, locale: string): string {
  const separator = locale === "fa" ? "تا" : "–";
  return `${toLocaleDigits(open, locale)} ${separator} ${toLocaleDigits(close, locale)}`;
}

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

export default function ContactClient({ contactInfo }: { contactInfo: ContactInfo }) {
  const { t, locale } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const contactFormSchema = createContactFormSchema(t);

  const mobilePhone = contactInfo.mobilePhone;
  const officePhone = contactInfo.officePhone;
  const businessHours = formatBusinessHours(
    contactInfo.hoursOpen,
    contactInfo.hoursClose,
    locale
  );
  const email = t("contact.emailValue");

  const guidanceItems = [
    t("contact.supportNoteProducts"),
    t("contact.supportNoteCustom"),
    t("contact.supportNoteDelivery"),
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const body = [
      `${t("contact.name")}: ${values.name}`,
      `${t("contact.email")}: ${values.email}`,
      values.phone ? `${t("contact.phone")}: ${values.phone}` : "",
      "",
      values.message,
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <PageShell>
      <div className="bg-background text-foreground">
        <section className="border-b border-border bg-card text-card-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div>
              <span className="golzar-seam mb-3 max-w-[7rem]">
                <span className="petal-dot" aria-hidden="true" />
                <span className="h-px flex-1" aria-hidden="true" />
              </span>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("contact.subtitle")}
              </p>
              <h1 className="font-display mt-3 max-w-2xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {t("contact.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {t("contact.weLoveToHear")}
              </p>
            </div>

            <div className="relative min-h-56 overflow-hidden rounded-lg border border-primary/10 bg-primary shadow-lg shadow-storefront-brand/10 dark:border-white/10 sm:min-h-72">
              <Image
                src="/contact-consultation.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-storefront-brand/80 via-storefront-brand/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="max-w-xl text-sm font-medium leading-6 text-storefront-brand-foreground">
                  {t("contact.occasionOrderTip")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              <ContactItem
                icon={Smartphone}
                title={t("contact.mobilePhoneLabel")}
                value={toLocaleDigits(mobilePhone, locale)}
                description={t("contact.mobilePhoneDescription")}
                href={`tel:${mobilePhone.replace(/[^\d+]/g, "")}`}
                valueDir="ltr"
              />
              <ContactItem
                icon={PhoneCall}
                title={t("contact.officePhoneLabel")}
                value={toLocaleDigits(officePhone, locale)}
                description={t("contact.officePhoneDescription")}
                href={`tel:${officePhone.replace(/[^\d+]/g, "")}`}
                valueDir="ltr"
              />
              <ContactItem
                icon={MapPin}
                title={t("contact.address")}
                value={t("contact.addressValue")}
              />
              <ContactItem
                icon={CalendarClock}
                title={t("contact.hours")}
                value={businessHours}
                valueDir="ltr"
              />
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-16 pt-8 sm:pt-10">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
            <ContactFormCard
              form={form}
              isSubmitted={isSubmitted}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
              t={t}
            />

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="rounded-lg border-primary/10 bg-primary text-primary-foreground shadow-sm dark:border-white/10">
                <CardContent className="p-5">
                  <Flower2 className="size-6 text-primary-foreground/80" />
                  <h2 className="mt-4 text-lg font-semibold">{t("contact.customerHelpTitle")}</h2>
                  <div className="mt-4 space-y-3">
                    {guidanceItems.map((item) => (
                      <p key={item} className="flex gap-3 text-sm leading-6 text-primary-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-foreground/80" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ContactFaqCard t={t} />
            </aside>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function ContactFaqCard({ t }: { t: (key: string) => string }) {
  const { data: faqs, isPending } = useFaqs({ perPage: 5 });

  // Secondary content: skeleton while loading, hide entirely on error/empty.
  if (isPending) {
    return (
      <Card className="rounded-lg border-border bg-card shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{t("contact.faqTitle")}</h2>
          </div>
          <div className="mt-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-lg border-border bg-card shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t("contact.faqTitle")}</h2>
        </div>
        <div className="mt-3 divide-y divide-border">
          {faqs.map((faq) => (
            <details key={faq.id} className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-medium text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>{faq.question}</span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground motion-safe:transition-transform group-open:rotate-180" />
              </summary>
              {faq.answer && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              )}
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("contact.faqViewAll")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </CardContent>
    </Card>
  );
}

function ContactFormCard({
  form,
  isSubmitted,
  isSubmitting,
  onSubmit,
  t,
}: {
  form: ReturnType<typeof useForm<ContactFormValues>>;
  isSubmitted: boolean;
  isSubmitting: boolean;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  t: (key: string) => string;
}) {
  return (
    <Card className="overflow-hidden rounded-lg border-border bg-card py-0 shadow-lg shadow-storefront-brand/5">
      <CardHeader className="gap-0 px-5 pt-7 pb-0 sm:px-9 sm:pt-9">
        <CardTitle className="text-2xl leading-tight sm:text-3xl lg:text-4xl">
          {t("contact.formTitle")}
        </CardTitle>
        <CardDescription className="mt-2 max-w-xl text-sm leading-6">
          {t("contact.formDescription")}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-7 sm:px-9 sm:py-9">
        {isSubmitted ? (
          <div
            role="status"
            className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-primary/30 bg-storefront-brand-soft px-6 text-center"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-storefront-brand/20">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">{t("contact.messageSent")}</h3>
            <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
              {t("contact.messageSentDescription")}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.name")}</FormLabel>
                      <FormControl>
                        <Input
                          className={underlineFieldClass}
                          placeholder={t("contact.namePlaceholder")}
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className={underlineFieldClass}
                          placeholder={t("contact.emailPlaceholder")}
                          autoComplete="email"
                          dir="ltr"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.phone")}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          className={underlineFieldClass}
                          placeholder={t("contact.phonePlaceholder")}
                          autoComplete="tel"
                          inputMode="tel"
                          dir="ltr"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.subject")}</FormLabel>
                      <FormControl>
                        <Input
                          className={underlineFieldClass}
                          placeholder={t("contact.subjectPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("contact.messagePlaceholder")}
                        className="min-h-32 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-primary focus-visible:ring-0 dark:bg-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full gap-2 rounded-full px-8 shadow-lg shadow-storefront-brand/15"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 motion-safe:animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      {t("contact.sendMessage")}
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs leading-5 text-muted-foreground">
                  <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                  <span>{t("contact.privacyNote")}</span>
                </div>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

const underlineFieldClass =
  "h-11 rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-primary focus-visible:ring-0 dark:bg-transparent";

function ContactItem({
  icon: Icon,
  title,
  value,
  description,
  href,
  valueDir,
  multiline = false,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  description?: string;
  href?: string;
  valueDir?: "ltr" | "rtl" | "auto";
  multiline?: boolean;
}) {
  const content = (
    <div className="flex h-full flex-col gap-3.5 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-full bg-storefront-brand-soft text-primary">
          <Icon className="size-4" />
        </span>
        {href && (
          <ArrowUpRight className="size-4 text-muted-foreground motion-safe:transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </p>
        <p
          dir={valueDir}
          title={value}
          className={`mt-1.5 text-lg font-semibold leading-snug text-foreground ${
            multiline
              ? "whitespace-pre-line"
              : valueDir === "ltr"
                ? "truncate"
                : "break-words"
          }`}
        >
          {value}
        </p>
        {description && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={`${title}: ${value}`}
        className="group block bg-background motion-safe:transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring dark:bg-background dark:hover:bg-card"
      >
        {content}
      </a>
    );
  }

  return <div className="group bg-background dark:bg-background">{content}</div>;
}
