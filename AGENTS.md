# Harness Agent Guide

This repository defines the Harness CLI project, a TypeScript tool that scaffolds agent-ready repositories for structured, long-running work.

## Project objective

Build a reliable CLI that can initialize repositories with planning, validation, and review artifacts so agents can operate in closed loops with predictable outcomes.

## Repository map

- `README.md`: project purpose and scope.
- `CHANGELOG.md`: release history and changelog structure.
- `REVIEW.md`: validation and reviewer guide.
- `ARCHITECTURE.md`: planned component boundaries and invariants.
- `PLANS.md`: ExecPlan requirements.
- `PRODUCT_SPECS.md`: product-spec authoring standard.
- `features/product-specs/`: expected CLI behavior and acceptance criteria.
- `features/design-docs/`: design rationale and core beliefs.
- `features/exec-plans/active/`: active implementation plans.
- `features/exec-plans/completed/`: implementation history.
- `features/generated/`: generated evidence artifacts.
- `features/tech-debt-tracker.md`: deferred work log.

## Required workflow

For non-trivial work:

1. Start from `PRODUCT_SPECS.md` and `features/product-specs/`.
2. Update `features/design-docs/` for architecture/tradeoff changes.
3. Create an ExecPlan in `features/exec-plans/active/` before coding.
4. Implement incrementally and validate external inputs at the edge when applicable.
5. Launch a separate validation subagent with an explicit prompt that is different from the implementation prompt and directs the reviewer to `REVIEW.md`.
6. Make that validation prompt point the subagent to the active ExecPlan when available, or provide a contextual summary when it is not.
7. Require the validation subagent to review the latest feature in this order:
   - correctness, regressions, and repository-guideline compliance;
   - test execution and validation results;
   - code repetition plus potential improvements in style or code organization.
8. Iterate on findings until the validation subagent no longer reports material issues.
9. Archive meaningful generated evidence under a day-based folder inside `features/generated/`.
10. Record outcomes and move completed plans to `features/exec-plans/completed/` only after the validation loop is closed.

## ExecPlans

- Use `PLANS.md` as the source of truth.
- Keep active plans as living documents.
- Required sections: `Progress`, `Surprises & Discoveries`, `Decision Log`, `Outcomes & Retrospective`.

## Validation and review intent

Harness is expected to support a local closed-loop flow where:

1. Implementer executes a plan and tests.
2. A separate validation subagent reviews the implementation with a distinct prompt, follows `REVIEW.md`, and runs the relevant tests.
3. Reviewer validates repository consistency and generated evidence.
4. Validation artifacts are archived for traceability.

## Commit discipline

- Use Conventional Commits.
- Each commit should do one clearly scoped thing.
- The commit message should describe that single purpose plainly.

## Release discipline

- Keep notable release history in the root `CHANGELOG.md`.
- Prefer a Keep a Changelog structure with an `Unreleased` section and semantic-versioned release entries when the project uses releases.
- Released feature work should usually bump the minor version, released bug fixes should usually bump the patch version, and breaking changes should bump the major version.
- Always ask the user before editing `CHANGELOG.md` or changing version numbers.
- If the user declines, proceed with the requested work without touching changelog or version references, and do not present those edits as part of the delivered modification.

## Current scaffold limitations

- `harness init` and `harness configure` are implemented as a Node CLI, but only Codex is supported for interactive configuration today.
- Validation currently covers the core CLI flows and template generation through tests; project-specific validators for generated repositories are still the responsibility of the configured project.
- Generated repositories remain intentionally generic until `configure` or a human contributor personalizes them.

Treat this repository as the planning and documentation baseline for implementation.
