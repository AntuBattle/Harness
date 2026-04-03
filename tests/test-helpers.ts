import type {
  InteractiveSpawnOptions,
  OutputWriter,
  SpawnHandle,
  SpawnProcess,
} from "../src/types.js";

export function createCaptureStream(): OutputWriter & { toString(): string } {
  let value = "";

  return {
    write(chunk) {
      value += chunk.toString();
    },
    toString() {
      return value;
    },
  };
}

type CloseListener = (exitCode: number | null) => void;
type ErrorListener = (error: Error) => void;

class ManualSpawnHandle implements SpawnHandle {
  private readonly closeListeners: CloseListener[] = [];
  private readonly errorListeners: ErrorListener[] = [];

  on(event: "error", listener: ErrorListener): this;
  on(event: "close", listener: CloseListener): this;
  on(
    event: "error" | "close",
    listener: CloseListener | ErrorListener,
  ): this {
    if (event === "close") {
      this.closeListeners.push(listener as CloseListener);
    } else {
      this.errorListeners.push(listener as ErrorListener);
    }

    return this;
  }

  close(exitCode: number | null = 0): void {
    for (const listener of this.closeListeners) {
      listener(exitCode);
    }
  }

  error(error: Error): void {
    for (const listener of this.errorListeners) {
      listener(error);
    }
  }
}

export interface SpawnCall {
  command: string;
  args: readonly string[];
  options: InteractiveSpawnOptions;
}

export function createSuccessfulSpawnStub(
  exitCode = 0,
): {
  calls: SpawnCall[];
  spawn: SpawnProcess;
} {
  const calls: SpawnCall[] = [];
  const spawn: SpawnProcess = (command, args, options) => {
    const handle = new ManualSpawnHandle();
    calls.push({
      command,
      args: [...args],
      options: { ...options },
    });

    queueMicrotask(() => {
      handle.close(exitCode);
    });

    return handle;
  };

  return { calls, spawn };
}

export function createFailingSpawnStub(
  error: Error,
): {
  spawn: SpawnProcess;
} {
  const spawn: SpawnProcess = () => {
    const handle = new ManualSpawnHandle();

    queueMicrotask(() => {
      handle.error(error);
    });

    return handle;
  };

  return { spawn };
}
