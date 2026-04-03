# ExecPlan: npm Publish And Docs Alignment

Date: 2026-04-03
Status: In Progress

## Problem Statement

Harness currently documents installation through `npm install -g harness-cli`, but both `harness` and `harness-cli` are already taken on npm. The repository needs a publishable package identity, standard npm metadata, accurate install and publishing docs, and an actual public npm release so users can install the CLI as documented.

## Scope

- Rename the published package to a scoped npm name owned by the user.
- Add standard npm package metadata for repository discovery and support.
- Update README and `docs/` so installation, usage, and publishing guidance match the real package name and publish flow.
- Publish the package publicly on npm and verify that the published artifact is installable.
- Answer the user’s question about achieving a more professional GitHub Pages docs experience, including how FastAPI-style docs are typically built.

## Referenced Specs

- `features/product-specs/v0.2/cli/harness_init.md`
- `features/product-specs/v0.2/cli/harness_configure.md`
- `features/product-specs/v0.2/workflows/closed_loop_agent_workflow.md`
- `features/design-docs/scaffold-and-broker-architecture.md`

## Constraints

- Preserve the existing CLI command name `harness`.
- Keep the package public and installable through npm without conflicting with already-taken unscoped names.
- Keep docs honest about current provider support: only Codex is supported for interactive configuration.
- Follow the repository validation-subagent workflow before acceptance.

## Ordered Implementation Steps

1. Confirm npm package-name availability and choose the scoped publish target.
2. Update package metadata and any relevant design/docs references to match the new publish identity.
3. Rewrite README and docs installation/publishing guidance to match the scoped package and real local-development workflow.
4. Run build, tests, and packaging validation, then inspect the packed artifact.
5. Publish the package publicly on npm and verify the published metadata.
6. Launch a separate validation subagent with a prompt distinct from the implementation prompt, address findings, and rerun checks as needed.
7. Complete the retrospective and move this plan to `completed/`.

## Validation Plan

- Run `npm run build`.
- Run `npm test`.
- Run `npm run smoke:pack`.
- Run `npm pack --dry-run`.
- Run `npm view @antubattle/harness name version description --json` after publish.
- Launch a validation subagent with a distinct prompt that points to this ExecPlan and asks it to review correctness and regressions first, test execution and validation results second, and repetition/style/organization third.

## Validation Subagent Prompt

Review the latest npm publishing and documentation update for Harness. Use `features/exec-plans/active/2026-04-03-npm-publish-and-docs-alignment.md` as the primary context. Follow `AGENTS.md`. Review in this order: (1) correctness, regressions, and repository-guideline compliance; (2) test and validation execution/results; (3) code repetition and opportunities to improve style or organization. Run the relevant checks yourself where possible, inspect the package metadata and docs changes, and report only material issues first with file references.

## Rollback / Mitigation

- Keep the publish-name change limited to metadata and docs so the CLI runtime remains stable.
- Validate the packed artifact before publishing so broken package contents are caught locally.
- If the publish step fails because of npm account or scope configuration, leave the repository in a publish-ready state with the correct docs and metadata.

## Progress

- [x] Reviewed specs, existing docs, and npm name availability.
- [x] Updated package metadata and any necessary design/docs references.
- [x] Updated README and docs for the real publish/install flow.
- [x] Ran build, tests, and packaging validation.
- [ ] Published `@antubattle/harness` publicly and verified the result.
- [ ] Ran an independent validation pass and addressed findings.
- [ ] Completed the retrospective and moved the plan to `completed/`.

## Surprises & Discoveries

- `harness` and `harness-cli` are both already taken on npm, so a scoped package name is required for a clean publish path.
- `npm install --package-lock-only` still triggered the package `prepare` script, so refreshing the lockfile also rebuilt `dist/`.

## Decision Log

- 2026-04-03: Publish under `@antubattle/harness` while keeping the executable name `harness`.
- 2026-04-03: Use the GitHub Pages site as the npm `homepage` while keeping `repository` and `bugs` pointed at the GitHub repo.

## Outcomes & Retrospective

- In progress. The repository is now publish-ready for `@antubattle/harness`, the docs reference the scoped install path, and local build, test, smoke-pack, and dry-run packaging checks have passed.
