import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@qeetrix/ui";

const rows = [
  { service: "payments-api", errors: "1,240", p95: "182 ms" },
  { service: "settlements-worker", errors: "312", p95: "2.4 s" },
  { service: "webhooks-dispatcher", errors: "87", p95: "96 ms" },
  { service: "invoices-api", errors: "12", p95: "41 ms" },
];

/**
 * `orientation="vertical"` stacks the panels, here a Qeet Logs query editor above its results.
 * The divider then moves up and down, with the arrow keys as well as the pointer.
 *
 * @layout wide
 */
export default function ResizableVertical() {
  return (
    <div className="h-80 overflow-hidden rounded-lg border border-border bg-background">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel
          defaultSize="35%"
          minSize="20%"
          className="overflow-auto"
        >
          <pre className="p-4 font-mono text-caption leading-relaxed">
            {`level = "error"
| where region = "ap-south-1"
| stats count() as errors, p95(duration) by service
| sort errors desc`}
          </pre>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize="30%" className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-caption text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-start font-medium">Service</th>
                <th className="px-4 py-2 text-end font-medium">Errors</th>
                <th className="px-4 py-2 text-end font-medium">p95</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.service}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2 font-mono text-caption">
                    {row.service}
                  </td>
                  <td className="px-4 py-2 text-end tabular-nums">
                    {row.errors}
                  </td>
                  <td className="px-4 py-2 text-end tabular-nums">{row.p95}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
