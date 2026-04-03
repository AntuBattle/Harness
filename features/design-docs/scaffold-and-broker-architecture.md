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
- Render generic process documentation.
- Write only minimal scaffold metadata.
- Accept only a project name override.

### `configure` responsibilities

- Validate that the repository is a complete Harness scaffold.
- Build a deterministic seed prompt for Codex.
- Launch Codex interactively in the repository so it can interview the user and personalize the setup.

### Provider model

- Codex is the only supported provider in this version.
- Harness does not maintain a multi-provider adapter registry.
- Harness does not accept arbitrary command overrides.
- Any future provider expansion must justify its complexity against this simpler baseline.

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
- Keep the seed prompt specific about autonomous local development expectations, including logs, browser tooling for frontend work, validation strategy, and repository self-sufficiency.
- Use strongly typed command-context objects and parsed option objects across the implementation.
