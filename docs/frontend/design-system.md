# Frontend Design System

## Visual Style

The storefront should feel:

- Warm
- Elegant
- Premium
- Natural
- Editorial
- Shopping-focused

Avoid:

- Dashboard aesthetics
- SaaS landing page layouts
- Heavy gradients
- Excessive shadows
- Visual clutter
- Decorative elements that distract from products

Product imagery should always receive higher visual priority than decoration.

---

## shadcn/ui Foundation

Use shadcn/ui as the default UI and UX foundation for storefront sections, forms, and interactive surfaces.

Requirements:

- Reuse existing primitives from `components/ui/` before creating custom controls.
- Prefer shadcn/Radix patterns for:
  - buttons
  - inputs
  - labels
  - forms
  - dialogs
  - sheets
  - dropdown menus
  - command/search surfaces
  - tabs
  - cards
  - badges
  - alerts
- Keep custom section layouts visually compatible with the existing shadcn/ui theme tokens.
- Extend shadcn/ui components through composition and variants before introducing one-off styles.
- Preserve Radix accessibility behavior when wrapping or composing primitives.
- Do not bypass existing `components/ui/` primitives for common UI patterns without a strong reason.

---

## Theme

Every page and component must fully support both light and dark themes.

Requirements:

- Support light and dark mode everywhere.
- Never create UI that only supports one theme.
- Respect the user's system preference until a manual preference is chosen.
- Persist theme selection.
- Provide a theme toggle in the header.
- Use recognizable icons (Sun / Moon).
- Prevent flickering and layout shifts during theme changes.
- Maintain accessible color contrast.
- Keep borders, shadows, overlays, icons, and backgrounds visually balanced.
- Verify every new UI in both themes before considering work complete.

---

## Motion

Animations should enhance usability rather than attract attention.

Guidelines:

- Keep animations subtle.
- Prefer:
  - fade
  - slight translate
  - gentle scale
- Animate only:
  - opacity
  - transform
- Prefer CSS animations.
- Use Intersection Observer when viewport detection is required.
- Animate sections only once.
- Respect `prefers-reduced-motion`.
