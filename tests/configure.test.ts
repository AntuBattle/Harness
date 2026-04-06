import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { main } from "../src/cli.js";
import {
  createCaptureStream,
  createFailingSpawnStub,
  createSuccessfulSpawnStub,
} from "./test-helpers.js";

async function scaffoldRepo(baseDir: string): Promise<string> {
  const repoDir = await mkdtemp(join(baseDir, "repo-"));
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();

  const exitCode = await main({
    argv: ["init", "--project-name", "Demo"],
    cwd: repoDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 0);
  assert.equal(stderr.toString(), "");

  return repoDir;
}

test("configure launches codex interactively with a seed prompt", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-launch-"));
  const repoDir = await scaffoldRepo(tempDir);
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const { calls, spawn } = createSuccessfulSpawnStub();
  const exitCode = await main({
    argv: ["configure"],
    cwd: repoDir,
    stdout,
    stderr,
    spawnProcess: spawn,
  });

  assert.equal(exitCode, 0);
  assert.equal(stderr.toString(), "");
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.command, "codex");
  assert.equal(calls[0]?.options.cwd, repoDir);
  assert.equal(calls[0]?.options.stdio, "inherit");
  assert.match(calls[0]?.args[0] ?? "", /current scaffold value is "Demo"/);
  assert.match(calls[0]?.args[0] ?? "", /REVIEW\.md/);
  assert.match(calls[0]?.args[0] ?? "", /PRODUCT_SPECS\.md/);
  assert.match(calls[0]?.args[0] ?? "", /Chrome DevTools/);
  assert.match(calls[0]?.args[0] ?? "", /validation-subagent policy/i);
  assert.match(calls[0]?.args[0] ?? "", /active ExecPlan/i);
  assert.match(
    calls[0]?.args[0] ?? "",
    /Do not create ExecPlans, feature product specs, or source files where code lives during configure\./i,
  );
  assert.match(calls[0]?.args[0] ?? "", /application edge/i);
  assert.match(calls[0]?.args[0] ?? "", /day-based folders under `features\/generated\/`/i);
  assert.match(
    calls[0]?.args[0] ?? "",
    /review correctness, regressions, and repository-guideline compliance first/i,
  );
  assert.match(
    stdout.toString(),
    /Launching interactive Codex configuration\.\.\./,
  );
});

test("configure accepts --provider codex explicitly", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-provider-"));
  const repoDir = await scaffoldRepo(tempDir);
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const { calls, spawn } = createSuccessfulSpawnStub();
  const exitCode = await main({
    argv: ["configure", "--provider", "codex"],
    cwd: repoDir,
    stdout,
    stderr,
    spawnProcess: spawn,
  });

  assert.equal(exitCode, 0);
  assert.equal(stderr.toString(), "");
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.command, "codex");
});

test("configure requires REVIEW.md and PRODUCT_SPECS.md in the scaffold", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-required-"));
  const repoDir = await scaffoldRepo(tempDir);
  await rm(join(repoDir, "REVIEW.md"));
  await rm(join(repoDir, "PRODUCT_SPECS.md"));

  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["configure"],
    cwd: repoDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 1);
  assert.equal(stdout.toString(), "");
  assert.match(stderr.toString(), /REVIEW\.md/);
  assert.match(stderr.toString(), /PRODUCT_SPECS\.md/);
});

test("configure rejects unsupported providers", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-unsupported-"));
  const repoDir = await scaffoldRepo(tempDir);
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["configure", "--provider", "claude"],
    cwd: repoDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 1);
  assert.equal(stdout.toString(), "");
  assert.match(
    stderr.toString(),
    /Unsupported provider "claude"\. Only "codex" is supported right now\./,
  );
});

test("configure rejects unsupported legacy flags", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-legacy-"));
  const repoDir = await scaffoldRepo(tempDir);
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["configure", "--language", "python"],
    cwd: repoDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 1);
  assert.equal(stdout.toString(), "");
  assert.match(
    stderr.toString(),
    /Unknown option for `harness configure`: --language/,
  );
});

test("configure surfaces codex startup failures", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-configure-start-"));
  const repoDir = await scaffoldRepo(tempDir);
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const { spawn } = createFailingSpawnStub(new Error("ENOENT"));
  const exitCode = await main({
    argv: ["configure"],
    cwd: repoDir,
    stdout,
    stderr,
    spawnProcess: spawn,
  });

  assert.equal(exitCode, 1);
  assert.match(stdout.toString(), /Launching interactive Codex configuration/);
  assert.match(stderr.toString(), /Failed to start codex: ENOENT/);
});
