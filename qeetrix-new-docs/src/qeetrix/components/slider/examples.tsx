// Components › Slider: its examples, the real Slider with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Slider, Stack } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "a-value",
    title: "A value",
    line: "A number on a scale, with its value shown, formatted for the locale.",
    code: `<Slider label="Session length" showValue min={1} max={24} defaultValue={8} format={{ style: "unit", unit: "hour", unitDisplay: "long" }} />`,
    render: () => (
      <div className="qc-narrow">
        <Slider
          label="Session length"
          showValue
          min={1}
          max={24}
          defaultValue={8}
          format={{ style: "unit", unit: "hour", unitDisplay: "long" }}
        />
      </div>
    ),
  },
  {
    id: "a-range",
    title: "A range",
    line: 'An array value: a thumb for each, named after the label ("Seats, minimum").',
    code: `<Slider label="Seats" showValue min={0} max={500} step={10} defaultValue={[50, 250]} />`,
    render: () => (
      <div className="qc-narrow">
        <Slider label="Seats" showValue min={0} max={500} step={10} defaultValue={[50, 250]} />
      </div>
    ),
  },
  {
    id: "money",
    title: "Money and per cent",
    line: "format takes Intl's options: rupees in lakhs, a percentage.",
    code: `<Stack gap="xl">
  <Slider label="Credit limit" showValue min={0} max={1000000} step={10000} defaultValue={250000} format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }} />
  <Slider label="Discount" showValue min={0} max={0.5} step={0.01} defaultValue={0.12} format={{ style: "percent" }} />
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="xl">
          <Slider
            label="Credit limit"
            showValue
            min={0}
            max={1000000}
            step={10000}
            defaultValue={250000}
            format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }}
          />
          <Slider
            label="Discount"
            showValue
            min={0}
            max={0.5}
            step={0.01}
            defaultValue={0.12}
            format={{ style: "percent" }}
          />
        </Stack>
      </div>
    ),
  },
  {
    id: "with-help",
    title: "Description and error",
    line: "On its own it's a field: a description, and an error that replaces it.",
    code: `<Stack gap="xl">
  <Slider label="Password length" showValue min={8} max={64} defaultValue={12} description="Twelve or more is recommended." />
  <Slider label="Password length" showValue min={8} max={64} defaultValue={8} error="Acme's policy needs at least 12." />
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="xl">
          <Slider
            label="Password length"
            showValue
            min={8}
            max={64}
            defaultValue={12}
            description="Twelve or more is recommended."
          />
          <Slider
            label="Password length"
            showValue
            min={8}
            max={64}
            defaultValue={8}
            error="Acme's policy needs at least 12."
          />
        </Stack>
      </div>
    ),
  },
];
