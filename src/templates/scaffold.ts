import type { FileEntry } from "../types.js";
import { renderValidationSubagentPolicy } from "../workflow/validation-subagent.js";

const HARNESS_VERSION = "0.1.0";
const SCAFFOLD_VERSION = "0.2";

export interface ScaffoldTemplateInput {
  projectName: string;
}

function stringifyJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function renderRootReadme({ projectName }: ScaffoldTemplateInput): string {
  return `# ${projectName}

This repository was scaffolded by Harness for agent-ready, closed-loop development.

## Workflow

1. Define behavior in \`features/product-specs/\`.
2. Capture architecture and tradeoffs in \`features/design-docs/\`.
3. Use ExecPlans in \`features/exec-plans/\` for non-trivial work.
4. Archive generated evidence in \`features/generated/\`.
5. Run a separate validation subagent review before considering non-trivial work complete.
6. Track deliberate deferrals in \`features/tech-debt-tracker.md\`.

## Current State

- This repository is intentionally generic.
- Run \`harness configure\` to start an interactive Codex session that personalizes it.
- Keep the closed-loop workflow intact as the project becomes concrete.

## Repository Map

- \`AGENTS.md\`: operating guide for coding agents.
- \`ARCHITECTURE.md\`: system boundaries and invariants.
- \`PLANS.md\`: ExecPlan standard.
- \`features/\`: product specs, design docs, plans, generated artifacts, and tech debt tracking.
`;
}

function renderAgentsGuide({ projectName }: ScaffoldTemplateInput): string {
  return `# ${projectName} Agent Guide

This repository is structured for spec-driven, closed-loop development.

## Required Workflow

For non-trivial work:

1. Start from \`features/product-specs/\`.
2. Update \`features/design-docs/\` when architecture or tradeoffs change.
3. Create or update an ExecPlan in \`features/exec-plans/active/\`.
4. Implement incrementally and run validations.
5. Run the separate validation-subagent pass.
6. Archive meaningful outputs under \`features/generated/\`.
7. Move accepted plans to \`features/exec-plans/completed/\`.

## Validation Subagent Requirement

${renderValidationSubagentPolicy()}

## Repository Visibility Tools

- Use \`git worktree\` for risky or parallel work when it improves safety.
- Use repository-hosting CLIs such as \`gh\` when issue or pull-request context matters.
- Use browser or framework dev tools for frontend debugging and verification when applicable.
- Inspect logs, traces, test output, and generated evidence before concluding on failures.
- Keep the repository more self-sufficient after every change, not less.

## Guardrails

- Do not assume hidden context.
- Validate external inputs and config at the edge.
- Prefer small, verifiable changes over wide speculative edits.
- Preserve or improve traceability in specs, design docs, plans, and generated evidence.
`;
}

function renderArchitecture({ projectName }: ScaffoldTemplateInput): string {
  return `# ${projectName} Architecture

This document captures the intended architecture for ${projectName}.

## Mission

Describe the concrete project purpose once \`harness configure\` has gathered enough context.

## Current Direction

This repository starts from a generic Harness scaffold. Update this document as the system boundaries, runtime choices, deployment model, observability strategy, and invariants become concrete.

## Suggested Sections To Maintain

- system context
- major components and responsibilities
- invariants and constraints
- cross-cutting concerns such as logging, security, and validation
- operational and review expectations
`;
}

function renderPlansStandard(): string {
  return `# ExecPlans Standard

ExecPlans are required for complex features and significant refactors.
An ExecPlan must be detailed enough that an engineer or agent can execute it without hidden assumptions.

## Location

- Active: \`features/exec-plans/active/\`
- Completed: \`features/exec-plans/completed/\`

## Required Sections

Every active ExecPlan must include and keep updated:

- \`## Progress\`
- \`## Surprises & Discoveries\`
- \`## Decision Log\`
- \`## Outcomes & Retrospective\`

## Minimum Content Expectations

- problem statement and scope
- referenced product spec(s)
- design implications and constraints
- ordered implementation steps
- validation plan
- validation-subagent prompt or prompt recipe that is distinct from the implementation prompt
- how validation findings and artifacts will be recorded and resolved before acceptance
- rollback or mitigation notes for risky changes

## Validation Subagent Requirement

${renderValidationSubagentPolicy()}

## Lifecycle

1. Create the plan before implementation.
2. Update the plan during execution.
3. Run the validation subagent and address findings before acceptance.
4. Complete the retrospective with actual outcomes.
5. Move the plan to \`completed/\` after acceptance.
`;
}

function renderFeaturesReadme(): string {
  return `# Features Workspace

This directory stores product intent, design rationale, execution plans, and generated evidence.

## Structure

- \`product-specs/\`: requirements and expected behavior.
- \`design-docs/\`: architecture rationale and engineering principles.
- \`exec-plans/active/\`: living implementation plans.
- \`exec-plans/completed/\`: historical plans.
- \`generated/\`: generated reports and derived artifacts.
- \`tech-debt-tracker.md\`: deferred work backlog.

## Usage

1. Start from product specs.
2. Update design docs for architecture decisions.
3. Create and maintain ExecPlans for non-trivial implementation.
4. Store generated evidence in \`generated/\`.
`;
}

function renderProductSpecsIndex(): string {
  return `# Product Specs Index

Track versioned product specifications for this repository here.

## Guidance

- Add one folder per release or milestone when the project matures.
- Keep specs self-sufficient and explicit.
- Update this index whenever a new spec is added or an old one is superseded.
`;
}

function renderDesignDocsIndex(): string {
  return `# Design Docs Index

Track design rationale documents for this repository here.

## Guidance

- Capture architecture decisions and tradeoffs that materially affect implementation.
- Keep this index current as design docs are added or superseded.
`;
}

function renderExecPlansReadme(): string {
  return `# ExecPlans

ExecPlans are the execution layer between specs, design, and implementation.

## Layout

- \`active/\`: in-progress plans.
- \`completed/\`: accepted plans kept for historical context.

## Rule

For complex features and significant refactors, an ExecPlan is mandatory.
Follow \`PLANS.md\`.
`;
}

function renderActiveExecPlansReadme(): string {
  return `# Active ExecPlans

Store in-progress plans here.

Naming recommendation:

\`YYYY-MM-DD-short-topic.md\`

Keep each plan updated as a living document during implementation.
`;
}

function renderCompletedExecPlansReadme(): string {
  return `# Completed ExecPlans

Move finalized ExecPlans here once implementation is accepted.

Completed plans are historical engineering records used for:

- onboarding context
- regression investigations
- architectural decision traceability
`;
}

function renderGeneratedReadme(): string {
  return `# Generated Artifacts

This directory stores generated outputs only.

Examples:

- validation reports
- validation-subagent prompts and findings
- screenshots or browser captures
- runtime logs or traces saved for review
- deterministic snapshots

Rules:

- Prefer regeneration over manual edits.
- Keep artifact naming predictable and collision-safe.
- Preserve history for review traceability.
`;
}

function renderTechDebtTracker(): string {
  return `# Tech Debt Tracker

Track deliberate debt that is deferred, not ignored.

| ID | Area | Description | Impact | Priority | Owner | Target Milestone | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TD-001 | Project Setup | Record the first project-specific toolchain decisions after interactive configuration. | New contributors may lack implementation context. | High | TBD | Initial setup | Open |
| TD-002 | Validation | Define repository-specific validators and evidence requirements. | Closed-loop review stays weak without explicit checks. | High | TBD | Initial setup | Open |
| TD-003 | Architecture | Replace generic architecture notes with concrete system boundaries. | Implementation can drift without explicit invariants. | Medium | TBD | Initial setup | Open |
`;
}

function renderHarnessConfig({ projectName }: ScaffoldTemplateInput): string {
  return stringifyJson({
    harnessVersion: HARNESS_VERSION,
    scaffoldVersion: SCAFFOLD_VERSION,
    project: {
      name: projectName,
    },
  });
}

export function buildScaffoldFiles(
  input: ScaffoldTemplateInput,
): readonly FileEntry[] {
  const files: FileEntry[] = [
    {
      path: "README.md",
      contents: renderRootReadme(input),
    },
    {
      path: "AGENTS.md",
      contents: renderAgentsGuide(input),
    },
    {
      path: "ARCHITECTURE.md",
      contents: renderArchitecture(input),
    },
    {
      path: "PLANS.md",
      contents: renderPlansStandard(),
    },
    {
      path: "harness.config.json",
      contents: renderHarnessConfig(input),
    },
    {
      path: "features/README.md",
      contents: renderFeaturesReadme(),
    },
    {
      path: "features/product-specs/index.md",
      contents: renderProductSpecsIndex(),
    },
    {
      path: "features/design-docs/index.md",
      contents: renderDesignDocsIndex(),
    },
    {
      path: "features/exec-plans/README.md",
      contents: renderExecPlansReadme(),
    },
    {
      path: "features/exec-plans/active/README.md",
      contents: renderActiveExecPlansReadme(),
    },
    {
      path: "features/exec-plans/completed/README.md",
      contents: renderCompletedExecPlansReadme(),
    },
    {
      path: "features/generated/README.md",
      contents: renderGeneratedReadme(),
    },
    {
      path: "features/tech-debt-tracker.md",
      contents: renderTechDebtTracker(),
    },
  ];

  return files.sort((left, right) => left.path.localeCompare(right.path));
}
