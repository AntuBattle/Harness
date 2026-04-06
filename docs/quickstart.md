---
title: Quickstart
---

# Quickstart

## 1. Create Or Enter A Project Directory

```bash
mkdir my-project
cd my-project
```

## 2. Initialize The Harness Scaffold

```bash
harness init --project-name "My Project"
```

This writes the baseline repository files in the current directory.

## 3. Launch Interactive Configuration

```bash
harness configure
```

Codex should:

- confirm the project name and gather a description;
- ask about language, framework, validation, and observability choices;
- personalize the existing markdown guidance into a self-sufficient local development and testbed environment;
- preserve the Harness workflow of specs, design docs, ExecPlans, generated evidence, and tech debt tracking.

## 4. Follow The Closed Loop

For non-trivial work:

1. Start from `PRODUCT_SPECS.md` and the relevant product spec.
2. Update design docs when architecture changes.
3. Create or update an ExecPlan.
4. Implement incrementally.
5. Run a separate validation subagent with a distinct prompt that points to `REVIEW.md`.
6. Resolve findings and rerun validation until no material issues remain.
