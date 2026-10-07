import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type StatusKind,
  StatusPill,
} from "@qeetrix/ui";

const events: {
  id: string;
  time: string;
  kind: StatusKind;
  level: string;
  message: string;
}[] = [
  {
    id: "e1",
    time: "10:24:01",
    kind: "info",
    level: "INFO",
    message: "POST /v1/payments 201 in 182 ms",
  },
  {
    id: "e2",
    time: "10:24:03",
    kind: "info",
    level: "INFO",
    message: "Webhook payment.captured delivered",
  },
  {
    id: "e3",
    time: "10:24:07",
    kind: "warning",
    level: "WARN",
    message: "UPI collect retry 2 of 3 for pay_3Vb8Np",
  },
  {
    id: "e4",
    time: "10:24:09",
    kind: "danger",
    level: "ERROR",
    message: "Settlement batch stl_0412 failed: bank timeout",
  },
  {
    id: "e5",
    time: "10:24:12",
    kind: "info",
    level: "INFO",
    message: "GET /v1/invoices 200 in 41 ms",
  },
  {
    id: "e6",
    time: "10:24:15",
    kind: "info",
    level: "INFO",
    message: "Refund rfd_8Ze3Qu processed",
  },
];

/**
 * Two panels with a draggable divider; drag the grip, or focus it and use the arrow keys. Sizes
 * are percentages only when written as strings (`defaultSize="60%"`); a bare number is pixels.
 *
 * @layout wide
 */
export default function ResizableDefault() {
  return (
    <div className="h-72 overflow-hidden rounded-lg border border-border bg-background">
      <ResizablePanelGroup>
        <ResizablePanel
          defaultSize="60%"
          minSize="30%"
          className="overflow-auto"
        >
          <ul aria-label="Live tail" className="divide-y divide-border">
            {events.map((event) => (
              <li
                key={event.id}
                className={
                  event.id === "e4"
                    ? "flex items-center gap-2 bg-brand-subtle px-3 py-2"
                    : "flex items-center gap-2 px-3 py-2"
                }
              >
                <span className="font-mono text-caption text-muted-foreground tabular-nums">
                  {event.time}
                </span>
                <StatusPill kind={event.kind} dot={false}>
                  {event.level}
                </StatusPill>
                <span className="min-w-0 truncate font-mono text-caption">
                  {event.message}
                </span>
              </li>
            ))}
          </ul>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize="25%" className="overflow-auto">
          <div className="flex flex-col gap-3 p-4">
            <div>
              <p className="text-caption text-muted-foreground">
                settlements-worker · 8 Oct, 10:24:09 IST
              </p>
              <p className="text-sm font-medium">
                Settlement batch stl_0412 failed: bank timeout
              </p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-caption">
              <dt className="text-muted-foreground">trace_id</dt>
              <dd className="truncate">4bf92f3577b34da6</dd>
              <dt className="text-muted-foreground">tenant</dt>
              <dd>northwind-retail</dd>
              <dt className="text-muted-foreground">region</dt>
              <dd>ap-south-1</dd>
              <dt className="text-muted-foreground">retry_in</dt>
              <dd>15m</dd>
            </dl>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
