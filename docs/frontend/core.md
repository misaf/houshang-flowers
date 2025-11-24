# Frontend Core

## Core Principles

Build a premium, mobile-first flower-shop storefront that helps customers discover products, trust the business, and complete purchases effortlessly.

The storefront should always prioritize:

1. Accessibility
2. Correctness
3. Mobile usability
4. Performance
5. Existing design consistency
6. Shopping experience
7. Visual polish
8. New features

General principles:

- Design for shoppers first.
- Keep interfaces simple, elegant, and intuitive.
- Favor usability over decoration.
- Favor consistency over novelty.
- Favor native browser capabilities over JavaScript when practical.
- Reuse existing patterns before creating new ones.
- Never sacrifice usability for visual effects.

---

## AI Workflow

Before implementing any UI work:

1. Review existing layouts, components, utilities, and design tokens.
2. Reuse existing code whenever possible.
3. Verify available API data before designing UI.
4. Design mobile-first.
5. Review loading, empty, error, and unavailable states.
6. Verify responsive behavior.
7. Check accessibility.
8. Test both light and dark themes.
9. Minimize layout shifts.
10. Avoid unrelated refactoring.

---

## Next.js

- Use App Router conventions.
- Prefer Server Components.
- Use Client Components only for:
  - browser APIs
  - hooks
  - React Query
  - local state
  - cart
  - favorites
  - interactive UI
- Push `"use client"` as low as practical.
- Keep data fetching inside Server Components whenever practical.
- Use `@/i18n/navigation` for locale-aware navigation.
- Route files belong under `app/[locale]/...`.
