// Components › Stat: its examples, the real Stat and StatGroup with the code for each. Server-safe,
// so they're rendered with the page: nothing here reads token data.
import { PageHeader, Stat, StatGroup } from "@qeetrix/react/experimental";
import { UsersSummary } from "../console";
import type { ExampleDoc } from "../types";

export const UsersAtAGlance = ({ label = "Users at a glance" }) => (
  <StatGroup aria-label={label}>
    <Stat
      label="Total users"
      value={1284}
      note="+38 this week"
      tone="positive"
      trend={[1080, 1094, 1110, 1121, 1139, 1150, 1172, 1190, 1205, 1231, 1246, 1284]}
    />
    <Stat
      label="Active, last 30 days"
      value={1102}
      note="85.8% of users"
      trend={[980, 1010, 995, 1040, 1032, 1061, 1050, 1072, 1068, 1090, 1085, 1102]}
    />
    <Stat
      label="Passkey adoption"
      value="72%"
      note="+6 pts this month"
      tone="positive"
      trend={[41, 44, 47, 50, 53, 55, 58, 61, 63, 66, 69, 72]}
    />
    <Stat
      label="Pending invitations"
      value={64}
      note="9 expire this week"
      tone="warning"
      trend={[30, 34, 31, 40, 38, 45, 52, 49, 55, 58, 61, 64]}
    />
  </StatGroup>
);

export const examples: ExampleDoc[] = [
  {
    id: "key-numbers",
    title: "Key numbers",
    line: "A StatGroup of Stats: equal ruled cells, at least 200px wide, that wrap where it's narrow.",
    code: `<StatGroup aria-label="Users at a glance">
  <Stat label="Total users" value={1284} note="+38 this week" tone="positive" trend={weekly} />
  <Stat label="Active, last 30 days" value={1102} note="85.8% of users" trend={active} />
  <Stat label="Passkey adoption" value="72%" note="+6 pts this month" tone="positive" />
  <Stat label="Pending invitations" value={64} note="9 expire this week" tone="warning" />
</StatGroup>`,
    render: () => <UsersAtAGlance />,
  },
  {
    id: "tones",
    title: "Tones",
    line: "tone colours the note: positive, negative or warning. The words still say which way.",
    code: `<Stat label="Passkey sign-ins" value={8412} note="+12% on last week" tone="positive" />
<Stat label="Failed sign-ins" value={312} note="Up 40% on last week" tone="negative" />
<Stat label="Locked accounts" value={9} note="3 need an admin" tone="warning" />
<Stat label="Median sign-in" value="1.8 s" note="Last 7 days" />`,
    render: () => (
      <StatGroup aria-label="Security this week">
        <Stat label="Passkey sign-ins" value={8412} note="+12% on last week" tone="positive" />
        <Stat label="Failed sign-ins" value={312} note="Up 40% on last week" tone="negative" />
        <Stat label="Locked accounts" value={9} note="3 need an admin" tone="warning" />
        <Stat label="Median sign-in" value="1.8 s" note="Last 7 days" />
      </StatGroup>
    ),
  },
  {
    id: "amounts",
    title: "Amounts",
    line: "currency: money for the locale, a whole amount with no fraction. A unit is a string.",
    code: `<Stat label="Collected this month" value={1245000} currency="INR" />`,
    render: () => (
      <StatGroup aria-label="Billing this month">
        <Stat label="Collected this month" value={1245000} currency="INR" note="38 invoices" />
        <Stat label="Outstanding" value={182400} currency="INR" note="4 overdue" tone="warning" />
      </StatGroup>
    ),
  },
  {
    id: "loading",
    title: "Loading",
    line: "loading: placeholders keep the strip's height while slower numbers come, and Loading is read in the value's place.",
    code: `<Stat label="Passkey adoption" value={data?.adoption} loading={!data} />`,
    render: () => (
      <StatGroup aria-label="Users at a glance, loading">
        <Stat label="Total users" value={1284} note="+38 this week" tone="positive" />
        <Stat label="Active, last 30 days" value={1102} note="85.8% of users" />
        <Stat label="Passkey adoption" value={undefined} loading />
        <Stat label="Pending invitations" value={undefined} loading />
      </StatGroup>
    ),
  },
  {
    id: "in-a-page-header",
    title: "In a page header",
    line: "PageHeader's summary runs the strip edge to edge, under the title.",
    code: `<PageHeader title="Users" summary={<StatGroup aria-label="Users at a glance">…</StatGroup>} />`,
    render: () => (
      <div className="qc-header-figure">
        <PageHeader headingLevel={3} title="Users" count={1284} summary={<UsersSummary />} />
      </div>
    ),
  },
];
