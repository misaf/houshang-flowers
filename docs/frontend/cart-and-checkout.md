# Frontend Cart & Checkout

Cart, favorites, order history, the account panel, and checkout currently run on **client-side `localStorage` state**, not the backend. There is no live payment, transaction, or authentication integration. Treat this as a front-end prototype of the purchase flow until a verified Laravel contract is provided.

---

## Client State (`contexts/`)

All three contexts persist to `localStorage` via `lib/storage.ts` and are provided in `app/[locale]/layout.tsx`.

- `CartContext` (`useCart`) — cart items (a `Product` plus `quantity`); exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getTotalPrice`, `getTotalItems`.
- `FavoritesContext` (`useFavorites`) — favorites/wishlist.
- `OrderContext` (`useOrders`) — local order history; `addOrder` is called by the demo checkout.

Do not introduce a parallel cart/favorites store — reuse these contexts. Read prices through them and format with `formatPrice` from `lib/utils.ts`.

---

## Cart UI

- `components/cart-button.tsx` — header trigger showing the item count from `getTotalItems()`.
- `components/cart.tsx` — cart sheet (quantity controls, remove, totals, checkout link).

Requirements:

- Reuse shadcn/ui `Sheet`, `Button`, and related primitives.
- Use `SafeImage` for product thumbnails.
- Keep empty, loading, and updated states clear, and preserve RTL/LTR and both themes.

---

## Account Panel

- `components/user-button.tsx` opens `components/user-panel.tsx`, a `Sheet` with tabs for favorites and local order history plus an add-to-cart action.
- This is **not authentication**. The `lib/api/users/` module is scaffolding and is not wired in. Do not present sign-in/account features as backed by the API unless that integration is actually added.

---

## Checkout

Routes: `app/[locale]/checkout/checkout-client.tsx` and `app/[locale]/checkout/success/page.tsx`. Use `PageShell` with `showFooter={false}` on the checkout screen.

Behavior:

- When the cart is empty, show the `Empty` state with a link back to products.
- Collect shipping and payment fields with shadcn/ui form primitives; localize every label under the `checkout` namespace.
- Submission is a **simulated demo**: it waits briefly, computes subtotal/shipping/tax/total, records the order via `useOrders().addOrder`, clears the cart, and routes to `/checkout/success`. There is **no** backend call and **no** real payment.
- Do not invent a backend checkout/payment route or store entered card data. The `lib/api/transactions/` module is scaffolding only.
- If a verified transactions/payment API is later provided, move logic into the `lib/api/transactions/` module with proper mutations and error handling, and replace the simulated flow rather than layering on top of it.

---

## Quality

- Mobile-first, responsive, accessible, keyboard-friendly, and verified in both light and dark themes.
- Keep totals, quantity controls, and the submit/confirm states clear and consistent with the storefront design system.
- Preserve RTL/LTR layout and locale-aware number/price formatting.
