export interface OutputWriter {
  write(chunk: string | Uint8Array): void;
}

export interface FileEntry {
  path: string;
  contents: string;
}

export interface InteractiveSpawnOptions {
  cwd: string;
  stdio: "inherit";
}

export interface SpawnHandle {
  on(event: "error", listener: (error: Error) => void): this;
  on(event: "close", listener: (exitCode: number | null) => void): this;
}

export type SpawnProcess = (
  command: string,
  args: readonly string[],
  options: InteractiveSpawnOptions,
) => SpawnHandle;
