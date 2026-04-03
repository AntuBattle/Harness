---
title: Installation
---

# Installation

## Prerequisites

- Node.js 20 or newer.
- A local `codex` executable on `PATH` if you plan to run `harness configure`.

## Install Globally

```bash
npm install -g @antubattle/harness
```

After installation, verify the CLI is available:

```bash
harness --help
```

## Use Without Installing Globally

```bash
npx @antubattle/harness --help
```

## Upgrade

```bash
npm install -g @antubattle/harness@latest
```

## Notes

- The published package name is `@antubattle/harness`, but the executable command is `harness`.
- `harness init` does not require Codex.
- `harness configure` will fail early if the repository is not a valid Harness scaffold.
- `harness configure` will also fail if `codex` is not installed or cannot be started.

## Install From Source

```bash
npm install
npm run build
npm link
```

This links the local repository checkout to the global `harness` command for development.
