// Components › Tabs: its examples, the real Tabs with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Badge, Tab, Tabs, TabsList, TabsPanel, Text } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

/** Priya Sharma's user page: a view per tab. */
export const USER: Array<[value: string, label: string, panel: string]> = [
  ["profile", "Profile", "priya@acme.in · Engineering"],
  ["security", "Security", "2 passkeys · Two-step sign-in on"],
  ["sessions", "Sessions", "3 active sessions"],
  ["groups", "Groups", "Engineering, Payroll approvers"],
  ["activity", "Activity", "Signed in from Bengaluru 2 minutes ago"],
];

/** The Payroll portal application's page, a tab per view with an icon. */
export const APP = [
  ["overview", "Overview", LayoutGridIcon, "LayoutGridIcon", "OIDC · created 14 March 2024"],
  ["users", "Users", UsersIcon, "UsersIcon", "Engineering, Finance and People"],
  ["sign-in", "Sign-in", ShieldCheckIcon, "ShieldCheckIcon", "Passkeys required"],
  ["credentials", "Credentials", KeyRoundIcon, "KeyRoundIcon", "Secret rotated 1 September 2026"],
] as const;

const Panels = ({ rows }: { rows: ReadonlyArray<readonly [string, string, ...unknown[]]> }) =>
  rows.map(([value, , ...rest]) => (
    <TabsPanel key={value} value={value} className="qc-tab-panel">
      <Text tone="subtle">{String(rest.at(-1))}</Text>
    </TabsPanel>
  ));

function Controlled() {
  const [tab, setTab] = useState("sessions");
  return (
    <div className="qc-tabs-stage">
      <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
        <TabsList aria-label="Priya Sharma">
          {USER.slice(0, 3).map(([value, label]) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsList>
      </Tabs>
      <Text size="sm" tone="subtle">
        Address: /users/priya?tab={tab}
      </Text>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "views-of-one-thing",
    title: "Views of one thing",
    line: "One Tab stop: the arrow keys move and select, Home and End jump, and Tab goes on to the panel.",
    code: `<Tabs defaultValue="profile">
  <TabsList aria-label="Priya Sharma">
    <Tab value="profile">Profile</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="sessions">Sessions</Tab>
  </TabsList>
  <TabsPanel value="profile">…</TabsPanel>
  <TabsPanel value="security">…</TabsPanel>
  <TabsPanel value="sessions">…</TabsPanel>
</Tabs>`,
    render: () => (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="profile">
          <TabsList aria-label="Priya Sharma">
            {USER.map(([value, label]) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsList>
          <Panels rows={USER} />
        </Tabs>
      </div>
    ),
  },
  {
    id: "contained",
    title: "Contained",
    line: 'variant="contained": a segmented strip, for a few views of one card or panel.',
    code: `<TabsList variant="contained" aria-label="Users">
  <Tab value="all">All users</Tab>
  <Tab value="invitations">Invitations</Tab>
  <Tab value="blocked">Blocked</Tab>
</TabsList>`,
    render: () => (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="all">
          <TabsList variant="contained" aria-label="Users">
            <Tab value="all">All users</Tab>
            <Tab value="invitations">Invitations</Tab>
            <Tab value="blocked">Blocked</Tab>
          </TabsList>
          <Panels
            rows={[
              ["all", "", "1,284 users"],
              ["invitations", "", "12 invitations waiting"],
              ["blocked", "", "3 blocked"],
            ]}
          />
        </Tabs>
      </div>
    ),
  },
  {
    id: "icons-and-counts",
    title: "Icons and counts",
    line: "icon, filled while selected with filledWhenSelected; badge, a number formatted for the locale, or your own Badge.",
    code: `<Tab value="users" icon={UsersIcon} filledWhenSelected badge={642}>Users</Tab>
<Tab value="credentials" icon={KeyRoundIcon} filledWhenSelected badge={<Badge tone="danger">1</Badge>}>
  Credentials
</Tab>`,
    render: () => (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="users">
          <TabsList aria-label="Payroll portal">
            {APP.map(([value, label, Icon]) => (
              <Tab
                key={value}
                value={value}
                icon={Icon}
                filledWhenSelected
                badge={
                  value === "users" ? (
                    642
                  ) : value === "credentials" ? (
                    <Badge tone="danger">1</Badge>
                  ) : undefined
                }
              >
                {label}
              </Tab>
            ))}
          </TabsList>
          <Panels rows={APP} />
        </Tabs>
      </div>
    ),
  },
  {
    id: "vertical",
    title: "Vertical",
    line: 'orientation="vertical": the line and the bar on the start edge; Up and Down move.',
    code: `<Tabs defaultValue="general" orientation="vertical">
  <TabsList aria-label="Organisation settings">…</TabsList>
  <TabsPanel value="general">…</TabsPanel>
</Tabs>`,
    render: () => (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="general" orientation="vertical" className="qc-tabs-vertical">
          <TabsList aria-label="Organisation settings">
            <Tab value="general">General</Tab>
            <Tab value="domains">Domains</Tab>
            <Tab value="branding">Branding</Tab>
            <Tab value="billing">Billing</Tab>
          </TabsList>
          <Panels
            rows={[
              ["general", "", "Acme Pvt Ltd · Bengaluru"],
              ["domains", "", "acme.in · acme.co.in"],
              ["branding", "", "Logo and colours"],
              ["billing", "", "Business plan · ₹1,24,500 a year"],
            ]}
          />
        </Tabs>
      </div>
    ),
  },
  {
    id: "more-than-fit",
    title: "More than fit",
    line: "The list scrolls sideways; it never wraps to a second row.",
    code: `<TabsList aria-label="Payroll portal">
  <Tab value="overview">Overview</Tab>
  …
  <Tab value="logs">Logs</Tab>
</TabsList>`,
    render: () => (
      <div className="qc-tabs-stage" data-narrow="">
        <Tabs defaultValue="overview">
          <TabsList aria-label="Payroll portal">
            {["Overview", "Users", "Groups", "Sign-in", "Credentials", "Branding", "Logs"].map(
              (label) => (
                <Tab key={label} value={label.toLowerCase()}>
                  {label}
                </Tab>
              ),
            )}
          </TabsList>
        </Tabs>
      </div>
    ),
  },
  {
    id: "slow-panels",
    title: "Slow panels",
    line: "activateOnFocus={false}: the arrows only move focus, and Enter or Space selects. For panels that load slowly.",
    code: `<TabsList aria-label="Priya Sharma" activateOnFocus={false}>…</TabsList>`,
    render: () => (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="profile">
          <TabsList aria-label="Priya Sharma" activateOnFocus={false}>
            {USER.slice(0, 4).map(([value, label]) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsList>
          <Panels rows={USER.slice(0, 4)} />
        </Tabs>
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "value and onValueChange: the view in your state, or in the address.",
    code: `const [tab, setTab] = useState("sessions");

<Tabs value={tab} onValueChange={setTab}>…</Tabs>`,
    render: () => <Controlled />,
  },
];
