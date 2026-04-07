import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import os from "node:os";
import { mkdtemp } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { main } from "../src/cli.js";
import { createCaptureStream } from "./test-helpers.js";

test("init writes the scaffold in the current directory and infers the project name", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-init-"));
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["init"],
    cwd: tempDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 0);
  assert.equal(stderr.toString(), "");

  const readme = await readFile(join(tempDir, "README.md"), "utf8");
  const agents = await readFile(join(tempDir, "AGENTS.md"), "utf8");
  const changelog = await readFile(join(tempDir, "CHANGELOG.md"), "utf8");
  const review = await readFile(join(tempDir, "REVIEW.md"), "utf8");
  const plans = await readFile(join(tempDir, "PLANS.md"), "utf8");
  const productSpecs = await readFile(join(tempDir, "PRODUCT_SPECS.md"), "utf8");
  const generatedReadme = await readFile(
    join(tempDir, "features/generated/README.md"),
    "utf8",
  );
  const config = JSON.parse(
    await readFile(join(tempDir, "harness.config.json"), "utf8"),
  ) as {
    project: {
      name: string;
    };
  };

  assert.match(readme, new RegExp(`# ${basename(tempDir)}`));
  assert.match(readme, /CHANGELOG\.md/);
  assert.match(readme, /REVIEW\.md/);
  assert.match(readme, /PRODUCT_SPECS\.md/);
  assert.match(agents, /validation subagent/i);
  assert.match(agents, /REVIEW\.md/);
  assert.match(agents, /Conventional Commits/);
  assert.match(agents, /Always ask the user for approval before editing `CHANGELOG\.md` or changing version numbers\./);
  assert.match(changelog, /Keep a Changelog style structure/i);
  assert.match(changelog, /## \[Unreleased\]/);
  assert.match(changelog, /Released feature work should usually produce a minor version bump/i);
  assert.match(changelog, /Always ask the user for approval before editing this file or changing version numbers\./);
  assert.match(review, /database or persistence interaction/i);
  assert.match(review, /logger instances are not passed around/i);
  assert.match(review, /SOLID, DRY, and ETC/i);
  assert.match(review, /validation happens at the edge/i);
  assert.match(review, /If `CHANGELOG\.md` or version numbers changed, verify that the user explicitly requested or approved those edits\./);
  assert.match(review, /features\/generated\/YYYY-MM-DD\//i);
  assert.match(plans, /PRODUCT_SPECS\.md/);
  assert.match(plans, /if changelog or version edits are in scope, whether the user explicitly approved them/i);
  assert.match(plans, /validation-subagent prompt or prompt recipe/i);
  assert.match(productSpecs, /canonical standard for writing and maintaining product specs/i);
  assert.match(productSpecs, /Use `REVIEW\.md` and the validation subagent/i);
  assert.match(generatedReadme, /day-based subdirectory/i);
  assert.equal(config.project.name, basename(tempDir));
  assert.match(stdout.toString(), /Harness init complete\./);
});

test("init honors --project-name", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-init-name-"));
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["init", "--project-name", "Sample Project"],
    cwd: tempDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 0);
  assert.equal(stderr.toString(), "");

  const readme = await readFile(join(tempDir, "README.md"), "utf8");
  const changelog = await readFile(join(tempDir, "CHANGELOG.md"), "utf8");
  const config = JSON.parse(
    await readFile(join(tempDir, "harness.config.json"), "utf8"),
  ) as {
    project: {
      name: string;
    };
  };

  assert.match(readme, /# Sample Project/);
  assert.match(changelog, /# Changelog/);
  assert.equal(config.project.name, "Sample Project");
});

test("init rejects positional arguments", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-init-positional-"));
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["init", "repo"],
    cwd: tempDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 1);
  assert.equal(stdout.toString(), "");
  assert.match(
    stderr.toString(),
    /`harness init` does not accept positional arguments\./,
  );
});

test("init rejects unsupported legacy flags", async () => {
  const tempDir = await mkdtemp(join(os.tmpdir(), "harness-init-legacy-"));
  const stdout = createCaptureStream();
  const stderr = createCaptureStream();
  const exitCode = await main({
    argv: ["init", "--description", "Legacy"],
    cwd: tempDir,
    stdout,
    stderr,
  });

  assert.equal(exitCode, 1);
  assert.equal(stdout.toString(), "");
  assert.match(
    stderr.toString(),
    /Unknown option for `harness init`: --description/,
  );
});
