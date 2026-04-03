# Core Beliefs

These principles define the default engineering standard for Harness.

## Pragmatic engineering

- Correctness first, then simplicity, then convenience.
- Favor explicit behavior over hidden automation.
- Optimize for reliable long-running execution, not clever one-off scaffolding.
- Keep generated repositories easy to understand by humans and agents.
- Shrink the command surface unless a new option clearly buys real user value.

## Language-agnostic defaults

- `harness init` must avoid assuming a language, framework, package manager, or hosting model.
- Project-specific recommendations belong in `configure`, not in the baseline scaffold.
- Generated docs should describe process and decision points before they prescribe tooling.

## Codex-first agent integration

- Harness should start with one excellent agent integration before it grows provider abstraction.
- The first supported agent runtime is the local Codex CLI.
- Harness is responsible for validation and the initial configuration prompt.
- Codex is responsible for the interactive interview and repository personalization work.

## Naming and readability

- Functions should be named as actions and reflect domain intent.
- Modules should map to clear responsibilities: parse, validate, render, write, invoke.
- Comments should explain non-obvious reasoning, not restate the code.

## Typed boundaries and validation at the edge

- Validate CLI flags, repository metadata, and provider definitions before doing work.
- Do not propagate malformed configuration into prompt generation or command execution.
- Reject unsafe or incomplete input with explicit, actionable errors.
- Pass typed objects across module boundaries instead of ad hoc untyped argument bags.

## Testing expectations

- Template rendering, validators, and Codex launch preparation are safety-critical.
- Test both success paths and failure modes, including collision handling and invalid CLI usage.
- Ensure generated prompts and summaries are deterministic and easy to inspect in tests.

## Review bar

Changes are acceptable only when they are:

- correct and test-backed
- architecturally coherent
- easy for a new engineer to understand
- easier to evolve than before
