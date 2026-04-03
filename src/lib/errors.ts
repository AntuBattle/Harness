export interface HarnessErrorOptions {
  code?: string;
  cause?: unknown;
}

export class HarnessError extends Error {
  readonly code: string;

  constructor(message: string, options: HarnessErrorOptions = {}) {
    const errorOptions =
      options.cause === undefined ? undefined : { cause: options.cause };

    super(message, errorOptions);
    this.name = "HarnessError";
    this.code = options.code ?? "HARNESS_ERROR";
  }
}

export function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
