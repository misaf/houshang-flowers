# Workflow Editing

## Follow Existing Patterns

- Prefer the project's existing architecture over introducing new patterns.
- Reuse existing components, utilities, hooks, and helpers whenever practical.
- Keep implementations consistent with surrounding code.

---

## Searching

Prefer fast repository search tools:

```bash
rg
rg --files
```

Avoid manually browsing large directory trees when searching is sufficient.

---

## Code Changes

- Prefer targeted edits over full file rewrites.
- Keep TypeScript fully strict.
- Avoid `any` unless temporarily required to bridge an unknown API response.
- Prefer existing utility types over creating new ones.
- Keep components focused and composable.
- Add comments only when they clarify non-obvious business logic.
- Avoid unnecessary formatting or stylistic changes.
- Do not rename files, move modules, or reorganize code unless the task requires it.

---

## UI Preservation

Unless intentionally improving them, preserve existing:

- Loading states
- Empty states
- Error states
- Unavailable-image fallbacks
- Accessibility behavior
- Responsive behavior
- RTL/LTR support
- Theme compatibility

Do not remove user-facing functionality as part of unrelated refactoring.
