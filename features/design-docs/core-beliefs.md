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
- Code should be organized so each function, type, and module has one clear purpose.
- Repeated defensive patterns such as null checks should be extracted into reusable helpers when doing so improves clarity and consistency.

## Separation of concerns

- Keep concerns in the layer where they belong instead of smearing them across unrelated modules.
- Persistence concerns belong in repository or equivalent data-access modules rather than handlers, services, or views.
- Logging should be configured centrally according to the chosen stack's best practices; do not pass logger instances around ad hoc when a module-level or context-aware approach is cleaner.
- Prefer small composition boundaries over large multi-purpose functions.
- Favor SOLID, DRY, and ETC style decisions when they make the codebase easier to reason about and evolve.

## Typed boundaries and validation at the edge

- Validate CLI flags, repository metadata, and provider definitions before doing work.
- Do not propagate malformed configuration into prompt generation or command execution.
- Reject unsafe or incomplete input with explicit, actionable errors.
- Pass typed objects across module boundaries instead of ad hoc untyped argument bags.
- Validate external data at the edge of the application whenever possible so the inner layers can operate on consistent, trusted types.

## Testing expectations

- Template rendering, validators, and Codex launch preparation are safety-critical.
- Test both success paths and failure modes, including collision handling and invalid CLI usage.
- Ensure generated prompts and summaries are deterministic and easy to inspect in tests.

## Independent validation

- Non-trivial implementation is not complete until a separate validation subagent has reviewed it.
- The validation-subagent prompt must be distinct from the implementation prompt.
- The validation pass prioritizes correctness and regressions first, test execution second, and style or organization improvements third.
- If the validation pass finds a structural or implementation problem, the work returns to implementation and the validation loop must run again until no material issues remain.

## Review bar

Changes are acceptable only when they are:

- correct and test-backed
- architecturally coherent
- easy for a new engineer to understand
- easier to evolve than before
- explicit about their concerns and boundaries
