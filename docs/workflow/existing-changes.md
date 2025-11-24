# Workflow Existing Changes

The repository may already contain user changes.

Rules:

- Never overwrite or revert changes you did not make.
- Ignore unrelated modified files.
- If another change affects the same file, carefully integrate with it instead of replacing it.
- Never use destructive Git commands such as:

```bash
git reset --hard
git checkout .
git clean -fd
```

unless the user explicitly requests them.
