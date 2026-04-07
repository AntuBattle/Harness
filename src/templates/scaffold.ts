import type { FileEntry } from "../types.js";
import { renderValidationSubagentPolicy } from "../workflow/validation-subagent.js";

const HARNESS_VERSION = "0.1.0";
const SCAFFOLD_VERSION = "0.2";
const GENERATED_DAY_FOLDER_EXAMPLE = "features/generated/YYYY-MM-DD/";

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

1. Define or revise behavior using \`PRODUCT_SPECS.md\` and \`features/product-specs/\`.
2. Capture architecture, boundaries, and tradeoffs in \`features/design-docs/\`.
3. Use ExecPlans in \`features/exec-plans/\` for non-trivial work.
4. When implementation seems complete, run a separate validation subagent that follows \`REVIEW.md\`.
5. Archive generated evidence in day-based folders under \`features/generated/\`.
6. Track deliberate deferrals in \`features/tech-debt-tracker.md\`.

## Current State

- This repository is intentionally generic.
- Run \`harness configure\` to start an interactive Codex session that personalizes the existing repository guidance.
- Keep the closed-loop workflow intact as the project becomes concrete.

## Repository Map

- \`AGENTS.md\`: operating guide for implementation agents.
- \`CHANGELOG.md\`: notable release history and release-note structure.
- \`REVIEW.md\`: review guide for validation and reviewer agents.
- \`ARCHITECTURE.md\`: system boundaries and invariants.
- \`PLANS.md\`: ExecPlan standard.
- \`PRODUCT_SPECS.md\`: product-spec authoring standard.
- \`features/\`: product specs, design docs, plans, generated artifacts, and tech debt tracking.
`;
}

function renderAgentsGuide({ projectName }: ScaffoldTemplateInput): string {
  return `# ${projectName} Agent Guide

This repository is structured for spec-driven, closed-loop development.

## Required Workflow

For non-trivial work:

1. Read \`PRODUCT_SPECS.md\` and the relevant files in \`features/product-specs/\`.
2. Update \`features/design-docs/\` when architecture, boundaries, or tradeoffs change.
3. Create or update an ExecPlan in \`features/exec-plans/active/\`.
4. Implement incrementally, validate inputs at the edge, and keep internal types consistent whenever possible.
5. When implementation seems complete, launch a separate validation subagent and direct it to \`REVIEW.md\`.
6. Resolve findings and rerun that validation loop until the reviewer reports no material issues.
7. Store meaningful outputs under a day-based folder such as \`${GENERATED_DAY_FOLDER_EXAMPLE}\`.
8. Move accepted plans to \`features/exec-plans/completed/\` only after the validation loop is closed.

## Validation Subagent Requirement

${renderValidationSubagentPolicy()}

## Commit Discipline

- Use Conventional Commits.
- Each commit should do one clearly scoped thing.
- The commit message should describe that single purpose plainly.

## Release And Changelog Discipline

- Keep notable release history in the root \`CHANGELOG.md\`.
- Prefer a Keep a Changelog style structure with an \`Unreleased\` section and semantic-versioned release entries when the project uses releases.
- When the project uses versions, released feature work should usually bump the minor version, released bug fixes should usually bump the patch version, and breaking changes should bump the major version.
- Always ask the user for approval before editing \`CHANGELOG.md\` or changing version numbers.
- If the user declines, proceed with the requested work without touching \`CHANGELOG.md\` or version references, and do not present changelog or version edits as part of the delivered modification.

## Repository Visibility Tools

- Use \`git worktree\` for risky or parallel work when it improves safety.
- Use repository-hosting CLIs such as \`gh\` when issue or pull-request context matters.
- Use browser or framework dev tools for frontend debugging and verification when applicable.
- Inspect logs, traces, test output, and generated evidence before concluding on failures.
- Persist saved logs, traces, screenshots, and similar evidence inside the relevant day-based folder under \`features/generated/\`, not directly in the root of that directory.
- Keep the repository more self-sufficient after every change, not less.

## Guardrails

- Do not assume hidden context.
- Validate external inputs and config at the edge so inner layers can operate on consistent data types whenever possible.
- Keep functions, types, and modules focused on one purpose.
- Keep concerns separated: persistence in repository-style modules, logging configured centrally, and no ad hoc logger passing.
- Prefer small, verifiable changes over wide speculative edits.
- Preserve or improve traceability in specs, design docs, plans, and generated evidence.
`;
}

function renderReviewGuide(): string {
  return `# Review Guide

Use this file when you act as the validation subagent or as a reviewer.

## Required Review Workflow

1. Read \`AGENTS.md\`, this file, the active ExecPlan, the relevant product specs, and the relevant design docs. If no ExecPlan exists, require a contextual summary before reviewing.
2. Review the latest implementation in this order:
   - correctness, regressions, and repository-guideline compliance;
   - test execution and validation results;
   - code repetition plus opportunities to simplify style or organization.
3. If you find a material issue, require implementation changes and a fresh validation pass.
4. Treat the work as incomplete until no material issues remain.
5. Do not allow an ExecPlan to move to \`completed/\` until the validation loop is closed.

## What To Check Especially

- The implementation matches the product specs, the active ExecPlan, and the relevant design constraints.
- Each module, type, and function has one clear purpose.
- Concerns are correctly separated instead of mixed together.
- Database or persistence interaction lives only in repository or equivalent data-access modules.
- Logging is configured according to the project's best practices, and logger instances are not passed around ad hoc.
- Validation happens at the edge of the application whenever possible so the core logic can work with consistent data types.
- SOLID, DRY, and ETC principles are respected when they improve clarity, reuse, and maintainability.
- Functions do not do multiple unrelated things.
- Repeated null checks, guard clauses, or similar defensive code are wrapped in reusable helpers when that improves consistency and readability.
- Naming, error handling, and tests make the change easier to understand and evolve.

## Artifact And Traceability Checks

- Meaningful evidence is archived under a day-based folder such as \`${GENERATED_DAY_FOLDER_EXAMPLE}\`.
- Persisted logs, traces, screenshots, and similar artifacts are not dropped directly into the root of \`features/generated/\`.
- Review findings and acceptance state are reflected in the active ExecPlan.

## Release And Change-Management Checks

- If \`CHANGELOG.md\` or version numbers changed, verify that the user explicitly requested or approved those edits.
- If the user declined changelog or version updates, do not treat their absence as a defect for the requested implementation.
`;
}

function renderArchitecture({ projectName }: ScaffoldTemplateInput): string {
  return `# ${projectName} Architecture

This document captures the intended architecture for ${projectName}.

## Mission

Describe the concrete project purpose once \`harness configure\` has gathered enough context.

## Current Direction

This repository starts from a generic Harness scaffold. Update this document as the system boundaries, runtime choices, deployment model, observability strategy, and invariants become concrete.

## Baseline Invariants While The Repository Is Generic

- Validate external input at the edge so internal modules can work with consistent data types whenever possible.
- Keep persistence concerns isolated in repository or equivalent data-access modules.
- Configure logging centrally according to the chosen stack and avoid passing logger instances around ad hoc.
- Prefer modules and functions with one clear purpose over large multi-purpose units.

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

- referenced reading, including \`PRODUCT_SPECS.md\` and the relevant product spec files
- problem statement and scope
- referenced product spec(s)
- design implications and constraints
- ordered implementation steps
- validation plan
- validation-subagent prompt or prompt recipe that is distinct from the implementation prompt and directs the reviewer to \`REVIEW.md\`
- how validation findings and artifacts will be recorded and resolved before acceptance, including any saved evidence under a day-based folder in \`features/generated/\`
- if changelog or version edits are in scope, whether the user explicitly approved them
- rollback or mitigation notes for risky changes

## Validation Subagent Requirement

${renderValidationSubagentPolicy()}

## Lifecycle

1. Create the plan before implementation.
2. Update the plan during execution.
3. Run the validation subagent, address findings, and rerun that loop until no material issues remain.
4. Complete the retrospective with actual outcomes.
5. Move the plan to \`completed/\` only after the validation agent confirms the work is acceptable.
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

1. Start from \`PRODUCT_SPECS.md\` and the relevant product specs.
2. Update design docs for architecture decisions.
3. Create and maintain ExecPlans for non-trivial implementation.
4. Store generated evidence in day-based folders inside \`generated/\`.
`;
}

function renderProductSpecsIndex(): string {
  return `# Product Specs Index

Track versioned product specifications for this repository here.

## Guidance

- Read \`PRODUCT_SPECS.md\` before creating or revising a product spec.
- Add one folder per release or milestone when the project matures.
- Keep specs self-sufficient, explicit, and final.
- Update this index whenever a new spec is added or an old one is superseded.
`;
}

function renderProductSpecsStandard(): string {
  return `# Product Specifications

This document is the canonical standard for writing and maintaining product specs in this repository.

Product specs live in \`features/product-specs/\`. Read this file before creating, revising, or reviewing one.

## Role In The Workflow

1. Use product specs to define behavior before non-trivial implementation starts.
2. Update design docs when the spec changes architecture, boundaries, or tradeoffs.
3. Create an ExecPlan only after the spec is concrete enough to implement.
4. Use \`REVIEW.md\` and the validation subagent to verify that the implementation matches the spec.

## Writing Standard

- Keep every spec self-sufficient and explicit.
- Describe behavior, scope, constraints, and acceptance rather than turning the spec into a file-by-file implementation checklist.
- Restate relevant cross-cutting concerns such as validation at the edge, logging or observability, security, and review expectations when they matter.
- Do not leave open questions in a final spec.
- Update the affected spec in the same change whenever behavior changes.

## Required Sections

- objective
- functional context
- in scope
- out of scope
- functional requirements
- business rules or constraints
- non-functional requirements
- cross-cutting concerns
- acceptance criteria
- references

## Readiness Gate

A product spec is ready for implementation only when:

- a new contributor can understand the required behavior without reverse-engineering the code;
- acceptance can be validated in this repository as it exists today;
- important terms, constraints, and validation-at-the-edge expectations are defined;
- no unresolved questions remain.

## Repository Conventions

- Keep \`features/product-specs/index.md\` current when specs are added, updated, or superseded.
- Keep the boundary clean: product specs describe behavior, design docs explain tradeoffs, and ExecPlans describe implementation work.
`;
}

function renderChangelog(): string {
  return `# Changelog

All notable changes to this repository should be documented in this file.

## Guidance

- Prefer a Keep a Changelog style structure.
- Keep an \`Unreleased\` section for approved but not yet released notable changes.
- When the project uses versions, follow semantic versioning for release entries.
- Released feature work should usually produce a minor version bump, released bug fixes should usually produce a patch version bump, and breaking changes should produce a major version bump.
- Always ask the user for approval before editing this file or changing version numbers.
- If the user declines, continue the requested work without touching this file or version references, and do not present changelog or version edits as part of the delivered change.

## [Unreleased]
`;
}

function renderDesignDocsIndex(): string {
  return `# Design Docs Index

Track design rationale documents for this repository here.

## Guidance

- Capture architecture decisions and tradeoffs that materially affect implementation.
- Record boundaries for validation, persistence, logging, and other cross-cutting concerns when they matter.
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
Follow \`PLANS.md\` and make the validation prompt point reviewers to \`REVIEW.md\`.
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

Store each execution's artifacts inside a day-based subdirectory such as \`${GENERATED_DAY_FOLDER_EXAMPLE}\`.

Examples:

- validation reports
- validation-subagent prompts and findings
- screenshots or browser captures
- runtime logs or traces saved for review
- deterministic snapshots

Rules:

- Keep this \`README.md\` at the directory root and place other generated files in the relevant day-based folder.
- Prefer regeneration over manual edits.
- Keep artifact naming predictable and collision-safe.
- Preserve history for review traceability.
- If you persist logs or traces, do not write them directly into \`features/generated/\`; write them into the relevant day-based subdirectory.
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
      path: "CHANGELOG.md",
      contents: renderChangelog(),
    },
    {
      path: "REVIEW.md",
      contents: renderReviewGuide(),
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
      path: "PRODUCT_SPECS.md",
      contents: renderProductSpecsStandard(),
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
