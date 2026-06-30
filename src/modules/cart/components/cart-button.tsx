"use client";

import { useCart } from "@/modules/cart";
import { Button } from "@/shared/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useHydrated } from "@/shared/hooks/use-hydrated";

export function CartButton() {
  const hydrated = useHydrated();
  const { getTotalItems, openCart } = useCart();
  const { t } = useTranslations();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={openCart}
      aria-label={t("common.shoppingCart")}
    >
      <ShoppingBag className="h-5 w-5" />
      {hydrated && totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  );
}
