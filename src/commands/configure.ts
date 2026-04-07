import { spawn } from "node:child_process";
import { buildCodexConfigurePrompt } from "../configure/prompt.js";
import { loadHarnessConfig } from "../lib/config.js";
import { HarnessError, toErrorMessage } from "../lib/errors.js";
import { ensureRequiredFiles } from "../lib/fs.js";
import type {
  InteractiveSpawnOptions,
  OutputWriter,
  SpawnProcess,
} from "../types.js";

export const CONFIGURE_USAGE = `Usage:
  harness configure [options]

Options:
  --provider <name>  Agent executable to launch. Only "codex" is supported.
  --help             Show this help text.
`;

const REQUIRED_CONFIGURE_FILES = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "CHANGELOG.md",
  "PLANS.md",
  "PRODUCT_SPECS.md",
  "REVIEW.md",
  "features/design-docs/index.md",
  "features/generated/README.md",
  "features/product-specs/index.md",
  "harness.config.json",
] as const;

const DEFAULT_PROVIDER = "codex";

export interface ConfigureCommandContext {
  args: readonly string[];
  cwd: string;
  stdout: OutputWriter;
  spawnProcess?: SpawnProcess;
}

interface ConfigureOptions {
  help: boolean;
  provider: typeof DEFAULT_PROVIDER;
}

function readRequiredValue(
  args: readonly string[],
  index: number,
  optionName: string,
): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new HarnessError(`Missing value for ${optionName}.`);
  }

  const normalizedValue = value.trim();
  if (normalizedValue === "") {
    throw new HarnessError(`Missing value for ${optionName}.`);
  }

  return normalizedValue;
}

function parseConfigureOptions(args: readonly string[]): ConfigureOptions {
  let help = false;
  let provider = DEFAULT_PROVIDER;
  let providerWasSet = false;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === undefined) {
      break;
    }

    if (argument === "--help" || argument === "-h") {
      help = true;
      continue;
    }

    if (argument === "--provider") {
      if (providerWasSet) {
        throw new HarnessError("`--provider` may only be provided once.");
      }

      provider = readRequiredValue(args, index, "--provider");
      providerWasSet = true;
      index += 1;
      continue;
    }

    if (argument.startsWith("--")) {
      throw new HarnessError(
        `Unknown option for \`harness configure\`: ${argument}`,
      );
    }

    throw new HarnessError(
      "`harness configure` does not accept positional arguments.",
    );
  }

  if (provider !== DEFAULT_PROVIDER) {
    throw new HarnessError(
      `Unsupported provider "${provider}". Only "${DEFAULT_PROVIDER}" is supported right now.`,
    );
  }

  return {
    help,
    provider: DEFAULT_PROVIDER,
  };
}

const defaultSpawnProcess: SpawnProcess = (
  command,
  args,
  options,
) => spawn(command, [...args], options);

function launchInteractiveProcess({
  command,
  args,
  options,
  spawnProcess,
}: {
  command: string;
  args: readonly string[];
  options: InteractiveSpawnOptions;
  spawnProcess: SpawnProcess;
}): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    let child;

    try {
      child = spawnProcess(command, args, options);
    } catch (error) {
      reject(error);
      return;
    }

    child.on("error", (error) => {
      reject(error);
    });
    child.on("close", (exitCode) => {
      resolve(exitCode ?? 1);
    });
  });
}

export async function runConfigure({
  args,
  cwd,
  stdout,
  spawnProcess,
}: ConfigureCommandContext): Promise<number> {
  const options = parseConfigureOptions(args);

  if (options.help) {
    stdout.write(`${CONFIGURE_USAGE}\n`);
    return 0;
  }

  const missingFiles = await ensureRequiredFiles(cwd, REQUIRED_CONFIGURE_FILES);
  if (missingFiles.length > 0) {
    throw new HarnessError(
      `This directory is not a complete Harness scaffold. Missing required files:\n${missingFiles
        .map((filePath) => `- ${filePath}`)
        .join("\n")}`,
    );
  }

  const config = await loadHarnessConfig(cwd);
  const prompt = buildCodexConfigurePrompt({
    projectName: config.project.name,
  });

  stdout.write("Launching interactive Codex configuration...\n");

  try {
    return await launchInteractiveProcess({
      command: options.provider,
      args: [prompt],
      options: {
        cwd,
        stdio: "inherit",
      },
      spawnProcess: spawnProcess ?? defaultSpawnProcess,
    });
  } catch (error) {
    throw new HarnessError(
      `Failed to start codex: ${toErrorMessage(error)}`,
    );
  }
}
