---
title: Init Command
---

# `harness init`

## Purpose

Create the baseline Harness scaffold in the current working directory.

## Usage

```bash
harness init [options]
```

## Options

- `--project-name <name>`: override the inferred project name.
- `--help`: show the command help text.

## Examples

Infer the project name from the directory:

```bash
harness init
```

Provide the project name explicitly:

```bash
harness init --project-name "Billing Service"
```

## Behavior

- Writes the scaffold only into the current directory.
- Fails if generated files already exist.
- Does not invoke external tools.
- Produces a language-agnostic baseline ready for `harness configure`.
