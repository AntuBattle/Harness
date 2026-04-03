# v0.1 Spec: `harness init`

## Objective

Provide a single CLI command that scaffolds an agent-ready repository with deterministic structure and core process documentation.

## Command contract (planned)

```bash
harness init
```

## Expected outputs

The command should create at minimum:

- `README.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `PLANS.md`
- `features/` workspace with:
  - `product-specs/`
  - `design-docs/`
  - `exec-plans/active/`
  - `exec-plans/completed/`
  - `generated/`
  - `tech-debt-tracker.md`

## Behavioral expectations

- Deterministic scaffold for the same command/options.
- Safe by default for existing directories (explicit overwrite policy required).
- Clear user feedback listing created files.
- Generated docs must explain closed-loop execution and review expectations.

## Acceptance criteria

- Running `harness init` in an empty directory produces the expected scaffold.
- Generated markdown files are coherent and internally consistent.
- Generated structure supports ExecPlan-driven implementation from day one.
