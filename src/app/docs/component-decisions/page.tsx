import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Choose a component",
  description:
    "Decision guidance for Qeetrix selection, feedback, navigation, forms, and data-table components.",
};

const decisionRows = [
  ["NativeSelect", "A short, fixed single-choice list where browser and mobile-native behavior matter most."],
  ["Select", "A styled single-choice list without free-text input."],
  ["Combobox", "A searchable single-choice list with known options."],
  ["MultiSelect", "Search and choose several known options."],
  ["Autocomplete", "Suggest completions while preserving caller-owned free text."],
  ["Listbox", "An always-visible selectable collection; the caller owns surrounding input and disclosure."],
];

const serverDataTableExample = `const [sorting, setSorting] = useState([]);
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });

<DataTable
  columns={columns}
  data={query.rows}
  manualSorting
  manualFiltering
  manualPagination
  rowCount={query.total}
  getRowId={(row) => row.id}
  state={{ sorting, pagination }}
  onSortingChange={setSorting}
  onPaginationChange={setPagination}
/>`;

export default function ComponentDecisionsPage() {
  return (
    <PageShell
      title="Choose a component"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Choose a component" }]}
      lead="Choose by interaction contract and information lifetime, not by whichever component looks closest."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Selection controls</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pe-4 font-medium">Use</th>
                  <th className="py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {decisionRows.map(([component, guidance]) => (
                  <tr key={component} className="border-b last:border-0">
                    <th className="py-2 pe-4 text-start font-mono font-medium">{component}</th>
                    <td className="py-2 text-muted-foreground">{guidance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Feedback by lifetime</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-muted-foreground">
            <li><strong className="text-foreground">FieldError</strong> explains one invalid control; pair it with FieldControl.</li>
            <li><strong className="text-foreground">FormErrorSummary</strong> links several submit-time errors and Form can move focus to the first invalid control.</li>
            <li><strong className="text-foreground">Alert or Callout</strong> keeps contextual information in the document flow.</li>
            <li><strong className="text-foreground">Banner</strong> communicates page- or system-wide state that must remain visible.</li>
            <li><strong className="text-foreground">Toast</strong> confirms a transient result; never make it the only record of a critical failure.</li>
            <li><strong className="text-foreground">NotificationCenter</strong> stores durable, revisitable events.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Navigation scope</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-muted-foreground">
            <li><strong className="text-foreground">Tabs</strong> switches peer views without changing hierarchy.</li>
            <li><strong className="text-foreground">Breadcrumb</strong> exposes the current location in a hierarchy.</li>
            <li><strong className="text-foreground">Pagination</strong> moves through a collection, not application routes.</li>
            <li><strong className="text-foreground">Sidebar and AppShell</strong> own persistent application-level destinations.</li>
            <li><strong className="text-foreground">Stepper</strong> reports workflow progress; it is not a substitute for arbitrary tabs.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Table or DataTable</h2>
          <p className="mt-2 text-muted-foreground">
            Use Table for semantic, caller-rendered rows. Use DataTable for sorting, filtering,
            pagination, selection, resizing, or virtualization. Its default mode owns client state;
            partial state and manual flags delegate server operations without changing the visual API.
          </p>
          <CodeBlock title="server-data-table.tsx" code={serverDataTableExample} />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Vocabulary for new APIs</h2>
          <p className="mt-2 text-muted-foreground">
            Prefer intents <code className="font-mono text-sm">default</code>,{" "}
            <code className="font-mono text-sm">info</code>,{" "}
            <code className="font-mono text-sm">success</code>,{" "}
            <code className="font-mono text-sm">warning</code>, and{" "}
            <code className="font-mono text-sm">destructive</code>; sizes{" "}
            <code className="font-mono text-sm">xs</code> through{" "}
            <code className="font-mono text-sm">lg</code>. Native inputs use onChange, abstract
            values use onValueChange, and disclosures use onOpenChange. Existing aliases remain
            supported until a documented major-version migration.
          </p>
        </section>
      </div>
    </PageShell>
  );
}