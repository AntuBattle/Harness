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
- Validation-subagent prompt or prompt recipe that is distinct from the implementation prompt.
- How validation findings and artifacts will be recorded and resolved before acceptance.
- Rollback or mitigation notes for risky changes.

## Lifecycle

1. Create plan before implementation.
2. Update plan during execution.
3. Run the validation subagent and address findings before acceptance.
4. Complete retrospective with actual outcomes.
5. Move to `completed/` after acceptance.
