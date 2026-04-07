# Harness Review Guide

Use this file when acting as the validation subagent or as a reviewer for Harness changes.

## Required Review Workflow

1. Read `AGENTS.md`, this file, the active ExecPlan, the relevant product specs, and the relevant design docs. If there is no active ExecPlan, require a contextual summary before reviewing.
2. Review the latest change in this order:
   - correctness, regressions, and repository-guideline compliance;
   - test execution and validation results;
   - code repetition plus opportunities to simplify style or organization.
3. If you find a material issue, require implementation changes and a fresh validation pass.
4. Treat the work as incomplete until no material issues remain.
5. Do not allow an ExecPlan to move to `features/exec-plans/completed/` until the validation loop is closed.

## What To Check Especially

- The implementation matches the relevant product specs, the active ExecPlan, and the design docs.
- Each module, type, and function has one clear purpose.
- Concerns are correctly separated instead of being mixed into large multi-purpose code paths.
- Persistence or filesystem interaction lives in the right abstraction layer instead of leaking through unrelated modules.
- Logging and command output remain deliberately configured; do not introduce ad hoc logger passing or noisy incidental output.
- Validation happens at the edge where possible so inner logic works with consistent data.
- SOLID, DRY, and ETC principles are respected when they improve clarity and maintainability.
- Repeated null checks, guard clauses, or similar defensive patterns are extracted when reuse improves readability.

## Artifact And Traceability Checks

- Meaningful generated evidence is stored under a day-based folder such as `features/generated/YYYY-MM-DD/`.
- Persisted logs, traces, or screenshots are not dropped directly into the root of `features/generated/`.
- Findings and acceptance state are reflected in the active ExecPlan.

## Release And Change-Management Checks

- If `CHANGELOG.md` or version numbers changed, verify that the user explicitly requested or approved those edits.
- If the user declined changelog or version updates, do not treat their absence as a defect for the requested implementation.
