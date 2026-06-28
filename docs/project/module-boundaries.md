# Module Boundaries

This project uses a feature/module structure under `src/`.

```text
src/
  app/
  modules/
  shared/
```

## Import Rules

Code outside a module imports from the module public barrel:

```ts
import { ProductsClient, fetchProductsWithDetails } from "@/modules/products";
```

Do not import another module's internals:

```ts
// Avoid outside src/modules/products
import { ProductsClient } from "@/modules/products/components/products-client";
import { fetchProductsWithDetails } from "@/modules/products/lib/queries";
```

Inside a module, prefer relative imports for module internals:

```ts
import { fetchProductsWithDetails } from "./lib/queries";
import type { Product } from "./types";
```

## Shared Code

Use `src/shared/` only for code genuinely shared by two or more modules:

- UI primitives and shared layout components
- Generic hooks
- i18n routing/navigation
- JSON:API infrastructure
- Generic utilities
- SEO/schema builders

Do not move feature-specific behavior into shared just to avoid an import.

## App Router Wrappers

`src/app/` contains Next.js route files, loading states, errors, metadata route
files, and API route handlers. Route pages should stay thin and compose module
code.

Server route modules such as `src/modules/products/page.tsx` may be imported
directly by `src/app` route wrappers because Next.js requires exports like
`generateMetadata` to remain server-only. Do not re-export those server route
files from client-used module barrels.

## Enforcement

ESLint blocks:

- old type-based aliases such as `@/components/*`, `@/contexts/*`, `@/hooks/*`,
  `@/i18n/*`, and `@/lib/*`
- cross-module imports into `components/`, `hooks/`, `lib/`, or `types.ts`

If a new import is blocked, either use the feature module's `index.ts` barrel or
move genuinely generic code into `src/shared/`.
