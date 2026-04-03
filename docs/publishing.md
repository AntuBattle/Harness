---
title: Publishing
---

# Publishing

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Verify The Packed Artifact

```bash
npm run smoke:pack
npm pack --dry-run
```

The smoke test installs the tarball into a temporary directory and runs the packaged `harness` binary. The dry run shows exactly what would be published.

## Publish Checklist

1. Ensure the working tree is clean.
2. Run the build and test commands.
3. Run the packaging smoke test.
4. Inspect `npm pack --dry-run`.
5. Publish with the npm workflow your team uses.

## GitHub-Hosted Docs

These pages live under `docs/` and are written to be compatible with a GitHub-hosted documentation flow based on that directory.
