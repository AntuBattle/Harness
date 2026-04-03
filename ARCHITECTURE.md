# Harness Architecture

This document describes the intended architecture for Harness, a TypeScript CLI that generates agent-ready repository scaffolds and launches interactive Codex-guided personalization.

## Bird's Eye View

Harness has two primary execution paths.

```text
harness init
  -> option resolution
  -> scaffold template selection
  -> markdown rendering
  -> filesystem materialization
  -> generation summary

harness configure
  -> repository metadata resolution
  -> Codex prompt generation
  -> interactive Codex launch
  -> repository personalization
```

`init` must be deterministic and self-contained. `configure` may invoke Codex, but Harness itself remains responsible for validation, prompt quality, and safe argument handling.

## Planned component boundaries

### CLI Layer (`src/cli/`, `src/commands/`)

- Parse commands and flags.
- Validate user input.
- Delegate to command-specific application services.

Invariant: command handlers accept typed context objects and keep parsing rules explicit.

### Template Catalog (`src/templates/`)

- Store canonical root docs, feature workspace docs, and scaffold metadata defaults.
- Provide tokenized templates that stay language agnostic until configuration time.

Invariant: template definitions are declarative and deterministic for the same input payload.

### Configure Service (`src/configure/`)

- Read scaffold metadata.
- Build the seed prompt for interactive Codex setup.
- Launch Codex with inherited terminal I/O.

Invariant: configure always validates the scaffold before Codex is launched.
Invariant: the configure seed prompt must require the configured repository to adopt a separate validation-subagent pass after implementation.

### Filesystem Support (`src/lib/fs.ts`)

- Write files and directories.
- Keep write behavior predictable and collision-safe.

Invariant: failed writes do not silently leave partially reported results.

### Config Support (`src/lib/config.ts`)

- Parse and validate `harness.config.json`.
- Keep metadata boundaries typed and explicit.

Invariant: malformed configuration is rejected before it influences prompt generation or execution.

## Cross-cutting principles

- Harness stays language/framework agnostic at scaffold time.
- The generated repository must remain documentation-first.
- Harness keeps the external command surface intentionally small.
- Codex is the only supported interactive configuration runtime for now.
- Validation happens at ingress boundaries: CLI flags and repository metadata.
- Local-first workflows take priority over cloud-only behavior.
- Typed objects are preferred over loose argument bags across module boundaries.
