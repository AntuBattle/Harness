# ExecPlan: Simplify CLI And Interactive Codex Configure

Date: 2026-04-03
Status: Completed

## Problem Statement

Harness currently exposes a wider CLI surface than needed and models `configure` as a general provider-broker workflow. The desired direction is much simpler: `init` should only accept a project name override, `configure` should only support Codex, and the actual project-specific setup should happen through an interactive Codex conversation started by Harness.

## Scope

- Rewrite the relevant product and design docs around the smaller CLI contract.
- Simplify the scaffold metadata and generated guidance to match the new model.
- Migrate the CLI implementation to strongly typed TypeScript.
- Replace the provider-registry configure flow with a Codex-only interactive launcher.
- Update tests to cover the smaller argument surface, validation behavior, and Codex launch preparation.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Keep the external UX intentionally small.
- Preserve the language-agnostic baseline scaffold.
- Enforce typed objects at command and helper boundaries.
- Keep the configure launch interactive so the user can answer Codex directly in the terminal.

## Ordered Implementation Steps

1. Update product and design docs for the simplified command surface and interactive Codex flow.
2. Create typed command-context and parsed-option objects, migrating the runtime to TypeScript where that materially simplifies correctness.
3. Simplify `init` parsing and scaffold metadata generation.
4. Replace provider resolution and configure artifacts with a Codex-only interactive launch flow and seed prompt.
5. Update scaffold templates, root documentation, and tests to reflect the new behavior.
6. Run validation, record outcomes, and move this plan to `completed/`.

## Validation Plan

- Run the test suite.
- Exercise `harness init --help`.
- Exercise `harness init` in a temporary directory.
- Exercise `harness configure --help`.
- Exercise `harness configure` with a test double for process launch.

## Rollback / Mitigation

- Keep the configure launch boundary small so a later provider abstraction can be reintroduced if justified.
- Keep the seed prompt isolated in one module so the interactive behavior can be revised without rewriting the command flow.
- Preserve deterministic scaffold rendering so regressions remain easy to spot in tests.

## Progress

- [x] Reviewed the existing docs and runtime behavior.
- [x] Rewrote the governing product and design docs for the simplified model.
- [x] Migrated the codebase to typed TypeScript objects.
- [x] Implemented the smaller `init` and interactive `configure` behavior.
- [x] Updated and ran validation.
- [x] Completed the retrospective and moved this plan to `completed/`.

## Surprises & Discoveries

- The previous provider abstraction touched both the scaffold metadata and the configure implementation, so simplifying `configure` also requires simplifying the generated `harness.config.json`.
- Converting the runtime to TypeScript was straightforward, but `exactOptionalPropertyTypes` forced a few useful cleanups where optional properties were being passed around as explicit `undefined`.

## Decision Log

- 2026-04-03: Keep `configure` Codex-only for now instead of preserving premature provider abstraction.
- 2026-04-03: Prefer a TypeScript migration over JSDoc-only typing so command contexts and parsed options are unambiguously typed.
- 2026-04-03: Keep `configure` artifact-free and launch Codex directly with inherited terminal I/O instead of preserving the older manifest-and-summary workflow.

## Outcomes & Retrospective

- Rewrote the product and design docs around a deliberately smaller CLI contract.
- Migrated the active runtime and tests from JavaScript to TypeScript with typed command-context, config, and spawn abstractions.
- Simplified `harness init` to the current-directory workflow with only `--project-name` and `--help`.
- Replaced the provider registry and prompt-bundle flow with a Codex-only interactive configure launcher and a deterministic seed prompt.
- Updated the scaffold templates and repository docs to match the new behavior.
- Validation completed with `npm test`.
