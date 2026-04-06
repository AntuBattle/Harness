# Scaffold And Broker Architecture

Date: 2026-04-03
Status: Accepted

## Context

Harness needs to solve two very different problems:

- deterministic repository scaffolding that must work locally with no external dependencies;
- project-specific repository setup that benefits from an interactive agent conversation.

The earlier design added a provider layer, many configure flags, and configure artifacts. That made the CLI more general, but it also made the first real user workflow heavier than necessary. The current priority is to make the tool simpler and more opinionated so it is easier to use and easier to maintain.

## Decision

Harness will keep the split between deterministic scaffolding and agent-driven personalization, but it will simplify the second half aggressively.

### `init` responsibilities

- Create the baseline repository structure in the current working directory.
- Render generic process documentation, including dedicated standards for product specs and review.
- Write only minimal scaffold metadata.
- Accept only a project name override.
- Encode the baseline workflow for validation-at-the-edge, daily generated-artifact folders, and mandatory validation closure.

### `configure` responsibilities

- Validate that the repository is a complete Harness scaffold.
- Build a deterministic seed prompt for Codex.
- Launch Codex interactively in the repository so it can interview the user and personalize the existing markdown guidance and metadata.
- Require Codex to encode the independent validation-subagent loop into the configured repository workflow.
- Keep Codex out of implementation mode during configure: no source-code creation, no ExecPlans, and no feature product-spec authoring.

### Provider model

- Codex is the only supported provider in this version.
- Harness does not maintain a multi-provider adapter registry.
- Harness does not accept arbitrary command overrides.
- Any future provider expansion must justify its complexity against this simpler baseline.

### Distribution model

- Harness is distributed on npm as the public scoped package `@antubattle/harness`.
- The installed executable remains `harness` so the user-facing CLI stays short and stable.
- Documentation and publishing guidance must prefer the scoped package name to avoid collisions with already-taken unscoped names.

## Consequences

### Positive

- The user-facing CLI becomes much easier to learn.
- The setup conversation moves to the place where nuance belongs: an interactive Codex session.
- Harness has fewer parsing branches, fewer runtime combinations, and fewer stale provider abstractions to maintain.
- Typed command objects become more practical because there are fewer variants to model.

### Tradeoffs

- Harness is temporarily coupled to the local Codex CLI.
- Configure runs no longer produce separate manifest or summary artifacts managed by Harness.
- Users who prefer another agent runtime must wait for a later design iteration instead of relying on command overrides today.

## Implementation Notes

- Keep `init` and `configure` option parsing explicit and small.
- Validate the scaffold before launching Codex.
- Launch Codex with inherited terminal I/O so it can ask the user follow-up questions directly.
- Keep the seed prompt specific about autonomous local development expectations, including logs, browser tooling for frontend work, validation strategy, validation at the application edge, and repository self-sufficiency.
- Keep the seed prompt explicit about the mandatory validation-subagent rule, the need for a distinct prompt, the order of review responsibilities in that validation pass, and the rule that implementation is not complete until the validation agent is satisfied.
- Keep generated reviewer guidance separate from implementation guidance so reviewer agents have an obvious single file to follow.
- Keep generated artifact guidance explicit that persisted logs, traces, screenshots, and similar evidence belong in day-based folders under `features/generated/`.
- Use strongly typed command-context objects and parsed option objects across the implementation.
