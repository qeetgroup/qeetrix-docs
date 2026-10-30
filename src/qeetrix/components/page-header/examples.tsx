// Components › Page header: its examples, the real PageHeader with the code for each, its title an
// <h3> under the example's own heading (headingLevel). Shared by the page (doc.tsx) and the island
// that runs them (Live.tsx), so the tabs switch. The phone example is a page in an iframe
// (frames.tsx): its gutter follows the window's width.
import { Avatar, Badge, Button } from "@qeetrix/react";
import {
  DescriptionItem,
  DescriptionList,
  PageContent,
  PageHeader,
  PageHeaderBack,
} from "@qeetrix/react/experimental";
import { routerLink, UsersActions, UsersBreadcrumb, UsersPage, UsersSummary } from "../console";
import { FrameOf } from "../FrameOf";
import type { ExampleDoc } from "../types";

/** The Users page's header, in an example: a page's width. */
const UsersHeader = ({ summary = false }) => (
  <div className="qc-header-figure">
    <PageHeader
      headingLevel={3}
      breadcrumb={<UsersBreadcrumb />}
      title="Users"
      count={1284}
      description="People who can sign in to Acme Pvt Ltd's applications."
      actions={<UsersActions />}
      summary={summary ? <UsersSummary /> : undefined}
    />
  </div>
);

export const examples: ExampleDoc[] = [
  {
    id: "a-list-page",
    title: "A list page",
    line: "Where the page sits, its title and count, one line about it, and its actions: the primary last.",
    code: `<PageHeader
  breadcrumb={<Breadcrumb>…</Breadcrumb>}
  title="Users"
  count={1284}
  description="People who can sign in to Acme Pvt Ltd's applications."
  actions={
    <>
      <Button variant="soft" icon={DownloadIcon}>Export</Button>
      <Button icon={PlusIcon}>Invite users</Button>
    </>
  }
/>
<PageContent>…</PageContent>`,
    render: () => <UsersHeader />,
  },
  {
    id: "key-numbers",
    title: "Key numbers",
    line: "summary: a StatGroup, ruled edge to edge under the title.",
    code: `<PageHeader title="Users" … summary={<StatGroup aria-label="Users at a glance">…</StatGroup>} />`,
    render: () => <UsersHeader summary />,
  },
  {
    id: "tabs",
    title: "Tabs",
    line: "tabs: a TabsList at the header's foot, its rule edge to edge. Wrap the header and the page in one Tabs.",
    code: `<Tabs defaultValue="all">
  <PageHeader title="Users" … tabs={<TabsList aria-label="Users">…</TabsList>} />
  <PageContent>…</PageContent>
</Tabs>`,
    render: () => (
      <div className="qc-header-figure">
        <UsersPage summary={false} headingLevel={3} />
      </div>
    ),
  },
  {
    id: "a-detail-page",
    title: "A detail page",
    line: 'back: a PageHeaderBack to the parent, for a page one level down; leading, the record\'s Avatar; status, a Badge beside the title. PageContent width="narrow" for a record.',
    code: `<PageHeader
  back={<PageHeaderBack href="/users">Users</PageHeaderBack>}
  leading={<Avatar name="Priya Sharma" size="lg" decorative />}
  title="Priya Sharma"
  status={<Badge tone="success">Active</Badge>}
  description="priya@acme.in · Engineering"
  actions={<Button>Edit profile</Button>}
/>
<PageContent width="narrow">…</PageContent>`,
    render: () => (
      <div className="qc-header-figure">
        <PageHeader
          headingLevel={3}
          back={
            <PageHeaderBack href="#users" render={routerLink}>
              Users
            </PageHeaderBack>
          }
          leading={<Avatar name="Priya Sharma" size="lg" decorative />}
          title="Priya Sharma"
          status={<Badge tone="success">Active</Badge>}
          description="priya@acme.in · Engineering"
          actions={
            <>
              <Button variant="soft">Reset MFA</Button>
              <Button>Edit profile</Button>
            </>
          }
        />
        <PageContent width="narrow">
          <DescriptionList>
            <DescriptionItem term="Email">priya@acme.in</DescriptionItem>
            <DescriptionItem term="Manager">
              <Avatar name="Rahul Verma" size="sm" decorative /> Rahul Verma
            </DescriptionItem>
            <DescriptionItem term="Last sign-in">2 minutes ago · Bengaluru</DescriptionItem>
          </DescriptionList>
        </PageContent>
      </div>
    ),
  },
  {
    id: "minimal",
    title: "Minimal",
    line: "title alone is required; actions at its end.",
    code: `<PageHeader title="Webhooks" actions={<Button>Add endpoint</Button>} />`,
    render: () => (
      <div className="qc-header-figure">
        <PageHeader headingLevel={3} title="Webhooks" actions={<Button>Add endpoint</Button>} />
      </div>
    ),
  },
  {
    id: "on-a-phone",
    title: "On a phone",
    line: "Under 840px the gutter narrows to 16px; the title, the count and the actions wrap where there's no room.",
    code: `<PageHeader … />`,
    render: () => (
      <FrameOf
        id="page-header"
        narrow
        height="20rem"
        title="Example: the Users page header on a phone"
      />
    ),
  },
];
