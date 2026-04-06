export const VALIDATION_SUBAGENT_REVIEW_ORDER = [
  "review correctness, regressions, and repository-guideline compliance first",
  "run the relevant tests and validation commands second",
  "identify code repetition plus potential improvements in style or code organization third",
] as const;

export function renderValidationSubagentPolicy(options?: {
  bullet?: string;
  nestedBullet?: string;
}): string {
  const bullet = options?.bullet ?? "-";
  const nestedBullet = options?.nestedBullet ?? "  -";

  return [
    `${bullet} Every time implementation is considered complete, run a separate validation subagent with a prompt that is explicitly different from the implementation prompt.`,
    `${bullet} Point that validation subagent to the active ExecPlan when available, or provide a contextual summary when it is not, and direct the reviewer to follow \`REVIEW.md\` when that file exists.`,
    `${bullet} Require that validation subagent to:`,
    ...VALIDATION_SUBAGENT_REVIEW_ORDER.map(
      (item) => `${nestedBullet} ${item}.`,
    ),
    `${bullet} If the validation subagent finds a mistake, an overgrown function, poor separation of concerns, or any other material issue, fix the implementation and run the validation subagent again.`,
    `${bullet} Treat the implementation as incomplete until the validation subagent no longer reports material issues.`,
    `${bullet} Do not move the ExecPlan to \`completed/\` until that validation loop is closed.`,
  ].join("\n");
}
