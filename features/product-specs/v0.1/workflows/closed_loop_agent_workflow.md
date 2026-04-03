# v0.1 Spec: Closed-Loop Agent Workflow

## Objective

Ensure generated projects support reliable long-running task execution with a clear implementer/reviewer loop.

## Workflow contract

1. Implementer reads product specs and architecture constraints.
2. Implementer creates or updates an ExecPlan.
3. Implementer makes incremental changes and runs validations.
4. Reviewer checks consistency against specs, plans, and generated evidence.
5. Reviewer requests fixes or approves completion.

## Required scaffold support

Generated repositories must include documentation that explains:

- where specs live
- how design docs are maintained
- where ExecPlans are stored
- how generated validation artifacts are reviewed

## Acceptance criteria

- A new contributor can follow the generated docs to execute the loop without external tribal knowledge.
- The workflow emphasizes deterministic validation and clear evidence.
