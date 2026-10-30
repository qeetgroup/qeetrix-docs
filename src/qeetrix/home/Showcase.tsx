// "Not a screenshot. Your next interface.": three Qeet consoles, live, in the C1 frame (TopBar,
// Sidebar, PageHeader, Table), switchable by scheme, density and direction, with an inspector that
// names the components on screen. The frame is composed here rather than with AppShell, which
// renders its own <main> and skip link and sizes itself to the viewport.
import { QeetLogo } from "@qeetrix/icons";
import { BanknoteIcon } from "@qeetrix/icons/icons/banknote";
import { BuildingIcon } from "@qeetrix/icons/icons/building";
import { CalendarCheckIcon } from "@qeetrix/icons/icons/calendar-check";
import { CalendarDaysIcon } from "@qeetrix/icons/icons/calendar-days";
import { ChartColumnIcon } from "@qeetrix/icons/icons/chart-column";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { CreditCardIcon } from "@qeetrix/icons/icons/credit-card";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { FileTextIcon } from "@qeetrix/icons/icons/file-text";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { HandCoinsIcon } from "@qeetrix/icons/icons/hand-coins";
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LandmarkIcon } from "@qeetrix/icons/icons/landmark";
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { LifeBuoyIcon } from "@qeetrix/icons/icons/life-buoy";
import { MoonIcon } from "@qeetrix/icons/icons/moon";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { ReceiptIndianRupeeIcon } from "@qeetrix/icons/icons/receipt-indian-rupee";
import { ScrollTextIcon } from "@qeetrix/icons/icons/scroll-text";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { SquareDashedMousePointerIcon } from "@qeetrix/icons/icons/square-dashed-mouse-pointer";
import { SunIcon } from "@qeetrix/icons/icons/sun";
import { UserGroupIcon } from "@qeetrix/icons/icons/user-group";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { WalletIcon } from "@qeetrix/icons/icons/wallet";
import {
  Avatar,
  Badge,
  type BadgeTone,
  Button,
  Card,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  IconButton,
  QeetrixProvider,
  Select,
  Tab,
  Table,
  Tabs,
  TabsList,
  ToastProvider,
  Toggle,
  ToggleGroup,
  useToast,
} from "@qeetrix/react";
import {
  AvatarItem,
  Breadcrumb,
  BreadcrumbItem,
  PageContent,
  PageHeader,
  Pagination,
  SearchField,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  Stat,
  StatGroup,
  Steps,
  TopBar,
  TopBarSearch,
  TopBarSwitcher,
} from "@qeetrix/react/experimental";
import {
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const inr = (n: number) => formatCurrency(n, "INR", "en-IN", { maximumFractionDigits: 0 });
const NOW = Date.UTC(2026, 9, 28, 9, 30);
const minutes = (n: number) => NOW - n * 60_000;

type ScreenId = "pay" | "people" | "id";
const screens: {
  id: ScreenId;
  product: string;
  line: string;
  url: string;
  icon: ComponentType<{ size?: number }>;
  tone: string;
}[] = [
  {
    id: "pay",
    product: "Qeet Pay",
    line: "Invoices, GST and collections",
    url: "console.qeet.in/pay/invoices",
    icon: WalletIcon,
    tone: "home-tone-green",
  },
  {
    id: "people",
    product: "Qeet People",
    line: "A payroll run, in review",
    url: "console.qeet.in/people/payroll",
    icon: UsersIcon,
    tone: "home-tone-pink",
  },
  {
    id: "id",
    product: "Qeet ID",
    line: "Users, passkeys and access",
    url: "console.qeet.in/id/users",
    icon: KeyRoundIcon,
    tone: "home-tone-blue",
  },
];

/** What the inspector names, and where its tag sits. */
const parts: { sel: string; name: string; end?: true }[] = [
  { sel: ".qx-top-bar", name: "TopBar", end: true },
  { sel: ".qx-sidebar", name: "Sidebar" },
  { sel: ".qx-page-header", name: "PageHeader", end: true },
  { sel: ".qx-stat-group", name: "StatGroup" },
  { sel: ".qx-steps", name: "Steps" },
  { sel: ".qx-page-header .qx-button:last-child", name: "Button" },
  { sel: ".qx-search-field", name: "SearchField" },
  { sel: ".qx-table tbody .qx-badge", name: "Badge" },
  { sel: ".qx-pagination", name: "Pagination", end: true },
];

export default function Showcase() {
  const [screen, setScreen] = useState<ScreenId>("pay");
  const [scheme, setScheme] = useState("light");
  const [density, setDensity] = useState("default");
  const [dir, setDir] = useState("ltr");
  const [inspect, setInspect] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setScheme(root.getAttribute("data-qx-color-scheme") === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-qx-color-scheme"] });
    return () => observer.disconnect();
  }, []);

  const current = screens.find((s) => s.id === screen) ?? screens[0];
  const onKey = (event: KeyboardEvent, i: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (i + step + screens.length) % screens.length;
    setScreen(screens[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="home-show">
      <div className="home-show-tabs" role="tablist" aria-label="Qeet consoles">
        {screens.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`home-tab-${s.id}`}
            aria-selected={s.id === screen}
            aria-controls="home-show-panel"
            tabIndex={s.id === screen ? 0 : -1}
            className="home-show-tab"
            onClick={() => setScreen(s.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={`home-tile home-tile-tone ${s.tone}`}>
              <s.icon size={20} />
            </span>
            <span>
              <b>{s.product}</b>
              <span>{s.line}</span>
            </span>
          </button>
        ))}
      </div>

      <div
        className="home-show-stage"
        id="home-show-panel"
        role="tabpanel"
        aria-labelledby={`home-tab-${screen}`}
      >
        <div className="home-window home-show-win">
          <div className="home-window-bar">
            <span className="home-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="home-url">{current.url}</span>
            <span className="home-show-meta">
              {scheme === "dark" ? "Dark" : "Light"} · {density[0].toUpperCase() + density.slice(1)}{" "}
              · {dir.toUpperCase()}
            </span>
          </div>
          <div
            className="home-show-body"
            ref={body}
            data-qx-color-scheme={scheme}
            data-qx-density={density}
            dir={dir}
          >
            <QeetrixProvider direction={dir as "ltr" | "rtl"}>
              <ToastProvider>
                {screen === "pay" ? (
                  <PayScreen />
                ) : screen === "people" ? (
                  <PeopleScreen />
                ) : (
                  <IdScreen />
                )}
              </ToastProvider>
            </QeetrixProvider>
            {inspect && <Inspector root={body} key={`${screen}-${density}-${dir}`} />}
          </div>
        </div>

        <div className="home-dock" role="toolbar" aria-label="Preview settings">
          <ToggleGroup
            variant="segmented"
            size="sm"
            aria-label="Colour scheme"
            value={[scheme]}
            onValueChange={(v) => v[0] && setScheme(v[0])}
          >
            <Toggle value="light" icon={SunIcon}>
              Light
            </Toggle>
            <Toggle value="dark" icon={MoonIcon}>
              Dark
            </Toggle>
          </ToggleGroup>
          <ToggleGroup
            variant="segmented"
            size="sm"
            aria-label="Density"
            value={[density]}
            onValueChange={(v) => v[0] && setDensity(v[0])}
          >
            <Toggle value="compact">Compact</Toggle>
            <Toggle value="default">Default</Toggle>
            <Toggle value="comfortable">Comfortable</Toggle>
          </ToggleGroup>
          <ToggleGroup
            variant="segmented"
            size="sm"
            aria-label="Direction"
            value={[dir]}
            onValueChange={(v) => v[0] && setDir(v[0])}
          >
            <Toggle value="ltr">LTR</Toggle>
            <Toggle value="rtl">RTL</Toggle>
          </ToggleGroup>
          <span className="home-dock-sep" aria-hidden="true" />
          <Toggle
            size="sm"
            icon={SquareDashedMousePointerIcon}
            pressed={inspect}
            onPressedChange={setInspect}
            tooltip={false}
          >
            Inspect
          </Toggle>
        </div>
      </div>
    </div>
  );
}

/** Outlines the named components inside the preview, measured from the rendered page. */
function Inspector({ root }: { root: RefObject<HTMLDivElement | null> }) {
  const [boxes, setBoxes] = useState<
    { name: string; x: number; y: number; w: number; h: number; end?: true; out: boolean }[]
  >([]);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const found = [];
      for (const p of parts) {
        const t = el.querySelector(p.sel);
        if (!t) continue;
        const b = t.getBoundingClientRect();
        if (!b.width || b.top - r.top > r.height - 24) continue;
        // A small part keeps its label readable: the tag sits above it.
        found.push({
          name: p.name,
          end: p.end,
          out: b.height < 64 && b.top - r.top > 24,
          x: b.left - r.left,
          y: b.top - r.top,
          w: b.width,
          h: Math.min(b.height, r.bottom - b.top),
        });
      }
      setBoxes(found);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [root]);
  return (
    <div className="home-inspect" aria-hidden="true">
      {boxes.map((b, i) => (
        <span
          key={b.name}
          className="home-inspect-box"
          data-end={b.end ? "" : undefined}
          data-out={b.out ? "" : undefined}
          style={{ left: b.x, top: b.y, width: b.w, height: b.h, animationDelay: `${i * 40}ms` }}
        >
          <code>{`<${b.name}>`}</code>
        </span>
      ))}
    </div>
  );
}

/** The C1 console frame: the scope bar on top, the ruled navigation at the start. */
function Frame({
  product,
  nav,
  children,
}: {
  product: string;
  nav: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="home-app">
      <div className="home-app-top">
        <TopBar
          launcher={<IconButton icon={LayoutGridIcon} aria-label="Qeet products" tone="neutral" />}
          logo={<QeetLogo variant="dark" height={20} alt="" />}
          product={product}
          href="#"
          context={<TopBarSwitcher mark="AC" label="Acme Pvt Ltd" />}
          search={<TopBarSearch placeholder="Search or jump to…" shortcut={["⌘", "K"]} />}
          actions={<IconButton icon={SettingsIcon} aria-label="Settings" tone="neutral" />}
          account={<Avatar name="Priya Sharma" size="sm" />}
        />
      </div>
      <div className="home-app-nav">
        <Sidebar
          label={product}
          footer={
            <SidebarGroup>
              <SidebarItem label="Settings" href="#" icon={SettingsIcon} />
              <SidebarItem label="Help and docs" href="#" icon={LifeBuoyIcon} />
            </SidebarGroup>
          }
        >
          {nav}
        </Sidebar>
      </div>
      <div className="home-app-main">{children}</div>
    </div>
  );
}

const invoiceTone: Record<string, BadgeTone> = {
  Paid: "success",
  Sent: "info",
  "Due soon": "warning",
  Overdue: "danger",
  Draft: "neutral",
};
const invoices = [
  {
    id: "INV-2048",
    customer: "Zenith Retail",
    gstin: "27AAPFZ1234K1Z5",
    amount: 124000,
    due: "2026-11-04",
    status: "Sent",
  },
  {
    id: "INV-2047",
    customer: "Nimbus Labs",
    gstin: "29AAGCN5678M1Z2",
    amount: 48200,
    due: "2026-10-30",
    status: "Due soon",
  },
  {
    id: "INV-2046",
    customer: "Kaveri Foods",
    gstin: "33AABCK9012P1Z8",
    amount: 206500,
    due: "2026-10-24",
    status: "Paid",
  },
  {
    id: "INV-2045",
    customer: "Orbit Logistics",
    gstin: "07AACCO3456Q1Z1",
    amount: 62000,
    due: "2026-10-18",
    status: "Overdue",
  },
  {
    id: "INV-2044",
    customer: "Lotus Health",
    gstin: "24AADCL7890R1Z4",
    amount: 89750,
    due: "2026-10-15",
    status: "Paid",
  },
  {
    id: "INV-2043",
    customer: "Indus Motors",
    gstin: "06AAECI2345S1Z7",
    amount: 340000,
    due: "2026-11-12",
    status: "Draft",
  },
];

function PayScreen() {
  const toast = useToast();
  return (
    <Frame
      product="Qeet Pay"
      nav={
        <>
          <SidebarGroup>
            <SidebarItem label="Overview" href="#" icon={HouseIcon} />
          </SidebarGroup>
          <SidebarGroup label="Billing">
            {/* Outlined, as the home was ported: @qeetrix/react 0.4.0 fills a current icon by default. */}
            <SidebarItem
              label="Invoices"
              href="#"
              icon={ReceiptIndianRupeeIcon}
              current
              filledWhenCurrent={false}
              badge="214"
            />
            <SidebarItem label="Customers" href="#" icon={UsersIcon} badge="86" />
            <SidebarItem label="Payments" href="#" icon={CreditCardIcon} />
            <SidebarItem label="Payouts" href="#" icon={LandmarkIcon} />
          </SidebarGroup>
          <SidebarGroup label="Reports">
            <SidebarItem label="GST returns" href="#" icon={FileTextIcon} />
            <SidebarItem label="Settlements" href="#" icon={BanknoteIcon} />
          </SidebarGroup>
        </>
      }
    >
      <Tabs defaultValue="all">
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbItem href="#">Billing</BreadcrumbItem>
              <BreadcrumbItem current>Invoices</BreadcrumbItem>
            </Breadcrumb>
          }
          title="Invoices"
          description="Every invoice for Acme Pvt Ltd, with GST at 18%."
          actions={
            <>
              <Button variant="soft" icon={DownloadIcon}>
                Export
              </Button>
              <Button
                icon={PlusIcon}
                onClick={() =>
                  toast.add({
                    title: "Invoice INV-2049 created",
                    description: "A draft for Kaveri Foods, ready to send.",
                    tone: "success",
                  })
                }
              >
                New invoice
              </Button>
            </>
          }
          summary={
            <StatGroup>
              <Stat
                label="Collected in October"
                value={inr(1842600)}
                note="+12% on September"
                tone="positive"
                trend={[11, 12, 12.6, 13.1, 13.4, 14.2, 14.9, 15.6, 16.1, 16.4, 17.2, 18.4]}
              />
              <Stat
                label="Outstanding"
                value={inr(310400)}
                note="14 invoices"
                trend={[4.1, 3.9, 4.4, 3.8, 3.6, 3.9, 3.4, 3.5, 3.2, 3.3, 3.0, 3.1]}
              />
              <Stat
                label="Overdue"
                value={inr(62000)}
                note="4 invoices"
                tone="warning"
                trend={[0.2, 0.3, 0.3, 0.4, 0.3, 0.5, 0.4, 0.5, 0.6, 0.5, 0.6, 0.62]}
              />
              <Stat
                label="Days to pay"
                value="9 days"
                note="2 days faster"
                tone="positive"
                trend={[14, 13, 13, 12, 12, 11, 11, 11, 10, 10, 9, 9]}
              />
            </StatGroup>
          }
          tabs={
            <TabsList>
              <Tab value="all">All</Tab>
              <Tab value="outstanding">Outstanding</Tab>
              <Tab value="paid">Paid</Tab>
              <Tab value="drafts">Drafts</Tab>
            </TabsList>
          }
        />
        <PageContent>
          <Card
            footer={<Pagination offset={0} pageSize={6} total={214} onOffsetChange={() => {}} />}
          >
            <Table
              label="Invoices"
              rows={invoices}
              rowId={(r) => r.id}
              rowLabel={(r) => r.id}
              selectable
              toolbar={<Toolbar search="Search invoices or customers" filter="Status" />}
              columns={[
                { id: "invoice", header: "Invoice", primary: true, cell: (r) => r.id },
                {
                  id: "customer",
                  header: "Customer",
                  cell: (r) => <AvatarItem name={r.customer} description={r.gstin} />,
                },
                {
                  id: "amount",
                  header: "Amount",
                  align: "end",
                  numeric: true,
                  cell: (r) => inr(r.amount),
                },
                { id: "due", header: "Due", cell: (r) => formatDate(r.due, "en-IN") },
                {
                  id: "status",
                  header: "Status",
                  cell: (r) => <Badge tone={invoiceTone[r.status]}>{r.status}</Badge>,
                },
              ]}
            />
          </Card>
        </PageContent>
      </Tabs>
    </Frame>
  );
}

const payTone: Record<string, BadgeTone> = {
  Ready: "success",
  "Needs review": "warning",
  "On hold": "neutral",
};
const payslips = [
  {
    id: "ps",
    name: "Priya Sharma",
    role: "Engineering Manager",
    dept: "Engineering",
    gross: 240000,
    ded: 38400,
    status: "Ready",
  },
  {
    id: "rv",
    name: "Rahul Verma",
    role: "Finance Lead",
    dept: "Finance",
    gross: 185000,
    ded: 27750,
    status: "Ready",
  },
  {
    id: "ai",
    name: "Ananya Iyer",
    role: "Product Designer",
    dept: "Design",
    gross: 120000,
    ded: 14400,
    status: "Needs review",
  },
  {
    id: "kr",
    name: "Karthik Reddy",
    role: "Account Executive",
    dept: "Sales",
    gross: 68000,
    ded: 6800,
    status: "Ready",
  },
  {
    id: "mn",
    name: "Meera Nair",
    role: "People Partner",
    dept: "People",
    gross: 95000,
    ded: 11400,
    status: "On hold",
  },
  {
    id: "am",
    name: "Arjun Mehta",
    role: "Support Engineer",
    dept: "Support",
    gross: 72000,
    ded: 7920,
    status: "Ready",
  },
];

function PeopleScreen() {
  const toast = useToast();
  return (
    <Frame
      product="Qeet People"
      nav={
        <>
          <SidebarGroup>
            <SidebarItem label="Overview" href="#" icon={HouseIcon} />
          </SidebarGroup>
          <SidebarGroup label="People">
            <SidebarItem label="Employees" href="#" icon={UsersIcon} badge="312" />
            <SidebarItem label="Attendance" href="#" icon={CalendarCheckIcon} />
            <SidebarItem label="Leave" href="#" icon={CalendarDaysIcon} badge="7" />
          </SidebarGroup>
          <SidebarGroup label="Pay">
            {/* Outlined, as the home was ported: @qeetrix/react 0.4.0 fills a current icon by default. */}
            <SidebarItem
              label="Payroll"
              href="#"
              icon={BanknoteIcon}
              current
              filledWhenCurrent={false}
            />
            <SidebarItem label="Reimbursements" href="#" icon={HandCoinsIcon} />
            <SidebarItem label="Tax declarations" href="#" icon={FileTextIcon} />
          </SidebarGroup>
          <SidebarGroup label="Insights">
            <SidebarItem label="Reports" href="#" icon={ChartColumnIcon} />
          </SidebarGroup>
        </>
      }
    >
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbItem href="#">Pay</BreadcrumbItem>
            <BreadcrumbItem current>Payroll</BreadcrumbItem>
          </Breadcrumb>
        }
        title="October 2026 payroll"
        status={<Badge tone="warning">In review</Badge>}
        description="312 people, paid on 31 Oct 2026."
        actions={
          <>
            <Button variant="soft" icon={DownloadIcon}>
              Pay register
            </Button>
            <Button
              icon={CircleCheckIcon}
              onClick={() =>
                toast.add({
                  title: "Payroll approved",
                  description: "312 payslips go out on 31 Oct 2026.",
                  tone: "success",
                })
              }
            >
              Approve payroll
            </Button>
          </>
        }
        summary={
          <Steps
            current={1}
            steps={[
              { label: "Prepare", description: "Attendance locked" },
              { label: "Review", description: "3 need a look" },
              { label: "Approve", description: "Finance lead" },
              { label: "Pay", description: "31 Oct" },
            ]}
          />
        }
      />
      <PageContent>
        <Card footer={<Pagination offset={0} pageSize={6} total={312} onOffsetChange={() => {}} />}>
          <Table
            label="Payslips"
            rows={payslips}
            rowId={(r) => r.id}
            rowLabel={(r) => r.name}
            selectable
            toolbar={<Toolbar search="Search people" filter="Department" />}
            columns={[
              {
                id: "name",
                header: "Employee",
                primary: true,
                cell: (r) => <AvatarItem name={r.name} description={r.role} />,
              },
              { id: "dept", header: "Department", cell: (r) => r.dept },
              {
                id: "gross",
                header: "Gross",
                align: "end",
                numeric: true,
                cell: (r) => inr(r.gross),
              },
              {
                id: "net",
                header: "Net pay",
                align: "end",
                numeric: true,
                cell: (r) => inr(r.gross - r.ded),
              },
              {
                id: "status",
                header: "Status",
                cell: (r) => <Badge tone={payTone[r.status]}>{r.status}</Badge>,
              },
            ]}
          />
        </Card>
      </PageContent>
    </Frame>
  );
}

const userTone: Record<string, BadgeTone> = {
  Active: "success",
  Invited: "info",
  Blocked: "danger",
};
const users = [
  {
    name: "Priya Sharma",
    email: "priya@acme.in",
    status: "Active",
    mfa: "Passkey",
    dept: "Engineering",
    last: minutes(2),
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@acme.in",
    status: "Active",
    mfa: "Passkey",
    dept: "Finance",
    last: minutes(18),
  },
  {
    name: "Ananya Iyer",
    email: "ananya@acme.in",
    status: "Active",
    mfa: "Authenticator",
    dept: "Engineering",
    last: minutes(64),
  },
  {
    name: "Karthik Reddy",
    email: "karthik.r@acme.in",
    status: "Invited",
    mfa: "—",
    dept: "Sales",
    last: minutes(180),
  },
  {
    name: "Meera Nair",
    email: "meera.nair@acme.in",
    status: "Active",
    mfa: "Passkey",
    dept: "People",
    last: minutes(26 * 60),
  },
  {
    name: "Arjun Mehta",
    email: "arjun@acme.in",
    status: "Blocked",
    mfa: "Authenticator",
    dept: "Support",
    last: minutes(3 * 24 * 60),
  },
];

function IdScreen() {
  const toast = useToast();
  return (
    <Frame
      product="Qeet ID"
      nav={
        <>
          <SidebarGroup>
            <SidebarItem label="Overview" href="#" icon={HouseIcon} />
          </SidebarGroup>
          <SidebarGroup label="Directory">
            <SidebarItem
              label="Users"
              href="#"
              icon={UsersIcon}
              current
              filledWhenCurrent
              badge="1,284"
            />
            <SidebarItem label="Groups" href="#" icon={UserGroupIcon} badge="38" />
            <SidebarItem label="Organisations" href="#" icon={BuildingIcon} />
          </SidebarGroup>
          <SidebarGroup label="Security">
            <SidebarItem label="Authentication" href="#" icon={FingerprintPatternIcon} />
            <SidebarItem label="Policies" href="#" icon={ShieldCheckIcon} />
            <SidebarItem label="Audit logs" href="#" icon={ScrollTextIcon} />
          </SidebarGroup>
        </>
      }
    >
      <Tabs defaultValue="all">
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbItem href="#">Directory</BreadcrumbItem>
              <BreadcrumbItem current>Users</BreadcrumbItem>
            </Breadcrumb>
          }
          title="Users"
          description="People who can sign in to Acme Pvt Ltd's applications."
          actions={
            <>
              <Button variant="soft" icon={DownloadIcon}>
                Export
              </Button>
              <Button
                icon={PlusIcon}
                onClick={() =>
                  toast.add({
                    title: "Invitation sent",
                    description: "Meera Nair will get an email to join Acme.",
                    tone: "success",
                  })
                }
              >
                Invite users
              </Button>
            </>
          }
          summary={
            <StatGroup>
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
          }
          tabs={
            <TabsList>
              <Tab value="all">All users</Tab>
              <Tab value="invitations">Invitations</Tab>
              <Tab value="blocked">Blocked</Tab>
            </TabsList>
          }
        />
        <PageContent>
          <Card
            footer={<Pagination offset={0} pageSize={6} total={1284} onOffsetChange={() => {}} />}
          >
            <Table
              label="Users"
              rows={users}
              rowId={(r) => r.email}
              rowLabel={(r) => r.name}
              selectable
              toolbar={<Toolbar search="Search by name, email or ID" filter="MFA" />}
              columns={[
                {
                  id: "name",
                  header: "Name",
                  primary: true,
                  cell: (r) => <AvatarItem name={r.name} description={r.email} />,
                },
                {
                  id: "status",
                  header: "Status",
                  cell: (r) => <Badge tone={userTone[r.status]}>{r.status}</Badge>,
                },
                { id: "mfa", header: "MFA", cell: (r) => r.mfa },
                { id: "dept", header: "Department", cell: (r) => r.dept },
                {
                  id: "last",
                  header: "Last sign-in",
                  align: "end",
                  cell: (r) => formatRelativeTime(r.last, "en-IN", NOW),
                },
              ]}
            />
          </Card>
        </PageContent>
      </Tabs>
    </Frame>
  );
}

function Toolbar({ search, filter }: { search: string; filter: string }) {
  return (
    <div className="home-app-toolbar">
      <SearchField aria-label={search} placeholder={search} />
      <Select
        aria-label={filter}
        defaultValue="any"
        items={[{ value: "any", label: `${filter}: Any` }]}
      />
    </div>
  );
}
