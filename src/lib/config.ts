import path from "node:path";
import { HarnessError } from "./errors.js";
import { readJsonFile } from "./fs.js";

export interface HarnessConfig {
  harnessVersion: string;
  scaffoldVersion: string;
  project: {
    name: string;
    description?: string;
  };
}

function expectObject(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new HarnessError(`Invalid ${label} in harness.config.json.`);
  }

  return value as Record<string, unknown>;
}

function expectOptionalString(value: unknown, label: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim() === "") {
    throw new HarnessError(`Invalid ${label} in harness.config.json.`);
  }

  return value.trim();
}

function expectNonEmptyString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new HarnessError(`Invalid ${label} in harness.config.json.`);
  }

  return value.trim();
}

export function parseHarnessConfig(value: unknown): HarnessConfig {
  const config = expectObject(value, "root object");
  const project = expectObject(config.project, "project");
  const description = expectOptionalString(
    project.description,
    "project.description",
  );

  return {
    harnessVersion: expectNonEmptyString(
      config.harnessVersion,
      "harnessVersion",
    ),
    scaffoldVersion: expectNonEmptyString(
      config.scaffoldVersion,
      "scaffoldVersion",
    ),
    project: {
      name: expectNonEmptyString(project.name, "project.name"),
      ...(description === undefined ? {} : { description }),
    },
  };
}

export async function loadHarnessConfig(rootDir: string): Promise<HarnessConfig> {
  const configPath = path.join(rootDir, "harness.config.json");
  return parseHarnessConfig(await readJsonFile(configPath));
}
