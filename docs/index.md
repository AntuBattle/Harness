---
title: Harness Docs
---

# Harness

Harness is a TypeScript CLI for creating agent-ready repositories and then personalizing them through an interactive Codex-guided setup flow.

Install the published package with `npm install -g @antubattle/harness`, then run the CLI as `harness`.

## Documentation Map

- [Installation](installation.md)
- [Quickstart](quickstart.md)
- [Init Command](commands/init.md)
- [Configure Command](commands/configure.md)
- [Scaffold Layout](scaffold-layout.md)
- [Closed-Loop Workflow](closed-loop-workflow.md)
- [Troubleshooting](troubleshooting.md)
- [Publishing](publishing.md)

## What Harness Does

1. `harness init` creates the baseline repository structure in the current directory.
2. `harness configure` launches Codex interactively so the repository can be tailored to a real project.
3. The resulting repository is meant to support a closed loop of specs, design docs, ExecPlans, implementation, validation, review, and generated evidence.

## Core Workflow Expectation

Every non-trivial implementation is expected to end with an independent validation-subagent pass. That subagent must receive an explicit prompt that is different from the implementation prompt, must review correctness first, run tests second, and suggest repetition or style and organization improvements third.
