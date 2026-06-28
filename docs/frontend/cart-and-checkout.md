# Frontend Cart & Checkout

Cart, favorites, order history, the account panel, and checkout currently run on **client-side `localStorage` state**, not the backend. There is no live payment, transaction, or authentication integration. Treat this as a front-end prototype of the purchase flow until a verified Laravel contract is provided.

---

## Client State

All three contexts persist to `localStorage` via `src/shared/lib/storage.ts` and are provided in `src/app/[locale]/layout.tsx`.

- `src/modules/cart` (`useCart`) — cart items (a `Product` plus `quantity`); exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getTotalPrice`, `getTotalItems`.
- `src/modules/account` (`useFavorites`) — favorites/wishlist.
- `src/modules/account` (`useOrders`) — local order history; `addOrder` is called by the demo checkout.

Do not introduce a parallel cart/favorites store — reuse these contexts. Read prices through them and format with shared price helpers from `src/shared/lib/utils.ts`.

---

## Cart UI

- `src/modules/cart/components/cart-button.tsx` — header trigger showing the item count from `getTotalItems()`.
- `src/modules/cart/components/cart.tsx` — cart sheet (quantity controls, remove, totals, checkout link).

Requirements:

- Reuse shadcn/ui `Sheet`, `Button`, and related primitives.
- Use `SafeImage` for product thumbnails.
- Keep empty, loading, and updated states clear, and preserve RTL/LTR and both themes.

---

## Account Panel

- `src/modules/account/components/user-button.tsx` opens `src/modules/account/components/user-panel.tsx`, a `Sheet` with tabs for favorites and local order history plus an add-to-cart action.
- This is **not authentication**. No real users API is wired in. Do not present sign-in/account features as backed by the API unless that integration is actually added.

---

## Checkout

Routes: `src/app/[locale]/checkout/page.tsx` and `src/app/[locale]/checkout/success/page.tsx` are thin wrappers around `src/modules/checkout`. Use `PageShell` with `showFooter={false}` on the checkout screen.

Behavior:

- When the cart is empty, show the `Empty` state with a link back to products.
- Collect shipping and payment fields with shadcn/ui form primitives; localize every label under the `checkout` namespace.
- Submission is a **simulated demo**: it waits briefly, computes subtotal/shipping/tax/total, records the order via `useOrders().addOrder`, clears the cart, and routes to `/checkout/success`. There is **no** backend call and **no** real payment.
- Do not invent a backend checkout/payment route or store entered card data.
- If a verified transactions/payment API is later provided, add the resource logic to the owning checkout/transactions module with proper mutations and error handling, and replace the simulated flow rather than layering on top of it.

---

## Quality

- Mobile-first, responsive, accessible, keyboard-friendly, and verified in both light and dark themes.
- Keep totals, quantity controls, and the submit/confirm states clear and consistent with the storefront design system.
- Preserve RTL/LTR layout and locale-aware number/price formatting.
