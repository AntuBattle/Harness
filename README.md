# Harness

**Harness turns a blank repository into a self-reviewing workspace for coding agents.**

Harness is a TypeScript CLI for teams that want agents to work in a closed loop instead of improvising against an empty repo. It bootstraps the planning structure, evidence flow, and review rules first, then uses Codex to tailor the repository to the actual project.

The result is a repository where agents can plan, implement, validate, and review with much less hidden context.

## Why Harness

- Start from a documentation-first scaffold instead of ad hoc agent instructions.
- Personalize the repository interactively through Codex instead of guessing every project choice up front.
- Enforce a separate validation-subagent pass so implementation and review do not collapse into one step.
- Preserve evidence, plans, and workflow rules inside the repository itself.

## What You Get

Harness sets up a repository to support this loop from day one:

1. Define intent in product specs.
2. Record architecture and tradeoffs in design docs.
3. Execute non-trivial work through ExecPlans.
4. Run validations and archive evidence.
5. Run a separate validation subagent with an explicit review prompt before considering the task complete.
6. Review changes against explicit expectations.

## Commands

- `harness init`: create the baseline scaffold in the current directory.
- `harness configure`: launch an interactive Codex session that personalizes the scaffold for the real project.

## Quickstart

Create or enter a project directory:

```bash
mkdir my-project
cd my-project
```

Initialize the scaffold:

```bash
harness init --project-name "My Project"
```

Launch interactive project setup:

```bash
harness configure
```

Codex will interview you about the project direction, language, architecture, validation setup, observability, and local tooling, then update the repository so future agent work can happen inside a more complete, self-sufficient environment.

## Prerequisites

- Node.js 20 or newer.
- The local `codex` executable must be installed and available on `PATH` before you run `harness configure`.

## Installation

Global install:

```bash
npm install -g harness-cli
```

One-off use with `npx`:

```bash
npx harness-cli init --project-name "My Project"
```

## What Makes It Different

- The scaffold is intentionally generic first and project-specific second.
- `configure` is interactive, so the repository setup can reflect real constraints instead of hard-coded presets.
- The workflow explicitly separates implementation from validation by requiring a distinct validation subagent.
- The repository keeps specs, plans, design rationale, and generated evidence close to the code.

## Current State

- Harness is implemented as a Node-based TypeScript CLI.
- The command surface is intentionally small and validated through typed objects.
- Generated repositories stay language agnostic until `configure` applies project-specific guidance.
- Codex is the only supported interactive configuration runtime right now.

## Documentation

- [Docs Home](docs/index.md)
- [Installation Guide](docs/installation.md)
- [Quickstart](docs/quickstart.md)
- [Closed-Loop Workflow](docs/closed-loop-workflow.md)
- [Publishing Guide](docs/publishing.md)

## Repository Map

- `AGENTS.md`: agent workflow and execution policy for this repository.
- `ARCHITECTURE.md`: system boundaries and implementation direction for Harness.
- `PLANS.md`: ExecPlan authoring standard.
- `PRODUCT_SPECS.md`: product-spec authoring standard.
- `features/`: versioned product specs, design docs, ExecPlans, generated artifacts, and tech debt tracking.

## License

MIT. See [LICENSE](LICENSE).
