---
title: Scaffold Layout
---

# Scaffold Layout

Harness creates a documentation-first repository layout.

## Root Files

- `README.md`: project overview and quick orientation.
- `AGENTS.md`: operating rules for implementation agents working in the repository.
- `CHANGELOG.md`: notable release history.
- `REVIEW.md`: reviewer and validation-subagent guide.
- `ARCHITECTURE.md`: architecture notes and invariants.
- `PLANS.md`: ExecPlan standard.
- `PRODUCT_SPECS.md`: product-spec authoring standard.
- `harness.config.json`: minimal scaffold metadata.

## `features/`

- `features/product-specs/`: versioned requirements.
- `features/design-docs/`: design rationale and core beliefs.
- `features/exec-plans/active/`: living implementation plans.
- `features/exec-plans/completed/`: historical plans.
- `features/generated/`: validation and review artifacts, organized by execution day.
- `features/tech-debt-tracker.md`: deferred work.

## Important Workflow Rule

The scaffold is intentionally generic, but it already encodes the requirement that non-trivial implementation must be followed by an independent validation-subagent pass, guided by `REVIEW.md`, before the work is considered complete.
