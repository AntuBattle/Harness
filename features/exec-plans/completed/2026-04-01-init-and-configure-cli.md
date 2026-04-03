# ExecPlan: Initial Harness CLI For `init` And `configure`

Date: 2026-04-01
Status: Completed

## Problem Statement

Harness currently exists only as a documentation scaffold. The project needs a real JavaScript CLI that can both generate the baseline repository structure and broker project-specific personalization to an external coding agent.

## Scope

- Update product and design docs to reflect the language-agnostic scaffold plus provider-based configure flow.
- Implement a Node CLI with `init` and `configure` commands.
- Add baseline tests for scaffold generation, collision handling, configure artifact generation, and provider execution.
- Update documentation and tech-debt tracking based on actual implementation outcomes.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Keep the implementation dependency-light.
- Keep `init` language agnostic.
- Avoid hard-coding provider behavior that depends on one vendor's exact CLI syntax.
- Preserve deterministic file generation and dry-run behavior.

## Ordered Implementation Steps

1. Rewrite product and design docs so the repository contract is explicit.
2. Create the Node package metadata and CLI entrypoint.
3. Implement shared parsing, filesystem, and validation helpers.
4. Implement scaffold rendering and `init`.
5. Implement prompt composition, provider resolution, and `configure`.
6. Add tests for the highest-risk paths.
7. Run validation and update docs/plan outcomes.

## Validation Plan

- Run the Node test suite.
- Exercise `harness init --dry-run`.
- Exercise `harness configure --dry-run`.
- Exercise `harness configure` with a stub provider command in tests.

## Rollback / Mitigation

- Keep the provider adapter interface small so vendor-specific details can be revised without rewriting the scaffold flow.
- Prefer feature-complete dry-run behavior so failures can be diagnosed without side effects.

## Progress

- [x] Reviewed repository docs and current gaps.
- [x] Reframed product intent around `init` plus provider-based `configure`.
- [x] Implemented CLI package and commands.
- [x] Added tests and ran validation.
- [x] Completed retrospective and moved plan to `completed/`.

## Surprises & Discoveries

- The repository still described a Python-first architecture even though the project objective is a JavaScript CLI.
- Existing v0.1 specs were too thin to safely drive implementation of `configure`.
- A small provider-adapter layer plus explicit command overrides was enough to support real command execution without coupling Harness to one agent runtime.

## Decision Log

- 2026-04-01: Keep `init` fully deterministic and offline.
- 2026-04-01: Model `configure` as a prompt broker with overridable provider adapters instead of embedding one agent vendor's behavior.
- 2026-04-01: Write configure artifacts before provider execution so failed runs remain reviewable.

## Outcomes & Retrospective

- Implemented a dependency-light Node CLI with `harness init` and `harness configure`.
- `init` now generates a deterministic, language-agnostic scaffold with overwrite and dry-run support.
- `configure` now writes prompt/manifest/summary artifacts and can invoke either built-in or custom provider commands.
- Added Node test coverage for scaffold generation, dry-run behavior, configure artifact generation, and custom provider execution.
- Remaining risk centers on provider preset drift and the absence of a dedicated validator command, both recorded in the tech debt tracker.
