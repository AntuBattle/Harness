# Harness

Harness is a TypeScript CLI that scaffolds repositories for agent-ready, closed-loop development.

Its job is split into two commands:

- `harness init`: create a language-agnostic repository scaffold in the current directory with only an optional project-name override.
- `harness configure`: launch an interactive Codex session that interviews the user and personalizes the scaffold for a real project.

## Purpose

Harness should let a team start from a generic repository structure and then specialize it without losing process discipline.

The generated repository is meant to support this loop from day one:

1. Define intent in product specs.
2. Record architecture and tradeoffs in design docs.
3. Execute non-trivial work through ExecPlans.
4. Run validations and archive evidence.
5. Review changes against explicit expectations.

## Current direction

- Harness itself is implemented as a Node-based TypeScript CLI.
- The current implementation keeps the command surface intentionally small and validates all command inputs through typed objects.
- Generated repositories must stay language/framework agnostic until `configure` applies project-specific guidance.
- Codex is the only supported agent runtime for interactive configuration right now.
- `configure` no longer writes prompt-bundle artifacts; it validates the scaffold, builds a seed prompt, and hands control to Codex.

## Repository map

- `AGENTS.md`: agent workflow and execution policy for this repository.
- `ARCHITECTURE.md`: system boundaries and implementation direction for Harness.
- `PLANS.md`: ExecPlan authoring standard.
- `PRODUCT_SPECS.md`: product-spec authoring standard.
- `features/`: versioned product specs, design docs, ExecPlans, generated artifacts, and tech debt tracking.
