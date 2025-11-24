# Workflow Verification

Run the smallest verification that provides confidence for the requested change.

## Documentation

Documentation-only changes normally require no verification.

## Small Component or TypeScript Changes

Usually run:

```bash
npm run lint
npm run typecheck
```

## Route-Level, API, or Large UI Changes

Usually run:

```bash
npm run build
```

## Full Verification

When appropriate:

```bash
npm run check
```

Only run the commands that are relevant to the requested work.

---

## Development Server

To verify changes locally:

```bash
npm run dev
```

If a development server is already running:

- Reuse the existing server.
- Never terminate another active development session unless instructed.

When verifying UI changes, inspect the affected routes whenever possible, for example:

- `/fa`
- `/en`
- `/fa/products`
- `/en/products`
- Any route modified during the implementation.
