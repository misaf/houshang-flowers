# Frontend FAQ

The FAQ page answers common customer questions, grouped by category. It is fully **API-backed** — never hardcode or invent questions, answers, or categories.

---

## Architecture

Routes live under `app/[locale]/faq/`:

- `app/[locale]/faq/page.tsx` — Server Component shell; fetches FAQs and categories in parallel, sets localized metadata, and emits `FAQPage` + `BreadcrumbList` JSON-LD.
- `app/[locale]/faq/faq-client.tsx` — Client Component with category filter chips, instant client-side search, an accordion (`<details>`) grouped under category headings, and loading/empty/error states.

A condensed FAQ accordion also appears on the contact page (`ContactFaqCard` in `app/[locale]/contact/contact-client.tsx`) via the `useFaqs` hook.

Reuse `PageShell`, `@/i18n/navigation`, and existing shadcn/ui primitives. Store every visible string in `messages/{locale}.json` under the `faq` namespace (and the FAQ nav label under `common.faq`); keep `en`/`fa` synchronized.

---

## Data Source

Use the `lib/api/faqs/` module — never fetch FAQ data directly in components.

- Backend resources: `/faqs` and `/faq-categories` (JSON:API), with `include=faqCategory`, `filter[status]=1`, and `sort=position`. Category filtering uses the relationship route `faq-categories/{id}/faqs` (the slug is resolved to an id first, mirroring blog).
- Query helpers: `fetchFaqs` (list, optional `category` slug), `fetchFaqCategories`. React Query hooks `useFaqs` / `useFaqCategories` are available for client fetching. Re-exported from `lib/api.ts`.
- The API layer maps the JSON:API resource into the domain `Faq` type (`question`, `answer`, `position`, `category`, `categorySlug`). Answers are coerced to plain text (HTML stripped) in `lib/api/faqs/queries.ts` — keep all mapping there, not in components.

---

## Listing Behavior

- Read `category` from the URL query string; reflect the active category in the URL and refetch on change.
- Search filters loaded FAQs client-side over question + answer (locale-aware), since the FAQ set is small.
- Group FAQs by category, ordering groups by the categories list; show category headings when more than one group is present or a specific category is selected.
- Use the `Empty` primitive for no-results and an `Alert` with a retry action for errors; show a skeleton list while loading.
- Constrain the content to a readable single-column width.

---

## SEO

- `generateMetadata` returns `buildMetadata({ locale, path: "/faq", title, description })` from the `faq` namespace.
- The page emits `faqPageSchema(...)` (only when FAQs exist) and `breadcrumbSchema(...)` via `<JsonLd>`. Both builders live in `lib/seo.ts`. FAQ content is server-rendered so crawlers see the questions/answers without JavaScript.
- `/faq` is registered in `app/sitemap.ts` static entries.
