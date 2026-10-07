import { Stepper } from "@qeetrix/ui";

const steps = [
  { label: "Lock attendance", description: "312 employees, 1–30 September" },
  {
    label: "Check salary inputs",
    description: "3 employees have no PAN on file",
    invalid: true,
  },
  { label: "Review payslips" },
  { label: "Disburse salaries", description: "Bank transfer via Qeet Pay" },
];

/**
 * `orientation="vertical"` stacks the steps, for side panels and narrow flows. `invalid` draws a
 * step in the destructive treatment with "!" and announces "Has errors"; put the reason in its
 * `description`.
 */
export default function StepperVertical() {
  return (
    <Stepper
      orientation="vertical"
      steps={steps}
      activeStep={1}
      aria-label="September 2026 payroll run"
      className="max-w-xs"
    />
  );
}
