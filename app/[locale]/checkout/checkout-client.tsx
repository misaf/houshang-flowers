"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { useTranslations } from "@/hooks/use-translations";
import { formatLocalizedPrice } from "@/lib/utils";
import { ShoppingBag, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

const SHIPPING_FEE = 10.0;
const TAX_RATE = 0.1;

function getOrderTotals(subtotal: number) {
  const shipping = SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export default function CheckoutClient() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { t, locale } = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Submit the order request (no online payment — handled offline/on contact)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { subtotal, shipping, tax, total } = getOrderTotals(getTotalPrice());

    // Save order to order history
    addOrder({
      items: items,
      subtotal,
      shipping,
      tax,
      total,
      status: "pending",
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    });

    // Clear cart and redirect to success page
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <PageShell showFooter={false}>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <Empty className="max-w-md">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingBag className="h-6 w-6" />
              </EmptyMedia>
              <EmptyTitle>{t("common.emptyCart")}</EmptyTitle>
              <EmptyDescription>
                {t("checkout.emptyCartDescription")}
              </EmptyDescription>
            </EmptyHeader>
            <Button asChild className="w-full">
              <Link href="/products">{t("checkout.browseProducts")}</Link>
            </Button>
          </Empty>
        </div>
      </PageShell>
    );
  }

  const { subtotal, shipping, tax, total } = getOrderTotals(getTotalPrice());

  return (
    <PageShell showFooter={false}>
      {/* Checkout Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <span className="golzar-seam mb-3 max-w-[7rem]">
          <span className="petal-dot" aria-hidden="true" />
          <span className="h-px flex-1" aria-hidden="true" />
        </span>
        <h1 className="font-display mb-8 text-3xl tracking-tight text-foreground sm:text-4xl">
          {t("checkout.title")}
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-3 text-xl">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground ring-1 ring-border">
                    <MapPin className="h-5 w-5" />
                  </span>
                  {t("checkout.shippingInformation")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("checkout.firstName")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("checkout.lastName")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contact.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t("contact.address")}</Label>
                  <Textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("checkout.city")}</Label>
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">{t("checkout.zipCode")}</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("checkout.country")}</Label>
                    <Input
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden pt-0">
              {/* an ink strip crowning the focal card */}
              <div aria-hidden="true" className="h-1.5 w-full bg-foreground" />
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-3 text-xl">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                  {t("checkout.orderSummary")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("common.quantity")}: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-card-foreground" dir="ltr">
                          {formatLocalizedPrice(
                            Number(item.price) * item.quantity,
                            locale
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                      <span className="text-card-foreground" dir="ltr">
                        {formatLocalizedPrice(subtotal, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("checkout.shipping")}</span>
                      <span className="text-card-foreground" dir="ltr">
                        {formatLocalizedPrice(shipping, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("checkout.tax")}</span>
                      <span className="text-card-foreground" dir="ltr">
                        {formatLocalizedPrice(tax, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                      <span className="text-card-foreground">{t("common.total")}</span>
                      <span className="text-card-foreground" dir="ltr">
                        {formatLocalizedPrice(total, locale)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 rounded-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {t("checkout.processing")}
                    </>
                  ) : (
                    <>
                      {`${t("checkout.completeOrder")} - ${formatLocalizedPrice(
                        total,
                        locale
                      )}`}
                      <ArrowRight className="size-4 rtl:rotate-180" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
