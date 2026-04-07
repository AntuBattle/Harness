# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and Harness aims to follow semantic versioning for released versions.

Agents must ask the user before editing this file or changing version numbers. If the user declines, implementation should continue without touching changelog or version references.

## [Unreleased]

## [0.2.0] - 2026-04-07

### Added

- Generated `REVIEW.md` and `PRODUCT_SPECS.md` guidance for repositories created by `harness init`.
- Generated root `CHANGELOG.md` support and release-discipline guidance for repositories created by `harness init`.
- Stronger generated review guidance around separation of concerns, validation at the application edge, and day-based generated-artifact folders.

### Changed

- `harness configure` now requires a more complete scaffold, including `REVIEW.md`, `PRODUCT_SPECS.md`, and `CHANGELOG.md`.
- The configure seed prompt now stays focused on personalizing repository guidance and metadata instead of creating ExecPlans, feature specs, or source-code files.
- Generated workflow guidance now teaches changelog and version best practices while keeping changelog and version edits behind explicit user approval.

## [0.1.0] - 2026-04-03

### Added

- Initial Harness CLI with deterministic `init` scaffolding and interactive Codex-based `configure`.
- Documentation-first repository structure for product specs, design docs, ExecPlans, review guidance, and generated evidence.
- Closed-loop validation guidance with a separate validation-subagent requirement.
