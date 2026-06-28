# Frontend Quality

## Mobile First

Mobile is the primary shopping experience.

Every new feature must:

- Be designed for mobile before desktop.
- Prevent horizontal scrolling.
- Prevent overflow.
- Prevent overlapping layouts.
- Maintain comfortable touch targets.
- Verify dialogs.
- Verify sheets.
- Verify dropdowns.
- Verify navigation.
- Maintain smooth scrolling.
- Optimize image loading.
- Verify tablet layouts.
- Verify desktop layouts before considering work complete.

---

## Accessibility

Every feature must:

- Use semantic HTML.
- Support keyboard navigation.
- Avoid hover-only interactions.
- Associate labels with form controls.
- Provide meaningful alt text.
- Maintain accessible color contrast.
- Support screen readers.
- Respect `prefers-reduced-motion`.
- Preserve RTL/LTR layouts.

---

## Performance

Prefer native browser features over JavaScript.

Guidelines:

- Prefer CSS over JavaScript.
- Prefer native browser APIs.
- Prefer CSS Scroll Snap.
- Prefer Intersection Observer.
- Avoid unnecessary Client Components.
- Avoid unnecessary re-renders.
- Lazy-load below-the-fold content.
- Optimize images.
- Preserve layout stability.
- Maintain smooth scrolling.

---

## Data Integrity

Always display real business data.

Requirements:

- Always use API data when available.
- Never fabricate:
  - products
  - categories
  - prices
  - descriptions
  - availability
  - promotions
  - reviews
  - delivery promises
  - business information
- Use existing loading states.
- Use existing empty states.
- Use existing error states.
- Display fallback media only when necessary.

---

## Internationalization

Requirements:

- Use BYekan whenever the active locale is Persian (`fa`).
- Update both:
  - `messages/en.json`
  - `messages/fa.json`
- Preserve RTL layouts.
- Preserve locale-aware formatting.
- Preserve locale-aware navigation.
- Avoid concatenating translated strings.
- Support future locales.
- Verify icon, breadcrumb, carousel, and navigation direction.

---

## Images

Requirements:

- Prefer `next/image`.
- Reuse existing media helpers.
- Normalize API media.
- Avoid raw storage URLs.
- Preserve stable dimensions.
- Preserve aspect ratios.
- Avoid heavy overlays.
- Avoid excessive filters.
- Keep flowers clearly visible.
- Prefer API media over decorative assets.

---

## Forms & Interactions

Requirements:

- Build forms and interactive controls with existing shadcn/ui primitives from `src/shared/components/ui/` whenever available.
- Use shadcn/Radix patterns for validation messages, labels, dialogs, sheets, dropdowns, tabs, alerts, and command/search interactions.
- Support keyboard interaction.
- Support touch interaction.
- Buttons should clearly communicate actions.
- Disabled actions should remain understandable.
- Keep form spacing, error states, focus rings, disabled states, and loading states consistent with the existing shadcn/ui design system.
- Preserve:
  - loading states
  - optimistic updates
  - empty states
  - error states

---

## Never

- Never invent API data.
- Never hardcode translated strings.
- Never hardcode products or categories.
- Never duplicate existing components.
- Never bypass existing design tokens.
- Never introduce inconsistent spacing.
- Never ignore accessibility.
- Never sacrifice usability for visual effects.
- Never introduce unnecessary dependencies.
- Never perform unrelated refactoring.
- Never redesign large sections unless explicitly requested.
- Never replace established design patterns without a strong reason.
