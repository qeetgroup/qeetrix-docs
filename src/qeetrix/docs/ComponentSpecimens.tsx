// A live preview of every component for the Components page, drawn with the component itself (as
// Storybook's welcome cards draw theirs). Rendered to HTML: the previews are pictures, inert and
// hidden from assistive technology; the card's name says the rest. Overlays, which only render
// while open, are drawn with their own Qeetrix classes, standing still.

import { QeetLogo } from "@qeetrix/icons";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { CreditCardIcon } from "@qeetrix/icons/icons/credit-card";
import { FileTextIcon } from "@qeetrix/icons/icons/file-text";
import { FolderIcon } from "@qeetrix/icons/icons/folder";
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { InboxIcon } from "@qeetrix/icons/icons/inbox";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LinkIcon } from "@qeetrix/icons/icons/link";
import { LogOutIcon } from "@qeetrix/icons/icons/log-out";
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { TextAlignCenterIcon } from "@qeetrix/icons/icons/text-align-center";
import { TextAlignEndIcon } from "@qeetrix/icons/icons/text-align-end";
import { TextAlignStartIcon } from "@qeetrix/icons/icons/text-align-start";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { UnderlineIcon } from "@qeetrix/icons/icons/underline";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Field,
  Heading,
  IconButton,
  Input,
  Link,
  Meter,
  Progress,
  type QeetrixIcon,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Switch,
  Tab,
  Table,
  Tabs,
  TabsList,
  Text,
  Textarea,
  TextField,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import {
  Alert,
  AvatarGroup,
  Breadcrumb,
  BreadcrumbItem,
  Calendar,
  Chip,
  Combobox,
  CopyButton,
  DatePicker,
  DateRangePicker,
  DescriptionItem,
  DescriptionList,
  EmptyState,
  FileUpload,
  NumberField,
  OTPInput,
  PageHeader,
  Pagination,
  PasswordInput,
  RangeCalendar,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  Stat,
  Steps,
  Timeline,
  TimelineItem,
  TopBar,
  TreeView,
} from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { specimens as layout } from "./LayoutSpecimens";

const today = "2026-10-28";
const people = [
  { name: "Priya Sharma" },
  { name: "Rahul Verma" },
  { name: "Ananya Iyer" },
  { name: "Karthik Reddy" },
  { name: "Meera Nair" },
];
const noop = () => {};

/** A menu, drawn with Qeetrix's Menu classes. */
const menu = (items: [QeetrixIcon, string, string?][]) => (
  <div className="qx-menu qd-pv-menu">
    {items.map(([Icon, label, key]) => (
      <div
        key={label}
        className="qx-menu-item"
        data-highlighted={label === items[0][1] ? "" : undefined}
      >
        <Icon shape="sharp" size={16} className="qx-menu-item-icon" />
        <span className="qx-menu-item-label">{label}</span>
        {key && <span className="qx-menu-shortcut">{key}</span>}
      </div>
    ))}
  </div>
);

export const specimens: Record<string, ReactNode> = {
  ...layout,

  // Type
  Heading: (
    <Stack gap="xs">
      <Heading level={3} size="heading-md">
        Invoices
      </Heading>
      <Heading level={4} size="title-md" tone="subtle">
        October 2026
      </Heading>
    </Stack>
  ),
  Text: (
    <Stack gap="xs">
      <Text weight="semibold">₹1,24,500.00</Text>
      <Text size="sm" tone="subtle">
        Due in 3 days · Acme Pvt Ltd
      </Text>
    </Stack>
  ),
  Link: (
    <Stack gap="sm">
      <Link href="#">View all invoices</Link>
      <Link href="#" external>
        Qeet ID docs
      </Link>
    </Stack>
  ),
  "Skip link": (
    <span className="qd-pv-skip">
      <span className="qx-skip-link">Skip to content</span>
    </span>
  ),
  "Visually hidden": (
    <span className="qd-pv-hidden-label">
      <IconButton
        icon={SearchIcon}
        aria-label="Search"
        variant="soft"
        tone="neutral"
        tooltip={false}
      />
      <code>“Search”</code>
    </span>
  ),

  // Actions
  Button: (
    <span className="qd-pv-row">
      <Button size="sm" icon={PlusIcon}>
        Invite
      </Button>
      <Button size="sm" variant="soft">
        Export
      </Button>
    </span>
  ),
  "Icon button": (
    <span className="qd-pv-row">
      <IconButton
        icon={PencilIcon}
        aria-label="Edit"
        variant="soft"
        tone="neutral"
        tooltip={false}
      />
      <IconButton
        icon={CopyIcon}
        aria-label="Copy"
        variant="ghost"
        tone="neutral"
        tooltip={false}
      />
      <IconButton
        icon={TrashIcon}
        aria-label="Delete"
        variant="solid"
        tone="danger"
        tooltip={false}
      />
    </span>
  ),
  Toggle: (
    <span className="qd-pv-row">
      <Toggle icon={StarIcon} aria-label="Star" defaultPressed filledWhenPressed tooltip={false} />
      <Toggle icon={BellIcon} aria-label="Notify" tooltip={false} />
    </span>
  ),
  "Toggle group": (
    <ToggleGroup variant="segmented" size="sm" aria-label="Text" defaultValue={["bold"]} multiple>
      <Toggle value="bold" icon={BoldIcon} aria-label="Bold" tooltip={false} />
      <Toggle value="italic" icon={ItalicIcon} aria-label="Italic" tooltip={false} />
      <Toggle value="underline" icon={UnderlineIcon} aria-label="Underline" tooltip={false} />
      <Toggle value="start" icon={TextAlignStartIcon} aria-label="Start" tooltip={false} />
      <Toggle value="centre" icon={TextAlignCenterIcon} aria-label="Centre" tooltip={false} />
      <Toggle value="end" icon={TextAlignEndIcon} aria-label="End" tooltip={false} />
    </ToggleGroup>
  ),
  "Copy button": (
    <span className="qd-pv-copy">
      <code>qx_live_8f2a…c41d</code>
      <CopyButton value="qx_live_8f2a" label="Copy key" />
    </span>
  ),
  "Command palette": (
    <div className="qx-command qd-pv-command qd-pv-zoom-62">
      <div className="qx-command-search">
        <SearchIcon size={16} className="qx-command-search-icon" />
        <span className="qx-command-input">inv</span>
      </div>
      <div className="qx-command-list">
        <div className="qx-command-group-label">Pages</div>
        <div className="qx-command-item" data-highlighted="">
          <FileTextIcon size={16} className="qx-command-item-icon" />
          <span className="qx-command-label">
            <span className="qx-command-match">Inv</span>oices
          </span>
        </div>
        <div className="qx-command-item">
          <UsersIcon size={16} className="qx-command-item-icon" />
          <span className="qx-command-label">
            <span className="qx-command-match">Inv</span>ite users
          </span>
        </div>
      </div>
    </div>
  ),

  // Forms
  "Text field": <TextField label="Work email" defaultValue="priya@acme.in" />,
  Input: <Input icon={SearchIcon} placeholder="Search users" aria-label="Search users" />,
  Textarea: (
    <Textarea
      aria-label="Note"
      defaultValue="Renewal due in November. Send the quote to finance."
      rows={3}
    />
  ),
  Select: (
    <Select aria-label="Role" items={[{ value: "admin", label: "Admin" }]} defaultValue="admin" />
  ),
  Combobox: (
    <Combobox
      aria-label="City"
      items={[{ value: "mumbai", label: "Mumbai" }]}
      defaultValue="mumbai"
    />
  ),
  Checkbox: (
    <Stack gap="sm">
      <Checkbox label="Email alerts" defaultChecked />
      <Checkbox label="Weekly digest" />
    </Stack>
  ),
  Radio: (
    <RadioGroup label="Plan" defaultValue="growth">
      <Radio value="starter" label="Starter" />
      <Radio value="growth" label="Growth" />
    </RadioGroup>
  ),
  Switch: (
    <Stack gap="sm">
      <Switch label="Require passkeys" defaultChecked />
      <Switch label="Allow SMS codes" />
    </Stack>
  ),
  Slider: <Slider label="Session length" defaultValue={60} showValue />,
  "Number field": (
    <Field label="Seats">
      <NumberField defaultValue={24} />
    </Field>
  ),
  "Password input": (
    <Field label="Password">
      <PasswordInput defaultValue="qeet-2026" autoComplete="off" />
    </Field>
  ),
  "OTP input": <OTPInput length={6} defaultValue="4821" aria-label="Code" />,
  "File upload": (
    <div className="qd-pv-zoom-75">
      <FileUpload
        items={[
          {
            id: "1",
            name: "gst-invoice-oct.pdf",
            size: 248_000,
            status: "uploading",
            progress: 64,
          },
        ]}
        onSelect={noop}
        onRemove={noop}
        locale="en-IN"
      />
    </div>
  ),
  Form: (
    <div className="qd-pv-form qd-pv-zoom-62">
      <TextField label="Company" defaultValue="Acme Pvt Ltd" />
      <TextField
        label="GSTIN"
        defaultValue="27AAPFU0939F1ZV"
        error="Check the state code"
        invalid
      />
    </div>
  ),

  // Dates
  Calendar: (
    <div className="qd-pv-zoom-50">
      <Calendar defaultValue="2026-10-28" today={today} locale="en-IN" />
    </div>
  ),
  "Range calendar": (
    <div className="qd-pv-zoom-50">
      <RangeCalendar
        defaultValue={{ start: "2026-10-12", end: "2026-10-23" }}
        today={today}
        locale="en-IN"
      />
    </div>
  ),
  "Date picker": (
    <Field label="Due date">
      <DatePicker defaultValue="2026-10-30" today={today} locale="en-IN" />
    </Field>
  ),
  "Date range picker": (
    <div className="qd-pv-zoom-75">
      <Field label="Billing period">
        <DateRangePicker
          defaultValue={{ start: "2026-10-01", end: "2026-10-31" }}
          today={today}
          locale="en-IN"
        />
      </Field>
    </div>
  ),

  // Overlays
  Dialog: (
    <div className="qx-dialog qd-pv-dialog qd-pv-zoom-70">
      <div className="qx-dialog-header">
        <h2 className="qx-dialog-title">Remove Priya?</h2>
      </div>
      <div className="qx-dialog-body">
        <p className="qx-dialog-description">She loses access to Acme at once.</p>
      </div>
      <div className="qx-dialog-footer">
        <Button size="sm" variant="soft" tone="neutral">
          Cancel
        </Button>
        <Button size="sm" tone="danger">
          Remove
        </Button>
      </div>
    </div>
  ),
  Drawer: (
    <div className="qd-pv-drawer-stage">
      <div className="qx-drawer qd-pv-drawer qd-pv-zoom-75">
        <div className="qx-drawer-header">
          <h2 className="qx-drawer-title">Filters</h2>
        </div>
        <div className="qx-drawer-body">
          <Checkbox label="Active" defaultChecked />
          <Checkbox label="Invited" defaultChecked />
        </div>
      </div>
    </div>
  ),
  Popover: (
    <span className="qd-pv-stack-centre">
      <div className="qx-popover qd-pv-popover qd-pv-zoom-85">
        <div className="qx-popover-header">
          <h2 className="qx-popover-title">Share report</h2>
        </div>
        <p className="qx-popover-description">Anyone at Acme with the link.</p>
      </div>
      <Button size="sm" variant="soft" icon={LinkIcon}>
        Share
      </Button>
    </span>
  ),
  Tooltip: (
    <span className="qd-pv-stack-centre">
      <span className="qx-tooltip qd-pv-tooltip">Copy invoice number</span>
      <IconButton icon={CopyIcon} aria-label="Copy" variant="soft" tone="neutral" tooltip={false} />
    </span>
  ),
  Menu: (
    <span className="qd-pv-stack-centre">
      {menu([
        [PencilIcon, "Rename", "⌘R"],
        [CopyIcon, "Duplicate", "⌘D"],
        [TrashIcon, "Delete"],
      ])}
    </span>
  ),
  "Context menu": (
    <span className="qd-pv-context qd-pv-zoom-75">
      <span className="qd-pv-context-area">
        <FileTextIcon size={20} />
        INV-2047.pdf
      </span>
      {menu([
        [LinkIcon, "Copy link"],
        [FolderIcon, "Move to"],
      ])}
    </span>
  ),
  Toast: (
    <div className="qx-toast qd-pv-toast" data-tone="success">
      <CircleCheckIcon size={20} className="qx-toast-icon" />
      <div className="qx-toast-content">
        <div className="qx-toast-title">Invitation sent</div>
        <div className="qx-toast-description">Priya will get an email.</div>
      </div>
    </div>
  ),

  // Navigation
  Tabs: (
    <Tabs defaultValue="members">
      <TabsList>
        <Tab value="members" badge={<Badge size="sm">24</Badge>}>
          Members
        </Tab>
        <Tab value="roles">Roles</Tab>
      </TabsList>
    </Tabs>
  ),
  Accordion: (
    <div className="qd-pv-wide">
      <Accordion defaultValue={["billing"]}>
        <AccordionItem value="billing" title="Billing">
          <Text size="sm" tone="subtle">
            GST invoices every month.
          </Text>
        </AccordionItem>
        <AccordionItem value="security" title="Security">
          <Text size="sm">Passkeys and sessions.</Text>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  Collapsible: (
    <div className="qd-pv-wide">
      <Accordion defaultValue={["more"]}>
        <AccordionItem value="more" title="Advanced settings">
          <Switch label="Audit every sign-in" defaultChecked />
        </AccordionItem>
      </Accordion>
    </div>
  ),
  Breadcrumb: (
    <Breadcrumb label="Breadcrumb">
      <BreadcrumbItem href="#">Acme</BreadcrumbItem>
      <BreadcrumbItem href="#">Users</BreadcrumbItem>
      <BreadcrumbItem current>Priya</BreadcrumbItem>
    </Breadcrumb>
  ),
  Pagination: (
    <div className="qd-pv-zoom-80">
      <Pagination
        offset={20}
        pageSize={10}
        itemsOnPage={10}
        total={248}
        onOffsetChange={noop}
        locale="en-IN"
      />
    </div>
  ),
  Steps: (
    <div className="qd-pv-wide qd-pv-zoom-85">
      <Steps
        steps={[{ label: "Company" }, { label: "Billing" }, { label: "Review" }]}
        current={1}
      />
    </div>
  ),

  // Data display
  Table: (
    <div className="qd-pv-wide qd-pv-zoom-70">
      <Table
        label="Users"
        rows={people.slice(0, 3)}
        rowId={(r) => r.name}
        rowLabel={(r) => r.name}
        columns={[
          { id: "name", header: "Name", cell: (r) => r.name, primary: true },
          {
            id: "role",
            header: "Role",
            cell: (r) =>
              r.name === "Priya Sharma" ? <Badge tone="brand">Owner</Badge> : <Badge>Member</Badge>,
          },
        ]}
      />
    </div>
  ),
  Badge: (
    <span className="qd-pv-row qd-pv-wrap">
      <Badge tone="success" variant="solid">
        Active
      </Badge>
      <Badge tone="warning" variant="solid">
        Pending
      </Badge>
      <Badge tone="danger" variant="solid">
        Suspended
      </Badge>
      <Badge tone="info">Invited</Badge>
    </span>
  ),
  Chip: (
    <span className="qd-pv-row qd-pv-wrap">
      <Chip defaultChecked>Unread</Chip>
      <Chip>Mentions</Chip>
      <Chip onRemove={noop}>Status: Active</Chip>
    </span>
  ),
  Avatar: (
    <span className="qd-pv-row">
      <Avatar name="Priya Sharma" size="lg" />
      <Avatar name="Acme" shape="square" size="lg" />
      <Avatar name="Qeet Pay" shape="square" size="lg" />
    </span>
  ),
  "Avatar group": <AvatarGroup people={people} max={3} size="md" locale="en-IN" />,
  Stat: (
    <Stat
      label="Revenue"
      value="₹12.4L"
      note="+8.2% this month"
      tone="positive"
      trend={[4, 5, 4, 6, 7, 6, 8, 9]}
      locale="en-IN"
    />
  ),
  "Description list": (
    <div className="qd-pv-wide qd-pv-zoom-85">
      <DescriptionList>
        <DescriptionItem term="GSTIN">27AAPFU0939F1ZV</DescriptionItem>
        <DescriptionItem term="Plan">Growth · 24 seats</DescriptionItem>
      </DescriptionList>
    </div>
  ),
  Timeline: (
    <div className="qd-pv-wide qd-pv-zoom-80">
      <Timeline variant="compact">
        <TimelineItem title="Invoice paid" time="10:42" tone="success" icon={CreditCardIcon} />
        <TimelineItem title="Passkey added" time="09:15" tone="brand" icon={KeyRoundIcon} />
        <TimelineItem title="Invite sent" time="Yesterday" tone="info" icon={MailIcon} />
      </Timeline>
    </div>
  ),
  "Tree view": (
    <div className="qd-pv-wide qd-pv-zoom-70">
      <TreeView
        label="Files"
        defaultExpanded={["finance"]}
        defaultSelected="oct"
        items={[
          {
            id: "finance",
            label: "Finance",
            icon: FolderIcon,
            children: [
              { id: "oct", label: "October.pdf", icon: FileTextIcon },
              { id: "sep", label: "September.pdf", icon: FileTextIcon },
            ],
          },
          {
            id: "legal",
            label: "Legal",
            icon: FolderIcon,
            children: [{ id: "nda", label: "NDA.pdf" }],
          },
        ]}
      />
    </div>
  ),
  "Code block": (
    <pre className="qd-pv-code qd-pv-zoom-80">
      <code>
        <span className="qd-pv-code-tag">&lt;Button</span>{" "}
        <span className="qd-pv-code-attr">icon</span>=
        <span className="qd-pv-code-str">{"{PlusIcon}"}</span>
        <span className="qd-pv-code-tag">&gt;</span>
        {"\n  Invite\n"}
        <span className="qd-pv-code-tag">&lt;/Button&gt;</span>
      </code>
    </pre>
  ),

  // Feedback
  Alert: (
    <div className="qd-pv-wide qd-pv-zoom-85">
      <Alert tone="warning" title="Payment due">
        ₹24,000 is due on 30 Oct.
      </Alert>
    </div>
  ),
  Progress: (
    <div className="qd-pv-wide">
      <Stack gap="md">
        <Progress value={72} aria-label="Upload" />
        <Progress value={40} tone="success" aria-label="Sync" />
      </Stack>
    </div>
  ),
  Meter: (
    <div className="qd-pv-wide">
      <Stack gap="md">
        <Meter value={72} tone="info" aria-label="Seats" />
        <Meter value={91} tone="warning" aria-label="Storage" />
      </Stack>
    </div>
  ),
  Spinner: (
    <span className="qd-pv-row">
      <Spinner size="lg" decorative />
      <Text size="sm" tone="subtle">
        Syncing users…
      </Text>
    </span>
  ),
  Skeleton: (
    <span className="qd-pv-row qd-pv-wide">
      <Skeleton variant="circle" size="lg" />
      <span className="qd-pv-grow">
        <Skeleton variant="text" lines={2} />
      </span>
    </span>
  ),
  "Empty state": (
    <div className="qd-pv-zoom-75">
      <EmptyState
        icon={InboxIcon}
        title="No invoices yet"
        size="section"
        actions={<Button size="sm">New invoice</Button>}
      />
    </div>
  ),

  // Console frame
  "App shell": (
    <div className="qd-pv-shell">
      <span className="qd-pv-shell-top">
        <QeetLogo height={12} alt="" />
      </span>
      <span className="qd-pv-shell-side">
        {(
          [
            ["home", HouseIcon],
            ["users", UsersIcon],
            ["keys", KeyRoundIcon],
            ["security", ShieldCheckIcon],
            ["settings", SettingsIcon],
          ] as const
        ).map(([id, I]) => (
          <I key={id} size={14} data-current={id === "users" ? "" : undefined} />
        ))}
      </span>
      <span className="qd-pv-shell-main">
        <b />
        <i />
        <i />
        <i />
      </span>
    </div>
  ),
  "Top bar": (
    <div className="qd-pv-wide qd-pv-zoom-62">
      <TopBar
        product="Qeet ID"
        logo={<QeetLogo height={20} alt="" />}
        actions={
          <IconButton
            icon={BellIcon}
            aria-label="Alerts"
            variant="ghost"
            tone="neutral"
            tooltip={false}
          />
        }
        account={<Avatar name="Priya Sharma" size="sm" />}
      />
    </div>
  ),
  Sidebar: (
    <div className="qd-pv-sidebar qd-pv-zoom-80">
      <Sidebar label="Console">
        <SidebarGroup>
          <SidebarItem label="Users" href="#" icon={UsersIcon} current />
          <SidebarItem label="Keys" href="#" icon={KeyRoundIcon} />
          <SidebarItem label="Sign out" href="#" icon={LogOutIcon} />
        </SidebarGroup>
      </Sidebar>
    </div>
  ),
  "Page header": (
    <div className="qd-pv-wide qd-pv-zoom-70">
      <PageHeader
        title="Users"
        count="248"
        description="Everyone at Acme."
        actions={
          <Button size="sm" icon={PlusIcon}>
            Invite
          </Button>
        }
      />
    </div>
  ),
};

/** A component card's preview: a picture, inert and hidden from assistive technology. */
export function ComponentSpecimen({ name }: { name: string }) {
  return (
    <div className="doc-card-art" aria-hidden="true" inert>
      {specimens[name]}
    </div>
  );
}
