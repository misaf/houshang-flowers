type Translate = (key: string, values?: Record<string, string | number>) => string;

export function formatRemainingQuantity(
  t: Translate,
  locale: string,
  quantity: number
): string {
  return t("products.remainingQuantity", {
    quantity: new Intl.NumberFormat(locale).format(quantity),
  });
}
