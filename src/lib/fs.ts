import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { FileEntry } from "../types.js";

export async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function readJsonFile(filePath: string): Promise<unknown> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as unknown;
}

export async function detectConflicts(
  rootDir: string,
  fileEntries: readonly FileEntry[],
): Promise<string[]> {
  const conflicts: string[] = [];

  for (const entry of fileEntries) {
    const absolutePath = path.join(rootDir, entry.path);
    if (await pathExists(absolutePath)) {
      conflicts.push(entry.path);
    }
  }

  return conflicts.sort();
}

export async function writeTextFiles(
  rootDir: string,
  fileEntries: readonly FileEntry[],
): Promise<void> {
  for (const entry of fileEntries) {
    const absolutePath = path.join(rootDir, entry.path);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, entry.contents, "utf8");
  }
}

export async function ensureRequiredFiles(
  rootDir: string,
  relativePaths: readonly string[],
): Promise<string[]> {
  const missing: string[] = [];

  for (const relativePath of relativePaths) {
    const absolutePath = path.join(rootDir, relativePath);
    if (!(await pathExists(absolutePath))) {
      missing.push(relativePath);
    }
  }

  return missing.sort();
}
