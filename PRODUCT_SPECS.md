# Product Specifications

This document is the canonical standard for writing and maintaining product specifications in this repository.

Product specs live in `features/product-specs/`. This file explains how to write them well. `PLANS.md` is the separate canonical standard for ExecPlans and must not be used as a substitute for product-spec guidance.

## Purpose

A product spec defines what behavior the system must deliver, why that behavior matters to a user or operator, what is in scope, what is out of scope, and how a human can tell the behavior works. A good product spec removes ambiguity before implementation starts.

In this repository, the product spec is the source of truth for feature intent. Design docs explain why a design was chosen and how major tradeoffs were resolved. ExecPlans explain how to deliver the change now, including the exact edits, commands, and validation loop.

Every product spec in this repository must be fully self-sufficient, even if that means repeating information that also appears elsewhere. References may support the reader, but they must never be required in order to understand the feature's purpose, context, required behavior, validation story, or important constraints.

## When to Read This File

Read `PRODUCT_SPECS.md` before:

- brainstorming a new feature or behavior change with the user;
- creating, rewriting, or reviewing any file in `features/product-specs/`;
- deciding whether a feature idea is ready for an ExecPlan;
- starting implementation for a new behavior change.

## Self-Sufficiency Is Non-Negotiable

Do not assume the reader already knows the repository, the architecture, the current harness limits, or the established cross-cutting standards. If any of that context matters to the feature, explain it inside the product spec itself.

This means:

- do not write "see `ARCHITECTURE.md`" and stop there;
- do not rely on a design doc to explain critical behavior or constraints;
- do not expect the reader to infer missing requirements from existing code;
- do not omit cross-cutting standards just because they are standardized elsewhere in the repository;
- do repeat important context when repeating it makes the spec self-sufficient.

References are supplementary. Explanation inside the spec is mandatory.

## Finality Is Non-Negotiable

A checked-in product spec must be explicit and final. It is not a place to leave unresolved questions for later.

All open questions must be surfaced and resolved during the brainstorming and refinement phase with the user. If an important question is still open, the document is not yet a final product spec and implementation must not start.

This is crucial for efficient execution in this repository. The product spec is meant to drive deterministic implementation, review, and validation. A spec that still contains unresolved questions weakens the implementation loop and forces contributors to invent missing behavior while coding.

## What a Product Spec Must Contain

Every product spec must be self-contained and written so a new contributor can understand the desired behavior without reverse-engineering it from code.

Every product spec must:

- state a clear objective that explains the purpose of the feature;
- include a functional context paragraph that explains the context in which the feature is being developed and highlights important existing design decisions, project constraints, or current system behavior that the reader must know;
- define observable behavior, not just internal implementation changes;
- separate in-scope behavior from out-of-scope work;
- define functional requirements precisely enough that tests and reviews can check them;
- define business rules, invariants, and constraints that shape the behavior;
- define non-functional expectations when they matter, such as latency, determinism, memory, or operability;
- briefly restate relevant cross-cutting concerns such as logging, security, and validation according to project-wide guidelines so the feature document remains self-sufficient;
- restate the mandatory validation-subagent workflow when the feature affects implementation or review behavior;
- define acceptance in terms of observable results;
- add any extra sections needed to make the feature understandable or implementable in context;
- resolve all open questions and unresolved assumptions before the spec is considered final;

## What a Product Spec Must Not Become

A product spec is not an ExecPlan. It must not become a file-by-file implementation checklist, a patch description, or a milestone log.

Avoid these failure modes:

- describing only code structure instead of user-visible behavior;
- embedding file-edit instructions that belong in an ExecPlan;
- forcing a specific implementation when the real requirement is behavioral;
- leaving acceptance vague enough that multiple contradictory implementations would all appear valid;
- omitting current project limitations that materially affect what can be validated today.

If a decision is mainly about architecture, module boundaries, tradeoffs, or implementation strategy, it belongs in `features/design-docs/` or in an ExecPlan, not in the product spec. A product spec may mention a hard constraint from the current system, but it should do so as a constraint on behavior, not as an implementation recipe.

## Required Structure

Use a stable, predictable structure. The following sections should exist in every non-trivial product spec:

1. `Title`, `date`, and release or version context.
2. `Objective`: a clear statement of the feature's purpose and the user or operator outcome it enables.
3. `Functional Context`: a paragraph or short section describing the relevant current application context, existing design decisions, architecture boundaries, and project limitations that help the reader understand the feature correctly.
4. `In Scope`: what this spec covers now.
5. `Out of Scope`: what is deliberately excluded.
6. `Functional Requirements`: the required behaviors.
7. `Business Rules / Constraints`: rules, invariants, and hard boundaries that must remain true.
8. `Non-Functional Requirements`: performance, determinism, memory, reliability, observability, or operational expectations when relevant.
9. `Cross-Cutting Concerns`: brief feature-specific notes about logging, security, validation, and any other standardized repository concerns that still need to be restated here for self-sufficiency.
10. `Acceptance Criteria`: how a human will verify the behavior in this repository as it exists today.
11. `References`: related specs, design docs, modules, or commands that may help, but do not replace the explanations in this file.

If the feature needs additional sections to be self-sufficient, add them. Do not force the document to stay minimal at the cost of clarity. Do not add an `Open Questions` section to the final product spec. If open questions remain, keep refining the spec instead of checking in an incomplete final artifact.

## Writing Standard

Write in plain language. Define domain terms when they first appear. Prefer precise statements over broad aspirations. A good requirement is something a reviewer can argue is either satisfied or not satisfied.

Anchor the spec in observable outcomes. Explain what inputs arrive, what state changes, what outputs or side effects must follow, and what constraints must remain true.

Be honest about the current repository status. If the current harness does not exercise real UART devices or MQTT publishing, say so when acceptance depends on those gaps. If a behavior can only be validated through unit tests or in-memory integration today, write that explicitly. The spec should reflect the project that exists now, not an imagined future repository.

When repository-wide standards matter, restate them briefly in the spec instead of assuming the reader will import them from another file. Logging expectations, validation expectations, and security-relevant behavior should be mentioned in the product spec whenever they matter to the feature, even if the same standards are documented elsewhere.

Keep the boundary between behavior and implementation clean:

- Good: "When a node becomes occupied, the master includes it in the correct cluster before the next published cluster snapshot."
- Not good: "Call the DSU union function from `src/cluster_manager.c` after updating the node."

## Product Spec Readiness Gate

Do not start autonomous implementation from a half-formed idea. A product spec is ready for ExecPlan and implementation work only when all of the following are true:

- the objective is clear and explains the purpose of the feature;
- the functional context gives enough current-project background for a new contributor to understand the feature correctly;
- the user-visible or operator-visible outcome is clear;
- the scope boundaries are explicit;
- acceptance can be checked with the repository's current commands, tests, or known gaps;
- important terms and business rules are defined;
- cross-cutting concerns have been restated where they matter;
- no unresolved questions remain in the final checked-in spec;
- the spec does not depend on readers inferring missing behavior from existing code.

If this bar is not met, continue refining the product spec before writing an ExecPlan or changing code.

## Agent Workflow for Brainstorming

When the user is brainstorming a new spec or feature, the agent must:

1. Read `PRODUCT_SPECS.md` first.
2. Read the relevant existing product specs in `features/product-specs/`, plus `ARCHITECTURE.md` and any relevant design docs or tests.
3. Help the user create or refine the product spec before starting an ExecPlan or implementation.
4. Actively challenge ambiguity, missing acceptance criteria, conflicts with current architecture, and assumptions that do not fit the current project status.
5. Drive the brainstorming toward an implementation-ready product spec with no unresolved questions left in the final document, not toward premature code edits.

The agent should convert loose ideas into concrete behavioral requirements, explicit scope, and observable acceptance. If the user is still deciding what they want or any important question remains unresolved, the agent should stay in spec-creation mode.

## Repository Conventions

Whenever a new product spec is added, keep `features/product-specs/index.md` current. Whenever behavior changes, update the affected product spec in the same change so requirement traceability does not drift.

## Skeleton of a Good Product Spec

Use this skeleton as a starting point:

    # <Release or version> - <Feature name>

    Date: <YYYY-MM-DD>
    Status: Draft | Approved | Implemented

    ## Objective

    Explain the purpose of the feature, what problem exists today, who is affected, and what new outcome this feature enables.

    ## Functional Context

    Explain the relevant current application context. Call out important existing design decisions, architecture boundaries, project limitations, and validation gaps that matter for this feature. Do not assume the reader has already read other repository documents.

    ## In Scope

    State the behaviors included in this spec.

    ## Out of Scope

    State the behaviors deliberately excluded from this spec.

    ## Functional Requirements

    State the required behaviors in precise, testable language.

    ## Business Rules / Constraints

    State the rules and invariants that must remain true.

    ## Non-Functional Requirements

    State latency, determinism, memory, reliability, observability, or operational expectations when relevant.

    ## Cross-Cutting Concerns

    Briefly explain how standardized concerns apply to this feature. Mention logging, security, and validation at minimum when they matter. Repeat important repository-wide expectations here so the spec is self-sufficient.

    ## Acceptance Criteria

    Describe how the behavior will be validated in the current repository, including any known limits of the available harnesses. State observable pass conditions.

    ## Additional Sections

    Add any extra sections needed to make the spec self-sufficient for this feature. Do not omit important context just to keep the template short.

    ## References

    Link related specs, design docs, modules, or commands. These links are supplementary only; the required explanation must already exist in this file.

If a contributor can read the spec and still reasonably ask "what exactly should the system do?", "how would I prove it works here?", or "what decision is still pending?", the spec is not ready yet.
