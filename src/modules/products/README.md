# Products Module

Owns product and product-category UI, API mapping, query hooks, and domain types.

Import from `@/modules/products` outside this module. Keep JSON:API mapping in
`lib/queries.ts`; UI components should consume mapped `Product` and
`ProductCategory` values.

Route server files:

- `page.tsx`
- `detail-page.tsx`

These are imported by App Router wrappers and should not be exported from the
client-used barrel.
