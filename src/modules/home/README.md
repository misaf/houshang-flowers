# Home Module

Owns storefront homepage composition, the hero component, and initial homepage
data loading across products and blog.

Import reusable home exports from `@/modules/home`. Homepage-specific data
composition can depend on other module public APIs, but reusable product/blog UI
belongs in those modules.

Route server file:

- `page.tsx`
