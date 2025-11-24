# Frontend Products

## Product Cards

Every product card must display:

- Product image
- Product name
- Product category
- Price or **Request Price**
- Availability badge
- Primary action

Product cards should:

- Load the primary product image dynamically from the backend API.
- Load product pricing dynamically from the backend API.
- Never hardcode product images or pricing.
- Display large, high-quality product images.
- Prioritize product imagery over decorative UI.
- Maintain consistent heights within each grid row.
- Preserve image aspect ratios.
- Avoid cropping important parts of bouquets or floral arrangements.
- Clamp long product names to a consistent number of lines.
- Keep metadata concise and easy to scan.
- Overlay the availability badge in the top corner of the product image.
- Display pricing prominently when available.
- Display **Request Price** when the backend indicates pricing is unavailable or the product is request-only.
- Keep the primary action immediately visible without requiring hover.
- Maintain consistent spacing, typography, and alignment.
- Support keyboard navigation and touch interactions.
- Preserve RTL/LTR compatibility.
- Support both light and dark themes.
- Lazy-load images outside the initial viewport.
- Display loading placeholders while images load.
- Display fallback media when the API returns no product image.

---

## Product Detail Page

Every product page must include:

- Product gallery
- Product information
- Product token
- Product description
- Availability badge
- **Request Price** button
- Related products

The page should prioritize product imagery and purchasing intent while maintaining a premium, elegant, and distraction-free shopping experience.

---

### Gallery

The gallery must:

- Load the complete product gallery dynamically from the backend API.
- Never hardcode gallery images.
- Display a large primary image.
- Display selectable thumbnails.
- Position thumbnails vertically beside the primary image on desktop.
- Position thumbnails horizontally below the primary image on mobile.
- Highlight the selected thumbnail.
- Support touch gestures on mobile.
- Support keyboard navigation.
- Preserve image aspect ratios.
- Avoid cropping important floral arrangements.
- Lazy-load non-visible images.
- Display loading placeholders while images load.
- Display fallback media when the API returns no gallery images.

---

### Product Information

Display whenever available:

- Product name
- Product category
- Product token
- Product description
- Price or **Request Price**
- Availability badge

The information section should:

- Load product pricing dynamically from the backend API.
- Never hardcode product pricing.
- Preserve the price format returned by the backend.
- Display **Request Price** when the backend indicates pricing is unavailable or the product is request-only.
- Maintain a clear visual hierarchy.
- Keep the **Request Price** button prominently visible.
- Keep content concise and easy to scan.
- Preserve comfortable reading widths.
- Adapt gracefully across mobile, tablet, and desktop layouts.

---

### Product Token

Each product has a unique product token.

Requirements:

- Load the product token dynamically from the backend API.
- Display the product token near the product name or within the product information section.
- Use a clear label such as **Product Code**, **Product Token**, or the localized equivalent.
- Preserve the token exactly as returned by the backend API.
- Keep the token visually secondary to the product name.
- Make the token easy to copy when practical.
- Ensure readability in both light and dark themes.

---

### Availability

Availability should be presented using a dedicated badge.

Requirements:

- Position the badge at the top corner of the primary product image.
- Keep badge placement consistent throughout the storefront.
- Use consistent colors and styling.
- Ensure the badge is immediately recognizable.
- Maintain sufficient color contrast.
- Remain readable in both light and dark themes.
- Keep the badge noticeable without competing with the primary action.

---

### Related Products

Related products should:

- Be loaded dynamically from the backend API.
- Display genuinely related products whenever possible.
- Reuse the standard product card component.
- Avoid duplicate products.
- Encourage continued product discovery.
- Remain fully responsive.