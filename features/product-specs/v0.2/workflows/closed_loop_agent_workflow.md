# v0.2 Spec: Closed-Loop Agent Workflow

Date: 2026-04-03
Status: Approved

## Objective

Ensure every repository generated and configured by Harness supports a reliable closed-loop workflow in which agents can plan, implement, validate, observe runtime behavior, and document work without relying on tribal knowledge.

## Functional Context

Harness does not only create folders. It establishes an operating model for repositories where agents and humans collaborate through explicit specs, design rationale, execution plans, validation output, and review artifacts. Harness now relies on an interactive Codex-guided configure step to make the repository project-specific, so the baseline workflow docs must remain generic while the configured repository must become concrete about visibility, validation, and local autonomy. That includes reminders to use version-control worktrees, repository hosting CLIs, frontend inspection tools, runtime logs, and any other tooling that lets an agent see and test its own work.

## In Scope

- The repository-operating guidance embedded in generated markdown files.
- Expectations for implementer and reviewer loops.
- Tool-visibility guidance for agents working on backend, frontend, and mixed repositories.
- Requirements for generated evidence, traceability, and local observability.

## Out of Scope

- Defining one single validation stack for every project type.
- Replacing repository-specific coding standards or architecture decisions.
- Automating review approval.

## Functional Requirements

1. Generated repository guidance must define the following baseline loop:
   - read the relevant product specs first;
   - update design docs when architecture or tradeoffs change;
   - create or update an ExecPlan before non-trivial implementation;
   - implement incrementally and run validations;
   - launch a separate validation subagent with a prompt that is explicitly different from the implementation prompt;
   - direct that validation subagent to use the active ExecPlan when present or a contextual summary otherwise;
   - require that validation subagent to review correctness and regressions first, run tests second, and identify repetition or style and organization improvements third;
   - iterate on findings until the validation subagent no longer reports material issues;
   - archive meaningful generated evidence;
   - review against specs, plans, and artifacts.
2. Generated agent guidance must encourage agents to use repository visibility tools when applicable, including:
   - git worktrees for risky or parallel work;
   - repository hosting CLIs such as `gh` for issue and pull-request context;
   - browser or framework dev tools for frontend debugging and verification;
   - logs, traces, and validation outputs for backend and integration debugging.
3. Generated workflow docs must instruct contributors to keep product specs, design docs, and ExecPlans synchronized with implementation changes.
4. Generated repositories must preserve a clear location for validation artifacts and review evidence under `features/generated/`.
5. After interactive configuration, the repository guidance must describe how an agent can validate features locally with enough autonomy to implement, observe, and test changes without needing hidden operator steps.
6. The baseline workflow must remain applicable before the project has chosen a language or framework.

## Business Rules / Constraints

- Closed-loop guidance must be tool-aware and, after configuration, concrete enough for the chosen stack.
- The workflow must be usable by a new contributor without hidden assumptions.
- Generated docs must distinguish between required process structure and project-specific tooling recommendations.
- The validation-subagent prompt must be explicit and distinct from the implementation prompt so review independence is preserved.

## Non-Functional Requirements

- The workflow should be readable enough that contributors can follow it without consulting external documentation.
- Guidance should remain concise enough to live in repository markdown files without becoming a policy dump.

## Cross-Cutting Concerns

- Validation: generated docs must explain where validation evidence belongs, how the configured project should be exercised locally, and how the validation-subagent prompt and findings should be captured.
- Logging: generated guidance must remind contributors to inspect logs and operational signals when troubleshooting.
- Security: generated workflow guidance must not encourage unsafe repository mutation or blind command execution.
- Traceability: decisions, plans, and evidence must remain archived in predictable locations.

## Acceptance Criteria

- A new contributor can read the generated docs and understand how to run a non-trivial change through planning, implementation, validation, observation, and review.
- The guidance remains useful for a Python, Node, frontend, or mixed-stack repository.
- The generated docs explicitly mention worktrees, repository-hosting context, and runtime or browser visibility where relevant.
- The generated docs explicitly require a distinct validation-subagent prompt and describe the review order that subagent must follow.

## References

- `v0.2/cli/harness_init.md`
- `v0.2/cli/harness_configure.md`
- `features/design-docs/scaffold-and-broker-architecture.md`
