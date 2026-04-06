---
title: Troubleshooting
---

# Troubleshooting

## `harness configure` says the repository is incomplete

Run `harness init` first, or confirm that the expected scaffold files still exist, including `REVIEW.md` and `PRODUCT_SPECS.md`.

## `harness configure` cannot start Codex

Make sure the `codex` executable is installed and available on `PATH`.

Check:

```bash
codex --help
```

## `harness init` reports conflicting files

Harness does not overwrite generated files. Run it in an empty directory or remove the conflicting generated paths first.

## The repository is still too generic after configuration

Run `harness configure` again and give Codex more explicit direction about architecture, validation, observability, and local testing expectations.

## Packaging Smoke Test Fails

Run:

```bash
npm run build
npm run smoke:pack
```

If the failure persists, inspect `npm pack --dry-run` and confirm the tarball includes `bin/` and `dist/src/`.
