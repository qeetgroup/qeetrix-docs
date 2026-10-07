"use client";

import { Button, Stepper } from "@qeetrix/ui";
import { useState } from "react";

const steps = [
  { label: "Create tenant", description: "Northwind Retail" },
  { label: "Verify domain", description: "TXT record on northwind.in" },
  { label: "Connect SSO", description: "SAML or OIDC" },
  { label: "Invite admins", description: "At least two owners" },
];

/**
 * Steps before `activeStep` show as complete, the active step is marked `aria-current="step"`,
 * and later steps are upcoming. Drive `activeStep` from your own wizard state; at the number of
 * steps, every step is complete.
 *
 * @layout wide
 */
export default function StepperDefault() {
  const [activeStep, setActiveStep] = useState(1);
  const done = activeStep === steps.length;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        aria-label="Tenant onboarding"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
        <Button disabled={done} onClick={() => setActiveStep(activeStep + 1)}>
          {activeStep >= steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
