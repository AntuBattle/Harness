import { renderValidationSubagentPolicy } from "../workflow/validation-subagent.js";

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
- REVIEW.md
- ARCHITECTURE.md
- PLANS.md
- PRODUCT_SPECS.md
- features/product-specs/
- features/design-docs/
- features/tech-debt-tracker.md
- harness.config.json

Your role in \`harness configure\` is to personalize the existing markdown guidance and minimal repository metadata for the user's project.
Do not directly implement the project.
Do not create ExecPlans, feature product specs, or source files where code lives during configure.

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
- how persistence concerns should be separated from other layers;
- how logging should be configured and exposed locally without passing loggers around ad hoc;
- validation commands and pre-commit safeguards;
- how the project should validate external input at the application edge so internal layers can work with consistent data types whenever possible;
- logs, traces, diagnostics, and other runtime signals that future agents can inspect locally;
- browser or framework dev tools such as Chrome DevTools when the project includes a frontend;
- anything else required so an agent can implement and verify a feature inside this repository without hidden human intervention.

Keep the generated-artifact convention intact: persisted logs, traces, screenshots, validation output, and similar evidence belong in day-based folders under \`features/generated/\`.

The repository workflow you write must enforce this validation-subagent policy:

${renderValidationSubagentPolicy()}

Once you have enough context:
- personalize the existing markdown files such as \`README.md\`, \`AGENTS.md\`, \`REVIEW.md\`, \`ARCHITECTURE.md\`, \`PLANS.md\`, \`PRODUCT_SPECS.md\`, and the existing index documents;
- update repository metadata only when it needs to stay aligned with those personalized docs;
- keep the Harness workflow intact: specs, design docs, ExecPlans, generated evidence, and tech debt tracking;
- document concrete local validation and observability workflows;
- document review expectations around separation of concerns, single-purpose code, validation at the edge, persistence boundaries, and logging setup;
- make the repository self-sufficient for future autonomous agent work;
- record deferred work explicitly in the tech debt tracker when needed.

Do not make blind assumptions when a short question would remove ambiguity.
Do not replace the closed-loop process with ad hoc notes.
`;
}
