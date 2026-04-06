---
title: Closed-Loop Workflow
---

# Closed-Loop Workflow

Harness repositories are designed around an explicit loop:

1. Define intent through `PRODUCT_SPECS.md` and the relevant product specs.
2. Capture architecture and tradeoffs in design docs.
3. Create an ExecPlan before non-trivial implementation.
4. Implement incrementally and run validations.
5. Run a separate validation subagent with a distinct prompt that points the reviewer to `REVIEW.md`.
6. Resolve findings and rerun validation until no material issues remain.
7. Archive evidence under a day-based folder in `features/generated/`.
8. Review changes against explicit expectations.

## Validation Subagent Priority Order

The validation subagent should evaluate the latest feature in this order:

1. correctness, regressions, and repository-guideline compliance;
2. test execution and validation output;
3. code repetition plus improvements in style or code organization.

## Context For The Validation Prompt

The validation prompt should:

- point to the active ExecPlan when one exists;
- otherwise provide a contextual summary of the latest feature;
- instruct the subagent to follow the repository guidance in `AGENTS.md` and `REVIEW.md`.
