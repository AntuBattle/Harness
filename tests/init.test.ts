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
  const config = JSON.parse(
    await readFile(join(tempDir, "harness.config.json"), "utf8"),
  ) as {
    project: {
      name: string;
    };
  };

  assert.match(readme, new RegExp(`# ${basename(tempDir)}`));
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
  const config = JSON.parse(
    await readFile(join(tempDir, "harness.config.json"), "utf8"),
  ) as {
    project: {
      name: string;
    };
  };

  assert.match(readme, /# Sample Project/);
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
