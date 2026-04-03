# v0.2 Spec: `harness init`

Date: 2026-04-03
Status: Approved

## Objective

Provide a very small `harness init` command that creates the baseline agent-ready repository scaffold with no project-specific setup burden beyond an optional project name.

## Functional Context

Harness is a local CLI for bootstrapping repositories that support closed-loop work through product specs, design docs, ExecPlans, validation evidence, and agent guidance. The previous `init` contract accumulated extra options that are not essential for the first useful version of the tool. The current direction is to keep `init` minimal and deterministic, then let `harness configure` drive project-specific setup interactively through Codex.

## In Scope

- Creating the baseline repository scaffold in the current working directory.
- Accepting only a project name override plus help output.
- Writing generic documentation and process files that are ready for later Codex-guided personalization.
- Recording minimal scaffold metadata in `harness.config.json`.
- Rejecting conflicting writes with actionable errors.

## Out of Scope

- Accepting a target directory.
- Accepting a project description or any other project-specific setup metadata.
- Dry-run mode, force-overwrite mode, or any other convenience flags.
- Invoking any external agent runtime.
- Creating language-specific source files or tool configuration.

## Functional Requirements

1. Harness must expose an `init` command that writes the scaffold into the current working directory only.
2. The command must accept only:
   - `--project-name <name>`
   - `--help`
3. Any positional arguments or any option other than `--project-name` and `--help` must fail with actionable CLI parsing errors.
4. If `--project-name` is omitted, `init` must infer the project name from the current directory name.
5. The command must create the following baseline outputs:
   - `README.md`
   - `AGENTS.md`
   - `ARCHITECTURE.md`
   - `PLANS.md`
   - `harness.config.json`
   - `features/README.md`
   - `features/product-specs/index.md`
   - `features/design-docs/index.md`
   - `features/exec-plans/README.md`
   - `features/exec-plans/active/README.md`
   - `features/exec-plans/completed/README.md`
   - `features/generated/README.md`
   - `features/tech-debt-tracker.md`
6. The generated documents must remain language agnostic and must explain that `harness configure` is the interactive step that tailors the repository for a real project.
7. The generated `harness.config.json` must record:
   - Harness version
   - scaffold version
   - project name
8. If any generated path already exists, `init` must fail before writing and must identify the conflicting files.
9. The command must emit a concise, deterministic summary of the files it created.

## Business Rules / Constraints

- `init` must stay offline and deterministic.
- The scaffold must remain useful before the user has chosen a language, framework, or testing stack.
- The command surface must stay intentionally small until later iterations justify new flags.
- Generated filenames and contents must remain predictable and reviewable.

## Non-Functional Requirements

- The command should feel immediate in a local terminal.
- Validation must happen before the first write.
- Output must stay concise enough that the important result is obvious at a glance.

## Cross-Cutting Concerns

- Validation: reject unknown flags, reject positionals, and detect path conflicts before writing.
- Logging: print only the command result and created paths, not verbose trace output.
- Security: `init` must not execute external commands or depend on network access.
- Traceability: the generated scaffold must preserve explicit locations for specs, design rationale, plans, generated artifacts, and deferred work.

## Acceptance Criteria

- Running `harness init` in an empty directory creates the full baseline scaffold and infers the project name from the current directory.
- Running `harness init --project-name "My Project"` writes the same scaffold while using the provided project name in generated files and config.
- Running `harness init` in a directory with conflicting generated paths fails with an actionable conflict list.
- Passing an unsupported flag or positional argument to `harness init` fails immediately.

## References

- `v0.2/cli/harness_configure.md`
- `v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`
- `PLANS.md`
