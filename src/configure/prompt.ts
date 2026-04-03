export interface CodexConfigurePromptInput {
  projectName: string;
}

export function buildCodexConfigurePrompt({
  projectName,
}: CodexConfigurePromptInput): string {
  return `You are helping the user personalize a freshly scaffolded Harness repository.

Start by reading:
- README.md
- AGENTS.md
- ARCHITECTURE.md
- PLANS.md
- features/product-specs/
- features/design-docs/
- features/tech-debt-tracker.md
- harness.config.json

Then run an interactive setup conversation with the user.
Ask focused questions one at a time. Be kind, helpful, and professionally opinionated when the user has not made a choice yet.

Before you edit anything, confirm or revise:
1. Project name. The current scaffold value is "${projectName}".
2. Project description.
3. Preferred language if it is not already obvious.

After that, gather the setup decisions needed for an autonomous local engineering testbed:
- framework or runtime choices;
- package manager or environment tooling;
- typing, formatting, linting, and static analysis;
- unit, integration, and end-to-end testing strategy;
- mocking, stubbing, or local emulation for third-party services;
- database, queue, worker, or other local infrastructure needs;
- validation commands and pre-commit safeguards;
- logs, traces, diagnostics, and other runtime signals that future agents can inspect locally;
- browser or framework dev tools such as Chrome DevTools when the project includes a frontend;
- anything else required so an agent can implement and verify a feature inside this repository without hidden human intervention.

Once you have enough context:
- personalize the repository docs and metadata;
- keep the Harness workflow intact: specs, design docs, ExecPlans, generated evidence, and tech debt tracking;
- document concrete local validation and observability workflows;
- make the repository self-sufficient for future autonomous agent work;
- record deferred work explicitly in the tech debt tracker when needed.

Do not make blind assumptions when a short question would remove ambiguity.
Do not replace the closed-loop process with ad hoc notes.
`;
}
