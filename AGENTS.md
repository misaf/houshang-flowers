# Houshang Flowers Agent Guide

This is the mandatory quick-start guide for agents in this repository. Keep it short; detailed rules live in `docs/`.

## Read First

Before making code changes, read the relevant guide indexes, then open only the focused docs needed for the task:

- `docs/project.md` — storefront overview, repository structure, localization, and configuration
- `docs/workflow.md` — editing workflow, scope control, verification, and worktree rules
- `docs/frontend.md` — UI principles, design system, component patterns, and page-specific guides
- `docs/api.md` — JSON:API contract, API layer organization, error handling, and configuration

## Mandatory Rules

### Project Context

- This is **Houshang Flowers**, a `fa`/`en` multilingual flower-shop storefront. More locales may be added later.
- Current surfaces: home, products listing, product detail, blog (list + post), about, contact, cart, and checkout.
- Product, category, blog, and FAQ content is API-backed. Cart, favorites, and order history are **client-side localStorage state** (`contexts/`); the account panel and checkout run on that local state. Checkout payment is a **simulated demo flow** with no backend submission.
- The Laravel backend API lives at `https://github.com/misaf/vendra`. Treat it as the source of truth for API contracts.
- Use App Router conventions under `app/[locale]/`. Preserve locale-aware routing and Persian RTL support.
- For the `fa` locale, use BYekan as the primary Persian UI font.

### Development

- Reuse existing components, hooks, API utilities, mappers, and design patterns before creating new ones.
- Use shadcn/ui and `components/ui/` primitives as the default foundation for all interactive surfaces.
- Do not invent backend routes, API fields, or fake data when real API data exists.
- For user-visible text, update both `messages/en.json` and `messages/fa.json` unless there is a clear locale-specific reason.
- Keep changes scoped to the user's request. Do not introduce unrelated refactors.
- Never overwrite or revert changes you did not make.

### UI Quality

- Public storefront pages must feel polished, premium, flower-shop specific, responsive, and accessible.
- Always verify new UI in both light and dark themes before considering work complete.

### Verification

Run the smallest verification that provides confidence for the change:

- Small component or TypeScript changes: `npm run lint && npm run typecheck`
- Route-level, API, or large UI changes: `npm run build`
- Full check when appropriate: `npm run check`

## Quick Commands

- `npm run dev` — start the local Next.js dev server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript without emitting files
- `npm run build` — create a production build
- `npm run check` — run lint, typecheck, and build together
