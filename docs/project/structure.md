# Project Structure

## App Router

`app/[locale]/`

Locale-prefixed route segments, layouts, pages, and route-specific client components. Current routes:

- `/` — homepage (`page.tsx` + `storefront-client.tsx`).
- `/products` and `/products/[slug]` — product listing and product detail.
- `/blog` and `/blog/[slug]` — blog listing and blog post detail.
- `/about` — about-us page.
- `/contact` — contact page.
- `/checkout` and `/checkout/success` — checkout flow and confirmation.

`app/api/`

Route handlers used as same-origin proxies:

- `app/api/proxy/[...path]/route.ts` — proxies JSON:API requests to the backend.
- `app/api/storage/[...path]/route.ts` — proxies backend storage/media.

Pattern: each route folder pairs a Server Component `page.tsx` (data fetching, localized metadata) with a `*-client.tsx` Client Component for interactivity.

## Components

`components/`

Shared feature components, including: `header`, `footer`, `hero`, `category-menu`, `global-search`, `cart` / `cart-button`, `user-button` / `user-panel`, `newsletter`, `home-products-section`, blog components (`blog-section`, `blog-carousel`, `blog-post-card`, `featured-blog-post-card`), `category-media-image`, `language-switcher`, `theme-provider` / `theme-toggle`.

`components/layout/`

Shared page scaffolding — `page-shell.tsx` (`PageShell`) wraps header, content, and footer; reuse it for every route.

`components/ui/`

Reusable shadcn/ui primitives (button, card, dialog, sheet, form, input, command, tabs, badge, alert, skeleton, carousel, empty, plus project additions `safe-image` and `textarea`).

## State Management

`contexts/`

Application-wide **client-side** state, persisted to `localStorage`:

- `CartContext.tsx` — shopping cart.
- `FavoritesContext.tsx` — favorites/wishlist.
- `OrderContext.tsx` — local order history (populated by the demo checkout).

These contexts are not backed by the API; they hold browser-local state only.

## Hooks

`hooks/`

- `use-translations.ts` — wraps `next-intl` to expose `t` and the active `locale`.
- `use-mobile.ts` — viewport/breakpoint helper.

## Internationalization

`i18n/`

- `routing.ts` — supported locales and `Locale` type.
- `navigation.ts` — locale-aware `Link`, `useRouter`, and navigation helpers.
- `request.ts` — per-request locale and message loading.

## API Layer

`lib/api/`

- `client.ts` — JSON:API fetch client (uses **jsona** to deserialize; supports an auth-token provider).
- `query-client.ts` — React Query provider and `createApiQueryOptions` helper.
- `types.ts` — shared JSON:API meta/links types.
- Resource modules, each owning `types.ts`, `keys.ts`, `queries.ts`, and (where applicable) `mutations.ts`:
  - `products/` — products and product categories (API-backed UI).
  - `posts/` — blog posts and blog post categories (API-backed UI).
  - `faqs/` — FAQs surfaced on the contact page (API-backed UI).
  - `transactions/` — scaffolded module; **not yet wired into the UI** (checkout is a demo flow).
  - `users/` — scaffolded module; **not yet wired into the UI** (no real authentication).

`lib/api.ts`

Barrel that re-exports the common product and blog query functions and types.

## Shared Library Helpers

`lib/`

- `config.ts` — API/storage base URLs and `getContactInfo()` (see `docs/project/configuration.md`).
- `image.ts` — `toAbsoluteStorageUrl`, `normalizeImageUrl`, and `PLACEHOLDER_IMAGE`.
- `date.ts` — `formatLocaleDate` (locale-aware, Persian digits in `fa`).
- `utils.ts` — `cn`, `formatPrice`, and `sanitizeHtmlContent` (for blog rich text).
- `slug-url.ts` — slug/id parsing helpers (`getLeadingResourceId`).
- `storage.ts` — typed `localStorage` get/set used by the contexts.
- `network.ts` — JSON:API headers and network error helpers.

## Translations

Translation files (keep keys synchronized):

- `messages/fa.json`
- `messages/en.json`

Top-level namespaces: `common`, `home`, `products`, `blog`, `about`, `contact`, `checkout`, `footer`, `search`, `newsletter`.

## Static Assets

`public/`

Static assets (placeholder media, hero imagery, icons) used throughout the storefront.
