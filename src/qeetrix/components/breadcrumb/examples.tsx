// Components › Breadcrumb: its examples, the real Breadcrumb with the code for each. Server-safe,
// so they're rendered with the page: nothing here reads token data.
import { Breadcrumb, BreadcrumbItem, PageHeader } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import type { ReactNode } from "react";
import { UsersBreadcrumb } from "../console";
import type { ExampleDoc } from "../types";

/** A block a breadcrumb can shrink in: in a centred stage it would take its widest width. */
export const Crumbs = ({ children }: { children: ReactNode }) => (
  <div className="qc-crumb-stage">{children}</div>
);

/** The path to a user. `label` names each figure's landmark apart, as a page of them needs. */
export const Trail = ({ current = "Priya Sharma", label = "Breadcrumb" }) => (
  <Breadcrumb label={label}>
    <BreadcrumbItem href="#directory">Directory</BreadcrumbItem>
    <BreadcrumbItem href="#users">Users</BreadcrumbItem>
    <BreadcrumbItem current>{current}</BreadcrumbItem>
  </Breadcrumb>
);

export const examples: ExampleDoc[] = [
  {
    id: "where-the-page-sits",
    title: "Where the page sits",
    line: "Links up the hierarchy, then the current page as plain text, with aria-current.",
    code: `<Breadcrumb>
  <BreadcrumbItem href="/directory">Directory</BreadcrumbItem>
  <BreadcrumbItem href="/directory/users">Users</BreadcrumbItem>
  <BreadcrumbItem current>Priya Sharma</BreadcrumbItem>
</Breadcrumb>`,
    render: () => (
      <Crumbs>
        <Trail label="Breadcrumb, to Priya Sharma" />
      </Crumbs>
    ),
  },
  {
    id: "long-labels",
    title: "Long labels",
    line: "A label over 240px truncates, and keeps its full text as a title.",
    code: `<BreadcrumbItem href="/applications/payroll">Payroll portal for Acme Pvt Ltd employees</BreadcrumbItem>`,
    render: () => (
      <Crumbs>
        <Breadcrumb label="Breadcrumb, long labels">
          <BreadcrumbItem href="#applications">Applications</BreadcrumbItem>
          <BreadcrumbItem href="#payroll">Payroll portal for Acme Pvt Ltd employees</BreadcrumbItem>
          <BreadcrumbItem current>Sessions and devices from the last ninety days</BreadcrumbItem>
        </Breadcrumb>
      </Crumbs>
    ),
  },
  {
    id: "in-a-page-header",
    title: "In a page header",
    line: "PageHeader's breadcrumb sits above the title.",
    code: `<PageHeader
  breadcrumb={
    <Breadcrumb>
      <BreadcrumbItem href="/directory">Directory</BreadcrumbItem>
      <BreadcrumbItem current>Users</BreadcrumbItem>
    </Breadcrumb>
  }
  title="Users"
/>`,
    render: () => (
      <div className="qc-header-figure">
        <PageHeader headingLevel={3} breadcrumb={<UsersBreadcrumb />} title="Users" count={1284} />
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Server-safe, so the provider's strings don't reach it: pass the landmark's name as label.",
    code: `import { hi } from "@qeetrix/react/locales/hi";

<Breadcrumb label={hi.breadcrumb.label}>…</Breadcrumb>`,
    render: () => (
      <div lang="hi" className="qc-crumb-stage">
        <Breadcrumb label={hi.breadcrumb.label}>
          <BreadcrumbItem href="#directory">डायरेक्टरी</BreadcrumbItem>
          <BreadcrumbItem href="#users">उपयोगकर्ता</BreadcrumbItem>
          <BreadcrumbItem current>प्रिया शर्मा</BreadcrumbItem>
        </Breadcrumb>
      </div>
    ),
  },
];
