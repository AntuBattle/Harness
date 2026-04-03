# ExecPlan: Validation Workflow, Docs, And Packaging

Date: 2026-04-03
Status: Active

## Problem Statement

Harness currently lacks an explicit, enforced validation-subagent workflow in both the repository policy and the generated scaffold. It also lacks end-user documentation under `docs/` and has packaging gaps that make the built CLI unsuitable for seamless installation from a packed artifact.

## Scope

- Update product specs, design docs, and current repository policy to require the validation-subagent workflow.
- Update generated scaffold templates and the interactive configure prompt so configured repositories inherit the workflow.
- Add user-facing documentation under `docs/` suitable for GitHub-hosted docs.
- Fix packaging so the built CLI can be installed and executed cleanly from an npm tarball.
- Validate the change through tests, a packaging smoke test, and an explicit validation-subagent review pass.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Preserve the intentionally small CLI surface.
- Keep the validation-subagent rule explicit in both the current repository and future generated repositories.
- Keep package-install behavior seamless without inventing repository metadata that is not known locally.
- Use small, reviewable commits with one logical change each.

## Ordered Implementation Steps

1. Update current-repository policy, specs, and design docs to define the validation-subagent workflow.
2. Update scaffold templates and the configure seed prompt to encode that workflow into generated repositories.
3. Add focused tests for the new scaffold and prompt behavior.
4. Add packaging fixes and a tarball smoke test.
5. Add `docs/` user guides and docs-hosting-ready structure.
6. Run validation, launch a dedicated validation subagent with a distinct prompt, address findings, and repeat until satisfactory.
7. Complete the retrospective and move this plan to `completed/`.

## Validation Plan

- Run `npm test`.
- Run the packaging smoke test.
- Review generated scaffold text for the validation-subagent rule.
- Launch a separate validation subagent with an explicit review prompt that summarizes the feature set, points to the active ExecPlan, asks it to follow `AGENTS.md`, run tests, and review correctness first, tests second, then repetition/style/organization improvements.

## Rollback / Mitigation

- Keep the validation workflow text centralized where practical to reduce drift between scaffold docs and the configure seed prompt.
- Keep packaging changes isolated so they can be reverted without touching workflow logic if needed.
- Keep docs additive and independent from runtime behavior so install/docs fixes do not destabilize the CLI.

## Progress

- [x] Reviewed the current repository workflow and packaging gaps.
- [x] Rewrote the governing docs to define the validation-subagent rule.
- [ ] Update scaffold generation and configure prompt behavior.
- [ ] Add packaging improvements and smoke validation.
- [ ] Add `docs/` user guides.
- [ ] Run validation, address findings, and complete retrospective.

## Surprises & Discoveries

- The current repository had no commit history, so a bootstrap commit was required before the requested small, logical commits could be produced meaningfully.
- The current npm packaging path points the executable at `dist/`, which means published-package correctness depends on shipping built output explicitly.

## Decision Log

- 2026-04-03: Treat the validation-subagent workflow as a first-class repository policy, not just a configure prompt suggestion.
- 2026-04-03: Use a packaging smoke test in addition to unit tests because the current risk is artifact composition, not only source behavior.

## Outcomes & Retrospective

- Pending implementation.
