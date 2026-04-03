---
title: Installation
---

# Installation

## Prerequisites

- Node.js 20 or newer.
- A local `codex` executable on `PATH` if you plan to run `harness configure`.

## Install Globally

```bash
npm install -g harness-cli
```

After installation, verify the CLI is available:

```bash
harness --help
```

## Use Without Installing Globally

```bash
npx harness-cli --help
```

## Upgrade

```bash
npm install -g harness-cli@latest
```

## Notes

- `harness init` does not require Codex.
- `harness configure` will fail early if the repository is not a valid Harness scaffold.
- `harness configure` will also fail if `codex` is not installed or cannot be started.
