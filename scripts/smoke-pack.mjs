import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

async function run(command, args, options = {}) {
  return await execFileAsync(command, args, {
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });
}

async function main() {
  const repositoryRoot = process.cwd();
  const installRoot = await mkdtemp(path.join(os.tmpdir(), "harness-pack-install-"));
  let tarballPath;

  try {
    const { stdout: packStdout } = await run(npmCommand, ["pack", "--json"], {
      cwd: repositoryRoot,
    });
    const packOutput = JSON.parse(packStdout);

    if (!Array.isArray(packOutput) || packOutput.length === 0) {
      throw new Error("npm pack did not return tarball metadata.");
    }

    const filename = packOutput[0]?.filename;
    if (typeof filename !== "string" || filename.trim() === "") {
      throw new Error("npm pack did not return a tarball filename.");
    }

    tarballPath = path.join(repositoryRoot, filename);

    await run(
      npmCommand,
      ["install", "--no-package-lock", "--no-save", tarballPath],
      {
        cwd: installRoot,
      },
    );

    const binaryPath = path.join(
      installRoot,
      "node_modules",
      ".bin",
      process.platform === "win32" ? "harness.cmd" : "harness",
    );
    const { stdout } = await run(binaryPath, ["--help"], {
      cwd: installRoot,
    });

    if (!stdout.includes("Harness bootstraps agent-ready repositories.")) {
      throw new Error("Installed CLI did not return the expected help output.");
    }

    process.stdout.write("Tarball install smoke test passed.\n");
  } finally {
    await rm(installRoot, { recursive: true, force: true });

    if (tarballPath) {
      await rm(tarballPath, { force: true });
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Smoke pack failed: ${message}\n`);
  process.exitCode = 1;
});
