import { runConfigure, CONFIGURE_USAGE } from "./commands/configure.js";
import { runInit, INIT_USAGE } from "./commands/init.js";
import { HarnessError, toErrorMessage } from "./lib/errors.js";
import type { OutputWriter, SpawnProcess } from "./types.js";

export const GLOBAL_USAGE = `Harness bootstraps agent-ready repositories.

Usage:
  harness init [options]
  harness configure [options]
  harness help [command]

Commands:
  init       Create a generic repository scaffold in the current directory.
  configure  Launch an interactive Codex session to personalize the repository.

Run \`harness help init\` or \`harness help configure\` for command-specific flags.
`;

export interface MainOptions {
  argv?: readonly string[];
  cwd?: string;
  stdout?: OutputWriter;
  stderr?: OutputWriter;
  spawnProcess?: SpawnProcess;
}

function resolveHelp(argv: readonly string[]): string {
  const command = argv[1];

  if (!command) {
    return GLOBAL_USAGE;
  }

  if (command === "init") {
    return INIT_USAGE;
  }

  if (command === "configure") {
    return CONFIGURE_USAGE;
  }

  throw new HarnessError(`Unknown help topic: ${command}`);
}

export async function main(options: MainOptions = {}): Promise<number> {
  const argv = options.argv ?? process.argv.slice(2);
  const cwd = options.cwd ?? process.cwd();
  const stdout = options.stdout ?? process.stdout;
  const stderr = options.stderr ?? process.stderr;
  const [command, ...rest] = argv;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    const helpText = command === "help" ? resolveHelp(argv) : GLOBAL_USAGE;
    stdout.write(`${helpText}\n`);
    return 0;
  }

  try {
    if (command === "init") {
      return await runInit({
        args: rest,
        cwd,
        stdout,
      });
    }

    if (command === "configure") {
      const configureContext = {
        args: rest,
        cwd,
        stdout,
      } as {
        args: readonly string[];
        cwd: string;
        stdout: OutputWriter;
        spawnProcess?: SpawnProcess;
      };

      if (options.spawnProcess !== undefined) {
        configureContext.spawnProcess = options.spawnProcess;
      }

      return await runConfigure(configureContext);
    }

    throw new HarnessError(
      `Unknown command: ${command}\n\n${GLOBAL_USAGE.trimEnd()}`,
    );
  } catch (error) {
    if (error instanceof HarnessError) {
      stderr.write(`Error: ${error.message}\n`);
      return 1;
    }

    stderr.write(`Unexpected error: ${toErrorMessage(error)}\n`);
    return 1;
  }
}
