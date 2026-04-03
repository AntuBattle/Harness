# ExecPlans Standard

ExecPlans are required for complex features and significant refactors.
An ExecPlan must be detailed enough that an engineer can execute it without hidden assumptions.

## Location

- Active: `features/exec-plans/active/`
- Completed: `features/exec-plans/completed/`

## Required sections

Every active ExecPlan must include and keep updated:

- `## Progress`
- `## Surprises & Discoveries`
- `## Decision Log`
- `## Outcomes & Retrospective`

## Minimum content expectations

- Problem statement and scope.
- Referenced product spec(s).
- Design implications and constraints.
- Ordered implementation steps.
- Validation plan (unit/integration/validators).
- Rollback or mitigation notes for risky changes.

## Lifecycle

1. Create plan before implementation.
2. Update plan during execution.
3. Complete retrospective with actual outcomes.
4. Move to `completed/` after acceptance.
