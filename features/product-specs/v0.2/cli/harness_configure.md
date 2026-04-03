# v0.2 Spec: `harness configure`

Date: 2026-04-03
Status: Approved

## Objective

Provide a single interactive `harness configure` command that launches Codex in the repository and guides the user through a professional, project-specific setup conversation.

## Functional Context

The output of `harness init` is intentionally generic. A real repository still needs concrete decisions about project goals, language, architecture, package management, validation, observability, frontend tooling, and how future agents can implement and test features autonomously. Harness should not expose a wide surface of configuration flags for those choices. Instead, it should validate the scaffold, enforce Codex as the only supported provider for now, and start an interactive Codex session with a strong seed prompt that tells Codex to interview the user and tailor the repository accordingly.

## In Scope

- Validating that the current working directory is a complete Harness scaffold.
- Accepting only a provider selector plus help output.
- Supporting only the local Codex executable.
- Generating an internal seed prompt for Codex.
- Launching an interactive Codex session in the repository so the user can answer setup questions directly through the CLI.

## Out of Scope

- Supporting multiple providers or provider-specific adapter registries.
- Accepting project metadata as individual Harness CLI flags.
- Writing configure manifests, prompt bundles, or run summaries under `features/generated/`.
- Embedding a first-party LLM runtime inside Harness.
- Automatically installing every tool that Codex may recommend.

## Functional Requirements

1. Harness must expose a `configure` command that runs only inside a repository initialized by Harness.
2. The command must accept only:
   - `--provider <name>`
   - `--help`
3. If `--provider` is omitted, Harness must behave as if `codex` was selected.
4. If `--provider` is present with any value other than `codex`, the command must fail with an explicit unsupported-provider error.
5. Any positional arguments or any option other than `--provider` and `--help` must fail with actionable CLI parsing errors.
6. Before launching Codex, Harness must validate that the required scaffold files exist.
7. Harness must construct a deterministic seed prompt that instructs Codex to:
   - read the existing repository docs before changing them;
   - begin by confirming or revising the project name and collecting a project description from the user;
   - infer the language when obvious, otherwise ask the user to choose it;
   - ask about the core architectural and workflow choices that matter for autonomous implementation, including framework choice, package manager or environment tooling, testing strategy, typing and linting, mocking and integration-test setup, external-service emulation, logging visibility, and validation commands;
   - suggest browser or framework dev tools such as Chrome DevTools when the project includes a frontend;
   - ensure the repository gives future agents a way to inspect logs and other runtime signals locally;
   - stay helpful, kind, and professionally opinionated when the user has not made a choice;
   - leave the repository in a state where a future agent can implement and test features autonomously inside the repository without relying on hidden human context.
8. Harness must launch Codex interactively from the repository root with terminal I/O attached to the user session so Codex can ask follow-up questions directly in the CLI.
9. If Codex cannot be started, Harness must fail with an actionable error that identifies that the local `codex` executable is unavailable or failed to launch.

## Business Rules / Constraints

- Codex is the only supported provider in this version of Harness.
- The interactive conversation is the primary configuration interface; Harness must not duplicate it with many narrow flags.
- Harness owns the initial context and validation, but Codex owns the interview and repository personalization.
- The command must not provide hidden arbitrary command overrides.

## Non-Functional Requirements

- The launch flow should feel immediate after validation succeeds.
- The seed prompt must stay deterministic for the same scaffold metadata.
- Error messages must clearly identify unsupported flags, unsupported providers, missing scaffold files, or Codex startup failures.

## Cross-Cutting Concerns

- Validation: reject unknown flags, reject positionals, enforce `codex` as the only provider, and validate scaffold completeness before launch.
- Logging: terminal output should be minimal and should not compete with the interactive Codex session.
- Security: Harness must launch only the trusted `codex` executable and must not accept arbitrary command overrides.
- Traceability: Codex must be prompted to update the repository docs and workflow guidance so the resulting setup is self-describing.

## Acceptance Criteria

- Running `harness configure` in a valid scaffold launches `codex` interactively in that repository.
- Running `harness configure --provider codex` behaves the same as the default path.
- Running `harness configure --provider claude` fails with an actionable unsupported-provider message.
- The seed prompt is explicit enough that Codex starts by interviewing the user about project direction instead of making blind assumptions.
- Running `harness configure` outside a valid Harness scaffold fails before Codex is started.

## References

- `v0.2/cli/harness_init.md`
- `v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`
- `ARCHITECTURE.md`
