# Blog Module

Owns blog listing/detail UI, homepage blog sections, post cards, blog API
mapping, query hooks, and post/category types.

Import from `@/modules/blog` outside this module. Keep JSON:API mapping and
placeholder handling in `lib/queries.ts`; keep rich text rendering/sanitization
in shared components/utilities.

Route server files:

- `page.tsx`
- `detail-page.tsx`

These are imported by App Router wrappers and should not be exported from the
client-used barrel.
