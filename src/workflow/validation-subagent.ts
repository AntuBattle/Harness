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
    `${bullet} Run a separate validation subagent after implementation with a prompt that is explicitly different from the implementation prompt.`,
    `${bullet} Point that validation subagent to the active ExecPlan when available, or provide a contextual summary when it is not.`,
    `${bullet} Require that validation subagent to:`,
    ...VALIDATION_SUBAGENT_REVIEW_ORDER.map(
      (item) => `${nestedBullet} ${item}.`,
    ),
    `${bullet} Iterate on findings until the validation subagent no longer reports material issues.`,
  ].join("\n");
}
