---
title: Configure Command
---

# `harness configure`

## Purpose

Launch an interactive Codex session that personalizes an initialized Harness repository.

## Usage

```bash
harness configure [options]
```

## Options

- `--provider codex`: explicit provider selection. `codex` is the only supported value.
- `--help`: show the command help text.

## Requirements

- Run inside a valid Harness scaffold.
- Have the local `codex` executable available on `PATH`.

## What Codex Should Do

The seed prompt asks Codex to:

- read the repository docs before editing;
- interview the user about project direction and technical choices;
- define local validation and observability workflows;
- keep the repository self-sufficient for future autonomous agent work;
- enforce the validation-subagent rule for non-trivial implementation.

## Validation-Subagent Rule

Configured repositories must require:

1. a separate validation subagent after implementation;
2. a validation prompt that is different from the implementation prompt;
3. review of correctness and regressions first;
4. test execution second;
5. repetition or style and organization improvements third;
6. iteration on findings until the validation pass is satisfactory.
