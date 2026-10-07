"use client";

import { BellIcon, PlusIcon, SearchIcon } from "@qeetrix/icons";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Tour,
  type TourStepDef,
  toast,
} from "@qeetrix/ui";
import { useState } from "react";

const steps: TourStepDef[] = [
  {
    target: '[data-tour="pay-search"]',
    title: "Search everything",
    content: "Find any payment, customer or invoice by ID, email or amount.",
  },
  {
    target: '[data-tour="pay-new-link"]',
    title: "Create a payment link",
    content:
      "Share it over WhatsApp or email and get paid by UPI, card or netbanking.",
  },
  {
    target: '[data-tour="pay-notifications"]',
    title: "Stay on top of payouts",
    content: "Settlements, failed payments and disputes show up here.",
    placement: "left",
  },
];

/**
 * A step-by-step walkthrough. Each step dims the page, spotlights its `target` (a CSS selector)
 * and shows a card beside it, on the side `placement` asks for when there's room. Next, Back and
 * the arrow keys move between steps; Escape or a click on the backdrop ends the tour, and
 * `onComplete` runs after the last step.
 *
 * @layout wide
 */
export default function TourDefault() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2">
        <InputGroup data-tour="pay-search" className="flex-1">
          <InputGroupAddon>
            <SearchIcon aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search payments"
            placeholder="Search payments"
          />
        </InputGroup>
        <Button data-tour="pay-new-link" size="sm">
          <PlusIcon data-icon="inline-start" aria-hidden />
          Payment link
        </Button>
        <Button
          data-tour="pay-notifications"
          variant="ghost"
          size="icon-sm"
          aria-label="Notifications"
        >
          <BellIcon aria-hidden />
        </Button>
      </div>
      <Button
        variant="outline"
        className="self-center"
        onClick={() => setOpen(true)}
      >
        Start tour
      </Button>
      <Tour
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        onComplete={() => toast.success("You're all set up")}
      />
    </div>
  );
}
