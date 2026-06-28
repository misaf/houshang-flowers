# FAQ Module

Owns FAQ page UI, FAQ category filtering/search behavior, FAQ API mapping, query
hooks, and FAQ types.

Import from `@/modules/faq` outside this module. Contact may use the public
`useFaqs` hook through the module barrel; do not hardcode FAQ content.

Route server file:

- `page.tsx`

It is imported by the App Router wrapper and should not be exported from the
client-used barrel.
