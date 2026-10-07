import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type StatusKind,
  StatusPill,
} from "@qeetrix/ui";

const incidents: {
  id: string;
  kind: StatusKind;
  label: string;
  text: string;
}[] = [
  {
    id: "upi",
    kind: "success",
    label: "Resolved",
    text: "UPI collect latency is back to normal across all PSPs (10:24 IST).",
  },
  {
    id: "sms",
    kind: "warning",
    label: "Monitoring",
    text: "SMS OTP delivery delayed on one Jio route; WhatsApp fallback is on.",
  },
  {
    id: "tokens",
    kind: "danger",
    label: "Investigating",
    text: "Elevated refresh-token reuse alerts on tenant Northwind Retail.",
  },
];

/**
 * `CarouselControls` lays Previous, `CarouselIndicators` and Next out in a row beneath the
 * slides, so the carousel fits a card or a drawer with no room for floating arrows. The
 * indicators are a single Tab stop.
 */
export default function CarouselWithControls() {
  return (
    <div className="w-80 rounded-lg border border-border bg-card p-4">
      <p className="mb-3 text-sm font-medium">Platform status</p>
      <Carousel aria-label="Platform incidents">
        <CarouselContent>
          {incidents.map((incident) => (
            <CarouselItem key={incident.id}>
              <div className="flex h-32 flex-col items-start gap-2 rounded-md bg-surface-subtle p-4">
                <StatusPill kind={incident.kind}>{incident.label}</StatusPill>
                <p className="text-sm">{incident.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselControls>
          <CarouselPrevious />
          <CarouselIndicators />
          <CarouselNext />
        </CarouselControls>
      </Carousel>
    </div>
  );
}
