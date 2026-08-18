import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Enterprise components",
  description:
    "Accessible analytics, agenda, access review, audit history, and security-resource contracts in Qeetrix.",
};

const accessExample = `const [items, setItems] = useState(accessAssignments);

<AccessReview
  items={items}
  aria-label="Role access review"
  onStateChange={(id, state) =>
    setItems((current) =>
      current.map((item) => item.id === id ? { ...item, state } : item)
    )
  }
/>`;

const chartExample = `<BarChart
  data={data}
  config={config}
  categoryKey="month"
  dataKeys={["sessions"]}
  accessibleTitle="Monthly sessions"
  accessibleDescription="Successful sessions from January through June."
  accessibleSummary="Sessions increased each month."
  accessibilityTable={
    <ChartDataTable
      caption="Monthly session data"
      data={data}
      columns={columns}
    />
  }
/>`;

export default function EnterpriseComponentsPage() {
  return (
    <PageShell
      title="Enterprise components"
      status="Phase 5"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Enterprise components" }]}
      lead="Reusable enterprise anatomy with strict ownership boundaries: Qeetrix owns accessible presentation and interaction, while products own policy, protocols, schemas, and persistence."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Accessible analytics</h2>
          <p className="mt-2 text-muted-foreground">
            ChartContainer and every chart preset accept a programmatic title, description, summary,
            and equivalent native table. Use a visible table when exact comparison is part of the
            workflow; use the screen-reader-only default when the visual and surrounding UI already
            provide an appropriate visual alternative.
          </p>
          <CodeBlock title="accessible-chart.tsx" code={chartExample} />
          <p className="mt-2 text-sm text-muted-foreground">
            Non-goals: Qeetrix does not infer analytical conclusions, units, locale formatting, or
            large-data aggregation. Interactive point exploration still requires a product-specific
            interaction model and later browser/assistive-technology evidence.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Agenda, not scheduler</h2>
          <p className="mt-2 text-muted-foreground">
            ScheduleCalendar is a basic day/week/month agenda. It renders compact grids from the
            medium breakpoint and a full-label chronological agenda below it.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Non-goals: recurrence rules, resources, drag/create/resize, collision layout, availability,
            timezone conversion policy, and time-grid editing. Adopt a proven scheduling engine when a
            validated product workflow requires those capabilities.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Access review</h2>
          <p className="mt-2 text-muted-foreground">
            AccessReview exposes granted, denied, mixed, pending, inherited, locked, and scoped state.
            It emits direct grant/deny intent only.
          </p>
          <CodeBlock title="access-review.tsx" code={accessExample} />
          <p className="mt-2 text-sm text-muted-foreground">
            Non-goals: role definitions, inheritance resolution, authorization evaluation, approval
            workflows, persistence, and confirmation policy remain in products.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Audit history</h2>
          <p className="mt-2 text-muted-foreground">
            AuditLog reuses the APG Feed keyboard model. AuditEvent standardizes actor, action,
            resource, severity, timestamp, event ID, description, metadata, diff, raw payload, and
            caller-owned actions.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Non-goals: event schemas, ingestion, redaction, retention, filtering, export policy,
            authorization, and transport remain product responsibilities.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Security resources</h2>
          <p className="mt-2 text-muted-foreground">
            SecurityItem provides consistent title, status, description, key-value details, icon, and
            action anatomy for sessions, devices, credentials, passkeys, integrations, and API keys.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Non-goals: WebAuthn, MFA, SSO, SCIM, key issuance, secret storage, authorization,
            confirmation, revocation, validation, and persistence remain in products and their proven
            domain libraries.
          </p>
        </section>
      </div>
    </PageShell>
  );
}