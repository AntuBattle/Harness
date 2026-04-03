# Tech Debt Tracker

Track deliberate debt that is deferred, not ignored.

| ID | Area | Description | Impact | Priority | Owner | Target Milestone | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TD-001 | Configure UX | Revisit whether a future provider abstraction is justified after the Codex-only interactive flow has real usage data. | Harness may stay too opinionated or grow abstraction prematurely without evidence. | Medium | TBD | v0.3 | Open |
| TD-002 | Validation | Add a first-party validator command for generated repository coherence beyond the current test suite. | Users can generate inconsistent scaffolds without a dedicated post-generation check. | High | TBD | v0.2 | Open |
| TD-003 | Templates | Add scaffold template versioning and migration notes for existing repositories. | Hard upgrades for users after template evolution. | Medium | TBD | v0.2 | Open |
| TD-004 | Filesystem | Consider staged writes for `init` to reduce partial-write risk on unexpected filesystem failures. | A mid-write failure could leave an incomplete scaffold. | Medium | TBD | v0.3 | Open |
