# API Layer

## API Layer

Keep all API logic centralized.

Guidelines:

- Reuse `lib/api/client.ts`.
- Reuse existing resource modules under `lib/api/`.
- Keep network requests out of presentation-only components.
- Place new API functionality inside the existing API layer.
- Keep resource types, mappers, and serializers close to their corresponding API module.
- Avoid duplicating fetch logic across components.
- Prefer extending existing resource modules over creating new ones.

---

## JSON:API Handling

The frontend uses **jsona** for deserializing JSON:API responses.

When consuming API responses:

- Validate the response structure before accessing fields.
- Handle JSON:API documents according to the specification.
- Support existing mapper expectations for:
  - `data`
  - `attributes`
  - `relationships`
  - `included`
  - `links`
  - `meta`
- Keep transformation logic inside the API layer.
- Do not flatten API responses inside UI components.
- Preserve resource relationships whenever they may be useful to other consumers.

---

## Resource Organization

Keep each resource self-contained.

Each API module should own its:

- Types
- Resource mappers
- Queries
- Mutations
- Helper functions
- Resource-specific utilities

Avoid placing resource-specific logic inside unrelated modules or UI components.

---

## Known Resource Areas

Primary backend resources currently include:

- `/products`
- `/product-categories`
- `/blog-posts`
- `/blog-post-categories`
- `/faqs`
- `/faq-categories`
- `/multimedia`
- `/transactions`
- `/users`

Resource modules surfaced in the UI today: `products`, `posts` (blog), and `faqs` (FAQ page + contact accordion; categories via `/faq-categories` and the `faqCategory` relationship). The `transactions` and `users` modules exist as scaffolding and are **not yet wired into any UI** — cart, account, and checkout currently run on client-side `localStorage` state (`contexts/`), and checkout is a demo flow. Do not assume a live transaction or auth integration without confirming it in the code or in Vendra.

Only consume relationship routes that already exist in:

- The backend
- Existing API utilities
- User-provided API documentation

Never invent backend routes or relationships.

---

## Type Safety

- Keep API types close to their resource module.
- Prefer strict TypeScript types.
- Avoid `any`.
- Prefer existing shared resource types when available.
- Update mappers whenever backend resource shapes change.
