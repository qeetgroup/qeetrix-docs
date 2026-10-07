"use client";

import {
  BoxIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CompassIcon,
  EllipsisIcon,
  ImageIcon,
  InfoIcon,
  Layers2Icon,
  MessageSquareIcon,
  PanelsTopLeftIcon,
  SearchIcon,
  Table2Icon,
  TextCursorInputIcon,
  TriangleAlertIcon,
  WrenchIcon,
} from "@qeetrix/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CopyButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  IconButton,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Kbd,
  KbdGroup,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  QRCode,
  Radio,
  RadioGroup,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  StatusPill,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@qeetrix/ui";
import type { ReactNode } from "react";

/**
 * The showcase's groups — a curated tour, not the library's taxonomy. Every control here is the
 * real @qeetrix/ui component, rendering and behaving exactly as it does in an app.
 */

function Tile({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-3 rounded-lg border border-border-subtle bg-card p-4 ${className ?? ""}`}
    >
      <p className="text-label font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

/**
 * Five tiles a row on wide screens, each column sized to what its tile holds. Below that the Tabs
 * tile spans both columns — its three triggers need the width — and dense flow fills the gap.
 */
const rowOne =
  "grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1.1fr_1.1fr_0.85fr_1.45fr]";
const rowTwo =
  "grid gap-3 sm:grid-flow-row-dense sm:grid-cols-2 xl:grid-cols-[0.95fr_1.75fr_1.3fr_0.8fr_1fr]";

const statuses = [
  { value: "progress", label: "In progress", dot: "bg-primary" },
  { value: "review", label: "In review", dot: "bg-info" },
  { value: "done", label: "Done", dot: "bg-success" },
];

function StatusDot({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`me-2 inline-block size-2 rounded-full ${className}`}
    />
  );
}

function OverviewPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className={rowOne}>
        <Tile title="Button">
          <div className="flex flex-col gap-2">
            <Button className="w-full">Primary button</Button>
            <Button variant="secondary" className="w-full">
              Secondary button
            </Button>
            <Button variant="ghost" className="w-full">
              Ghost button
            </Button>
          </div>
        </Tile>
        <Tile title="Input">
          <Field>
            <FieldLabel>Email address</FieldLabel>
            <FieldControl
              render={<Input type="email" placeholder="you@qeetrix.com" />}
            />
          </Field>
          <Field>
            <FieldLabel>With icon</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon aria-hidden />
              </InputGroupAddon>
              <FieldControl
                render={<InputGroupInput placeholder="Search…" />}
              />
            </InputGroup>
          </Field>
        </Tile>
        <Tile title="Select">
          <Field>
            <FieldLabel>Select project</FieldLabel>
            <Select defaultValue="platform">
              <FieldControl
                render={
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                }
              />
              <SelectContent>
                <SelectItem value="platform">Qeet Platform</SelectItem>
                <SelectItem value="id">Qeet ID</SelectItem>
                <SelectItem value="pay">Qeet Pay</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Status</FieldLabel>
            <Select defaultValue="progress">
              <FieldControl
                render={
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {(value: string) => {
                        const status = statuses.find((s) => s.value === value);
                        return status ? (
                          <>
                            <StatusDot className={status.dot} />
                            {status.label}
                          </>
                        ) : null;
                      }}
                    </SelectValue>
                  </SelectTrigger>
                }
              />
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <StatusDot className={status.dot} />
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Tile>
        <Tile title="Switch">
          <Label className="flex-col items-start gap-2 font-normal">
            Enable feature
            <Switch defaultChecked />
          </Label>
          <Label className="flex-col items-start gap-2 font-normal">
            Disabled state
            <Switch disabled />
          </Label>
        </Tile>
        <Tile title="Alert">
          <Alert variant="success" role="status">
            <CircleCheckIcon variant="filled" aria-hidden />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
          <Alert variant="info" role="status">
            <InfoIcon variant="filled" aria-hidden />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is a neutral alert message.
            </AlertDescription>
          </Alert>
        </Tile>
      </div>
      <div className={rowTwo}>
        <Tile title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Default</Badge>
            <Badge>Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Tile>
        <Tile title="Tabs" className="sm:col-span-2 xl:col-span-1">
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            {["overview", "analytics", "settings"].map((tab) => (
              <TabsContent key={tab} value={tab} className="pt-3">
                <Skeleton className="h-2 w-4/5" />
                <Skeleton className="mt-2 h-2 w-3/5" />
              </TabsContent>
            ))}
          </Tabs>
        </Tile>
        <Tile title="Card">
          <Card size="sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar name="Qeetrix" size="sm">
                  <AvatarFallback />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle>Product update</CardTitle>
                  <CardDescription>
                    New components and improvements are now available.
                  </CardDescription>
                </div>
                <ChevronRightIcon
                  aria-hidden
                  className="mt-auto size-4 shrink-0 text-muted-foreground rtl:rotate-180"
                />
              </div>
            </CardHeader>
          </Card>
        </Tile>
        <Tile title="Tooltip">
          {/* Opens on hover and keyboard focus only: an always-open popup would float over the
           * page and the sticky header as you scroll. */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <IconButton
                    icon={InfoIcon}
                    aria-label="About this setting"
                    variant="outline"
                  />
                }
              />
              <TooltipContent>Helpful information</TooltipContent>
            </Tooltip>
            <p className="text-caption text-muted-foreground">Hover or focus</p>
          </div>
        </Tile>
        <Tile title="Progress">
          <Progress
            value={80}
            label={<span className="sr-only">Upload progress</span>}
          />
        </Tile>
      </div>
    </div>
  );
}

function LayoutPanel() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Tile title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Invite your team</CardTitle>
            <CardDescription>
              Members sign in with a passkey on every device.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button size="sm">Send invites</Button>
            <Button size="sm" variant="ghost">
              Later
            </Button>
          </CardFooter>
        </Card>
      </Tile>
      <Tile title="Separator">
        <div className="flex flex-col gap-3 text-body">
          <p className="text-foreground">Account</p>
          <Separator />
          <div className="flex h-5 items-center gap-3 text-muted-foreground">
            <span>Profile</span>
            <Separator orientation="vertical" />
            <span>Security</span>
            <Separator orientation="vertical" />
            <span>Billing</span>
          </div>
        </div>
      </Tile>
    </div>
  );
}

function NavigationPanel() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Tile title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#showcase">Qeet ID</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#showcase">Tenants</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Tile>
      <Tile title="Segmented control">
        <SegmentedControl defaultValue="week" aria-label="Range">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
      </Tile>
      <Tile title="Tabs">
        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent
            value="members"
            className="pt-3 text-body text-muted-foreground"
          >
            1,842 members
          </TabsContent>
          <TabsContent
            value="roles"
            className="pt-3 text-body text-muted-foreground"
          >
            6 roles
          </TabsContent>
        </Tabs>
      </Tile>
    </div>
  );
}

function FormsPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Tile title="Checkbox">
        <Label className="font-normal">
          <Checkbox defaultChecked />
          Email me on a new sign-in
        </Label>
        <Label className="font-normal">
          <Checkbox />
          Weekly security digest
        </Label>
      </Tile>
      <Tile title="Radio group">
        <RadioGroup defaultValue="mumbai" aria-label="Data region">
          <Label className="font-normal">
            <Radio value="mumbai" />
            Mumbai
          </Label>
          <Label className="font-normal">
            <Radio value="hyderabad" />
            Hyderabad
          </Label>
        </RadioGroup>
      </Tile>
      <Tile title="Slider">
        <Slider defaultValue={30} aria-label="Session timeout" />
      </Tile>
      <Tile title="Textarea">
        <Field>
          <FieldLabel>Note</FieldLabel>
          <FieldControl render={<Textarea placeholder="Add a note…" />} />
          <FieldDescription>Visible to admins only.</FieldDescription>
        </Field>
      </Tile>
    </div>
  );
}

const members = [
  { name: "Rohan Mehta", role: "Admin", status: "active" },
  { name: "Priya Nair", role: "Developer", status: "active" },
  { name: "Arjun Rao", role: "Viewer", status: "pending" },
] as const;

function DataDisplayPanel() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Tile title="Table" className="lg:col-span-2">
        <Table aria-label="Members">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.name}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <StatusPill status={member.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Tile>
      <Tile title="Avatar group">
        <AvatarGroup>
          {members.map((member) => (
            <Avatar key={member.name} name={member.name}>
              <AvatarFallback />
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">Enterprise</Badge>
          <Badge variant="outline">SAML</Badge>
        </div>
      </Tile>
    </div>
  );
}

function OverlaysPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Tile title="Tooltip">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Hover or focus
          </TooltipTrigger>
          <TooltipContent>Opens on hover and keyboard focus</TooltipContent>
        </Tooltip>
      </Tile>
      <Tile title="Popover">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            Share view
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Share this view</PopoverTitle>
            <PopoverDescription>
              Anyone in the tenant with the link can open it.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      </Tile>
      <Tile title="Dropdown menu">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <IconButton
                icon={EllipsisIcon}
                aria-label="Member actions"
                variant="outline"
              />
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Edit role</DropdownMenuItem>
            <DropdownMenuItem>Reset passkeys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tile>
      <Tile title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" size="sm" />}>
            Rename tenant
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename tenant</DialogTitle>
              <DialogDescription>
                The new name shows on sign-in pages and invoices.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button />}>Save</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tile>
    </div>
  );
}

function FeedbackPanel() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Tile title="Alert" className="lg:col-span-2">
        <Alert variant="warning" role="status">
          <TriangleAlertIcon aria-hidden />
          <AlertTitle>API key expires in 7 days</AlertTitle>
          <AlertDescription>
            Rotate it before it stops working.
          </AlertDescription>
        </Alert>
      </Tile>
      <Tile title="Spinner">
        <div className="flex items-center gap-3 text-body text-muted-foreground">
          <Spinner />
          Syncing directory…
        </div>
      </Tile>
      <Tile title="Skeleton" className="lg:col-span-2">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      </Tile>
      <Tile title="Progress">
        <Progress value={64} label="Importing users" />
      </Tile>
    </div>
  );
}

function MediaPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Tile title="Avatar">
        <div className="flex items-end gap-3">
          {(["xs", "sm", "default", "lg", "xl"] as const).map((size) => (
            <Avatar key={size} name="Ananya Iyer" size={size}>
              <AvatarFallback />
            </Avatar>
          ))}
        </div>
      </Tile>
      <Tile title="QR code">
        <QRCode value="https://ui.qeet.in" size={96} aria-label="ui.qeet.in" />
      </Tile>
    </div>
  );
}

function UtilitiesPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Tile title="Kbd">
        <p className="flex items-center gap-2 text-body text-muted-foreground">
          Search
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </p>
      </Tile>
      <Tile title="Copy button">
        <CopyButton value="qk_test_Ab91…" />
      </Tile>
      <Tile title="Toggle">
        <Toggle aria-label="Pin column" defaultPressed>
          Pinned
        </Toggle>
      </Tile>
    </div>
  );
}

export const showcaseGroups = [
  {
    id: "components",
    label: "Components",
    icon: BoxIcon,
    panel: OverviewPanel,
  },
  {
    id: "layout",
    label: "Layout",
    icon: PanelsTopLeftIcon,
    panel: LayoutPanel,
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: CompassIcon,
    panel: NavigationPanel,
  },
  { id: "forms", label: "Forms", icon: TextCursorInputIcon, panel: FormsPanel },
  {
    id: "data-display",
    label: "Data display",
    icon: Table2Icon,
    panel: DataDisplayPanel,
  },
  {
    id: "overlays",
    label: "Overlays",
    icon: Layers2Icon,
    panel: OverlaysPanel,
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquareIcon,
    panel: FeedbackPanel,
  },
  { id: "media", label: "Media", icon: ImageIcon, panel: MediaPanel },
  {
    id: "utilities",
    label: "Utilities",
    icon: WrenchIcon,
    panel: UtilitiesPanel,
  },
] as const;

export type ShowcaseGroupId = (typeof showcaseGroups)[number]["id"];
