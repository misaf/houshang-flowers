# Project Localization

## Supported Locales

Current supported locales:

- `fa`
- `en`

Additional locales may be added in the future.

Never write logic that assumes only two locales exist.

---

## Routing

The application uses locale-prefixed routes.

Examples:

- `/fa/products`
- `/en/products`

Guidelines:

- Route files live under `app/[locale]/`.
- Prefer navigation helpers from `@/i18n/navigation`.
- Use locale-independent route paths (for example `/products`) when generating links.
- Use raw Next.js navigation APIs only when absolutely necessary.

---

## Adding New Locales

When introducing a new locale, update all required localization resources, including:

- `i18n/routing.ts`
- `messages/{locale}.json`
- Layout metadata
- Locale-aware formatting helpers
- Any locale-specific configuration

All new features should remain compatible with future locales.
