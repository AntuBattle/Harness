# ExecPlan: Scaffold Review And Workflow Hardening

Date: 2026-04-07
Status: Completed

## Problem Statement

The Harness scaffold needs stronger defaults for review quality, product-spec authoring, validation closure, and artifact organization. The current scaffold does not generate `REVIEW.md` or `PRODUCT_SPECS.md`, keeps reviewer guidance mixed into `AGENTS.md`, does not explicitly require validation-at-the-edge guidance, and does not make the configure prompt strict enough about staying in markdown-personalization mode instead of implementation mode.

## Scope

- Add `REVIEW.md` and `PRODUCT_SPECS.md` to the scaffold produced by `harness init`.
- Move reviewer-specific guidance out of the generated `AGENTS.md` and into the generated `REVIEW.md`.
- Strengthen the generated validation loop so implementation is not considered complete until an independent validation pass reports no material issues.
- Update generated guidance to require validation at application boundaries, day-based artifact folders under `features/generated/`, and single-purpose Conventional Commits.
- Tighten `harness configure` so its prompt clearly limits Codex to personalizing the existing markdown guidance and repository metadata rather than implementing code or creating ExecPlans or feature product specs.
- Update command tests and supporting documentation to match the new scaffold contract.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/core-beliefs.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Keep `harness init` deterministic, offline, and language agnostic.
- Preserve the small command surface for both `init` and `configure`.
- Keep generated guidance generic enough to work before a stack has been chosen.
- Ensure the validation-subagent prompt remains distinct from the implementation prompt.

## Ordered Implementation Steps

1. Update the product specs and design docs so the new scaffold expectations are explicit.
2. Add scaffold templates for `REVIEW.md` and `PRODUCT_SPECS.md`, then revise the related generated markdown files.
3. Strengthen the shared validation-subagent policy language and the configure prompt so the workflow closes only after an independent validation pass is satisfied.
4. Update command tests and repository docs to reflect the new scaffold outputs and behavior.
5. Run build and test validation.
6. Launch a separate validation subagent with a distinct prompt that points to this ExecPlan, address any material findings, and rerun validation if needed.
7. Complete the retrospective and move the plan to `features/exec-plans/completed/`.

## Validation Plan

- Run `npm run build`.
- Run `npm test`.
- Inspect the generated scaffold expectations through the existing `init` and `configure` tests.
- Launch a validation subagent with a prompt that references this ExecPlan and asks it to review correctness and regressions first, test execution and results second, and code repetition plus style or organization improvements third.

## Validation Subagent Prompt

Review the latest Harness scaffold-hardening change. Use `features/exec-plans/active/2026-04-07-scaffold-review-and-workflow-hardening.md` as the primary context and follow `AGENTS.md`. Review in this order: (1) correctness, regressions, and repository-guideline compliance; (2) test and validation execution/results; (3) code repetition plus opportunities to improve style or organization. Confirm that the new scaffold enforces `REVIEW.md`, `PRODUCT_SPECS.md`, validation-at-the-edge guidance, daily generated-artifact folders, configure-personalization boundaries, and single-purpose Conventional Commits. Run the relevant checks where possible and report only material issues first with file references.

## Rollback / Mitigation

- Keep the change focused on scaffold text, prompt generation, and tests so any regression is isolated to deterministic files.
- Prefer updating shared rendering helpers rather than duplicating policy text across templates.
- If a wording change makes the scaffold internally inconsistent, revert only the contradictory text while preserving the new file layout and tests.

## Progress

- [x] Reviewed the current specs, design docs, scaffold templates, and command tests.
- [x] Updated the contract docs for the new scaffold behavior.
- [x] Implemented the template and prompt changes.
- [x] Updated tests and repository docs.
- [x] Ran build and test validation.
- [x] Ran an independent validation pass and addressed findings.
- [x] Completed the retrospective and moved the plan to `completed/`.

## Surprises & Discoveries

- The first independent validation pass caught that this active ExecPlan had not been updated to reflect the completed implementation and test work.
- A concrete day-folder example like `features/generated/2026-04-07/` reads as more literal than intended, so the guidance should use a reusable `YYYY-MM-DD` placeholder instead.

## Decision Log

- 2026-04-07: Keep the new review guidance in a dedicated generated `REVIEW.md` so `AGENTS.md` can stay focused on execution workflow while reviewer agents get a clearer, stricter checklist.
- 2026-04-07: Use `features/generated/YYYY-MM-DD/` as the generated-artifact example so the guidance is obviously a pattern, not a fixed directory name.

## Outcomes & Retrospective

- `harness init` now generates `REVIEW.md` and `PRODUCT_SPECS.md`, moves reviewer-specific guidance into `REVIEW.md`, and strengthens the generated workflow around validation closure, validation at the edge, day-based artifact folders, and Conventional Commits.
- `harness configure` now requires the new scaffold files and its seed prompt clearly constrains Codex to personalizing the repository guidance and metadata rather than implementing code or creating ExecPlans or feature product specs.
- The first validation pass caught a real process issue: the active ExecPlan had not been updated as a living document. Fixing that and replacing the dated artifact example with a reusable `YYYY-MM-DD` pattern improved both compliance and clarity.
- Validation completed successfully with `npm run build` and `npm test`, and the final independent validation pass reported no material issues.
