# v0.2 Spec: `harness init`

Date: 2026-04-07
Status: Approved

## Objective

Provide a very small `harness init` command that creates the baseline agent-ready repository scaffold with no project-specific setup burden beyond an optional project name, while still encoding strong defaults for planning, reviewing, validation closure, and artifact organization.

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
   - `CHANGELOG.md`
   - `REVIEW.md`
   - `ARCHITECTURE.md`
   - `PLANS.md`
   - `PRODUCT_SPECS.md`
   - `harness.config.json`
   - `features/README.md`
   - `features/product-specs/index.md`
   - `features/design-docs/index.md`
   - `features/exec-plans/README.md`
   - `features/exec-plans/active/README.md`
   - `features/exec-plans/completed/README.md`
   - `features/generated/README.md`
   - `features/tech-debt-tracker.md`
6. The generated documents must remain language agnostic, must explain that `harness configure` is the interactive step that tailors the repository for a real project, and must already establish the baseline expectation that non-trivial implementation ends with a separate validation-subagent review pass.
7. The generated `AGENTS.md` must:
   - reference `REVIEW.md` as the dedicated guide for reviewer and validation-subagent work;
   - reference `CHANGELOG.md` as the root release-history file for notable changes;
   - require Conventional Commits for committed work;
   - require each commit to do one clearly scoped thing that matches its commit message.
8. The generated `REVIEW.md` must stress that reviewers must check:
   - correctness, regressions, and repository-guideline compliance before anything else;
   - separation of concerns and single-purpose code structure;
   - validation at application boundaries so internal layers can operate on consistent types when possible;
   - centralized logging setup and the rule that loggers should not be passed around ad hoc;
   - SOLID, DRY, and ETC style expectations, including extracting repeated null checks or similar defensive patterns into reusable helpers when that improves clarity.
9. The generated workflow guidance must state that every time an implementation pass is considered complete, a separate validation subagent must be launched, the implementation stays incomplete until that reviewer reports no material issues, and the ExecPlan cannot move to `completed/` until that loop is closed.
10. The generated `CHANGELOG.md` and related workflow guidance must:
   - place the changelog at the repository root;
   - recommend a Keep a Changelog style structure with an `Unreleased` section and semantic-versioned release entries when the project uses releases;
   - explain that feature work and bug fixes should be reflected in appropriate version bumps when releases are being prepared;
   - require the agent to ask the user for approval before editing changelogs or version numbers;
   - require the agent to proceed with the requested implementation without touching changelogs or version numbers if the user declines.
11. The generated guidance for `features/generated/` must require runtime logs, validation output, screenshots, traces, and similar artifacts to be stored under day-based subdirectories such as `features/generated/YYYY-MM-DD/`, while keeping `features/generated/README.md` at the directory root.
12. The generated `harness.config.json` must record:
   - Harness version
   - scaffold version
   - project name
13. If any generated path already exists, `init` must fail before writing and must identify the conflicting files.
14. The command must emit a concise, deterministic summary of the files it created.

## Business Rules / Constraints

- `init` must stay offline and deterministic.
- The scaffold must remain useful before the user has chosen a language, framework, or testing stack.
- The command surface must stay intentionally small until later iterations justify new flags.
- Generated filenames and contents must remain predictable and reviewable.
- Validation and review guidance must stay strong without assuming a specific application architecture or language.
- Release guidance must stay generic enough to apply beyond npm while still encouraging SemVer-style discipline where versioned releases exist.

## Non-Functional Requirements

- The command should feel immediate in a local terminal.
- Validation must happen before the first write.
- Output must stay concise enough that the important result is obvious at a glance.

## Cross-Cutting Concerns

- Validation: reject unknown flags, reject positionals, and detect path conflicts before writing. Generated docs must also teach validation at application boundaries so inner layers can rely on consistent types whenever possible.
- Logging: print only the command result and created paths, not verbose trace output.
- Release hygiene: generated docs must teach changelog and version discipline without allowing the agent to change either automatically.
- Reviewability: generated reviewer guidance must be explicit enough that a separate validation agent can detect structural problems, not only test failures.
- Security: `init` must not execute external commands or depend on network access.
- Traceability: the generated scaffold must preserve explicit locations for specs, design rationale, plans, generated artifacts, and deferred work.

## Acceptance Criteria

- Running `harness init` in an empty directory creates the full baseline scaffold and infers the project name from the current directory.
- Running `harness init --project-name "My Project"` writes the same scaffold while using the provided project name in generated files and config.
- The generated scaffold includes `CHANGELOG.md`, `REVIEW.md`, and `PRODUCT_SPECS.md`, and the generated `AGENTS.md` references them.
- The generated workflow docs explicitly require a separate validation-subagent closure loop, day-based folders under `features/generated/`, validation at the edge, single-purpose Conventional Commits, and explicit user approval before changelog or version edits.
- Running `harness init` in a directory with conflicting generated paths fails with an actionable conflict list.
- Passing an unsupported flag or positional argument to `harness init` fails immediately.

## References

- `v0.2/cli/harness_configure.md`
- `v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`
- `PLANS.md`
