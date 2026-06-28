# API Errors And Data Flow

## Error Handling

- Preserve JSON:API error objects whenever practical.
- Handle expected API failures gracefully.
- Surface meaningful user-facing errors through existing UI patterns.
- Do not silently ignore failed API requests.
- Reuse existing error handling utilities before introducing new ones.

---

## Data Flow

Keep responsibilities clearly separated.

```text
UI Components
        |
        v
React Query / Hooks
        |
        v
API Resource Module
        |
        v
src/shared/api/client.ts
        |
        v
Laravel JSON:API Backend
```

Presentation components should consume already-mapped domain objects rather than raw JSON:API documents whenever possible.
