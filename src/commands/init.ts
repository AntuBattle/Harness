import path from "node:path";
import { HarnessError } from "../lib/errors.js";
import { detectConflicts, writeTextFiles } from "../lib/fs.js";
import { buildScaffoldFiles } from "../templates/scaffold.js";
import type { FileEntry, OutputWriter } from "../types.js";

export const INIT_USAGE = `Usage:
  harness init [options]

Options:
  --project-name <name>  Project name used in generated docs.
  --help                 Show this help text.
`;

export interface InitCommandContext {
  args: readonly string[];
  cwd: string;
  stdout: OutputWriter;
}

interface InitOptions {
  help: boolean;
  projectName?: string;
}

function buildSummary({
  cwd,
  projectName,
  fileEntries,
}: {
  cwd: string;
  projectName: string;
  fileEntries: readonly FileEntry[];
}): string {
  const fileLines = fileEntries.map((entry) => `- ${entry.path}`);

  return `${[
    "Harness init complete.",
    `Directory: ${cwd}`,
    `Project: ${projectName}`,
    `Files: ${fileEntries.length}`,
    "",
    ...fileLines,
  ].join("\n")}\n`;
}

function inferProjectName(cwd: string): string {
  const inferredName = path.basename(path.resolve(cwd));
  return inferredName === "" ? "project" : inferredName;
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

function parseInitOptions(args: readonly string[]): InitOptions {
  let help = false;
  let projectName: string | undefined;

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === undefined) {
      break;
    }

    if (argument === "--help" || argument === "-h") {
      help = true;
      continue;
    }

    if (argument === "--project-name") {
      if (projectName !== undefined) {
        throw new HarnessError("`--project-name` may only be provided once.");
      }

      projectName = readRequiredValue(args, index, "--project-name");
      index += 1;
      continue;
    }

    if (argument.startsWith("--")) {
      throw new HarnessError(`Unknown option for \`harness init\`: ${argument}`);
    }

    throw new HarnessError("`harness init` does not accept positional arguments.");
  }

  const options: InitOptions = { help };

  if (projectName !== undefined) {
    options.projectName = projectName;
  }

  return options;
}

export async function runInit({
  args,
  cwd,
  stdout,
}: InitCommandContext): Promise<number> {
  const options = parseInitOptions(args);

  if (options.help) {
    stdout.write(`${INIT_USAGE}\n`);
    return 0;
  }

  const projectName = options.projectName ?? inferProjectName(cwd);
  const fileEntries = buildScaffoldFiles({ projectName });
  const conflicts = await detectConflicts(cwd, fileEntries);

  if (conflicts.length > 0) {
    throw new HarnessError(
      `Refusing to overwrite existing files in ${cwd}:\n${conflicts
        .map((filePath) => `- ${filePath}`)
        .join("\n")}`,
    );
  }

  await writeTextFiles(cwd, fileEntries);
  stdout.write(
    buildSummary({
      cwd,
      projectName,
      fileEntries,
    }),
  );

  return 0;
}
