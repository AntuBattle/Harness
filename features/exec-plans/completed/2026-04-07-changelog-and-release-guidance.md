# ExecPlan: Changelog And Release Guidance

Date: 2026-04-07
Status: Completed

## Problem Statement

Harness currently does not generate a root `CHANGELOG.md`, and its scaffold guidance does not explain how agents should handle changelogs and version bumps. The generated workflow should treat changelog maintenance and version bumps as best-practice release hygiene, but it also needs to keep those actions under explicit user control. The scaffold must therefore generate a changelog, explain SemVer-style release expectations, and require agents to ask the user before editing changelogs or version numbers.

## Scope

- Add `CHANGELOG.md` to the scaffold produced by `harness init`.
- Add a root `CHANGELOG.md` to the Harness repository.
- Update generated guidance so changelog and version edits follow best practices and require explicit user approval.
- Update `harness configure` to recognize `CHANGELOG.md` as part of a complete scaffold and to avoid touching changelogs or version numbers without user approval.
- Update tests and repository docs to match the new scaffold contract.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/core-beliefs.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Keep `harness init` deterministic, offline, and language agnostic.
- Keep generated release guidance generic enough to fit repositories that may not publish immediately.
- Do not bump Harness package versions as part of this change unless the user explicitly asks.
- Keep changelog and version edits under explicit user control in the generated workflow.

## Ordered Implementation Steps

1. Update the product specs and design docs to define the new changelog and release-guidance behavior.
2. Add scaffold generation for `CHANGELOG.md` and revise the related generated markdown files.
3. Update `harness configure` so `CHANGELOG.md` is treated as part of the required scaffold and the prompt preserves the ask-first rule for changelog and version edits.
4. Add the real root `CHANGELOG.md` for Harness and align repository docs.
5. Update tests and run build/test validation.
6. Launch a separate validation subagent with a distinct prompt that points to this ExecPlan, address any material findings, and rerun validation if needed.
7. Complete the retrospective and move the plan to `features/exec-plans/completed/`.

## Validation Plan

- Run `npm run build`.
- Run `npm test`.
- Confirm the scaffold tests cover `CHANGELOG.md` generation and configure completeness checks.
- Launch a validation subagent with a prompt that references this ExecPlan and asks it to review correctness and regressions first, test execution and results second, and code repetition plus style or organization improvements third.

## Validation Subagent Prompt

Review the latest Harness changelog-and-release-guidance change. Use `features/exec-plans/active/2026-04-07-changelog-and-release-guidance.md` as the primary context and follow `AGENTS.md` and `REVIEW.md`. Review in this order: (1) correctness, regressions, and repository-guideline compliance; (2) test and validation execution/results; (3) code repetition plus opportunities to improve style or organization. Confirm that the new scaffold generates `CHANGELOG.md`, explains SemVer-style release hygiene, requires explicit user approval before editing changelogs or version numbers, and proceeds cleanly without touching them if approval is denied. Run the relevant checks where possible and report only material issues first with file references.

## Rollback / Mitigation

- Keep the change focused on deterministic scaffold text, prompt generation, docs, and tests.
- Avoid tying the generic scaffold to npm-specific release rules.
- If wording around approval behavior becomes confusing, prefer shorter explicit instructions over broader release-policy prose.

## Progress

- [x] Reviewed the current scaffold, docs, and tests around init/configure.
- [x] Updated the contract docs for changelog and release-guidance behavior.
- [x] Implemented the template and prompt changes.
- [x] Added the root changelog and aligned repository docs.
- [x] Updated tests and ran build/test validation.
- [x] Ran an independent validation pass and addressed findings.
- [x] Completed the retrospective and moved the plan to `completed/`.

## Surprises & Discoveries

- The repository's current package version was already `0.2.0`, so this change could add changelog guidance without performing a new version bump.
- The validation pass highlighted that backfilling a `0.2.0` changelog entry would count as release bookkeeping, so it should stay out of scope unless explicitly requested or approved by the user.

## Decision Log

- 2026-04-07: Keep changelog and version edits behind explicit user approval even though the scaffold should recommend release best practices by default.

## Outcomes & Retrospective

- `harness init` now generates a root `CHANGELOG.md` and threads changelog/version discipline through the generated `AGENTS.md`, `REVIEW.md`, `PLANS.md`, and related repository guidance.
- `harness configure` now requires `CHANGELOG.md` as part of a complete scaffold and its seed prompt preserves the rule that changelog and version edits require explicit user approval.
- The repository now has a root `CHANGELOG.md` with an `Unreleased` section and release-history guidance, but it intentionally does not backfill a `0.2.0` release entry because that would be separate release bookkeeping.
- Validation completed successfully with `npm run build`, `npm test`, and an independent validation pass that reported no material issues.
