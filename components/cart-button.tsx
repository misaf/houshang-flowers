"use client";

import { useSyncExternalStore } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";

const subscribe = () => () => {};

export function CartButton() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
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
