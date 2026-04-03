---
title: Publishing
---

# Publishing

Harness is published to npm as `@antubattle/harness` and exposes the `harness` executable through its `bin` mapping.

## Prerequisites

1. Log in to npm with an account that owns the `@antubattle` scope.
2. Ensure the working tree is clean.
3. Bump the version in `package.json` before each new release.

## Authenticate

```bash
npm login
npm whoami
```

`npm whoami` should print `antubattle` before you publish.

If the npm account enforces publish-time 2FA, `npm publish` will require a current OTP or a granular access token that is allowed to bypass 2FA for publishing.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Verify The Packed Artifact

```bash
npm run smoke:pack
npm pack --dry-run
```

The smoke test installs the tarball into a temporary directory and runs the packaged `harness` binary. The dry run shows exactly what would be published.

## Publish

```bash
npm publish
```

`package.json` sets `publishConfig.access` to `public`, so the scoped package is published publicly.

If npm prompts for a one-time password, rerun the publish with:

```bash
npm publish --otp <code>
```

## Verify The Published Package

```bash
npm view @antubattle/harness name version description --json
```

Users can then install the CLI with:

```bash
npm install -g @antubattle/harness
```

## Publish Checklist

1. Ensure the working tree is clean.
2. Confirm the npm account owns the `@antubattle` scope.
3. Bump the package version for the release.
4. Run the build and test commands.
5. Run the packaging smoke test.
6. Inspect `npm pack --dry-run`.
7. Run `npm publish`.
8. Verify the published metadata with `npm view @antubattle/harness`.

## GitHub-Hosted Docs

These pages live under `docs/` and are written to be compatible with a GitHub-hosted documentation flow based on that directory.
