// Components › Top bar: its examples, each a bar in an iframe (frames.tsx): its layout follows the
// window's width, so a frame lays it out at a window's and is zoomed to fit; its menus open inside
// the frame. Rendered with the page: nothing here reads token data.
import { FrameOf } from "../FrameOf";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "the-scope-bar",
    title: "The scope bar",
    line: "Launcher, product, the scope path, search, tools and account, across the full width. Black in light and dark alike, under a 2px Ember line.",
    code: `<TopBar
  launcher={<IconButton icon={LayoutGridIcon} aria-label="Qeet products" tone="neutral" />}
  logo={<QeetLogo variant="dark" height={20} />}
  product="Qeet ID"
  href="/"
  context={<Scope />}
  search={<TopBarSearch placeholder="Search or jump to…" shortcut={["⌘", "K"]} />}
  actions={<IconButton icon={SettingsIcon} aria-label="Settings" tone="neutral" />}
  account={<Avatar name="Priya Sharma" size="sm" />}
/>`,
    render: () => (
      <FrameOf id="top-bar" window={1280} height="220px" title="Example: the Qeet ID top bar" />
    ),
  },
  {
    id: "the-scope-path",
    title: "The scope path",
    line: "context: organisation, then environment, outermost first; a slash before each. Each switcher opens a Menu.",
    code: `<Menu>
  <MenuTrigger render={<TopBarSwitcher mark="AC" label="Acme Pvt Ltd" />} />
  <MenuContent>…</MenuContent>
</Menu>
<Menu>
  <MenuTrigger render={<TopBarSwitcher status="success" label="Production" />} />
  <MenuContent>…</MenuContent>
</Menu>`,
    render: () => (
      <FrameOf
        id="top-bar-scope"
        window={1280}
        height="320px"
        title="Example: a top bar per environment"
      />
    ),
  },
  {
    id: "minimal",
    title: "Minimal",
    line: "product alone is required: a product with one scope needs no path.",
    code: `<TopBar
  logo={<QeetLogo variant="dark" height={20} />}
  product="Qeet Notify"
  actions={<IconButton icon={BellIcon} aria-label="Notifications" tone="neutral" />}
  account={<Avatar name="Priya Sharma" size="sm" />}
/>`,
    render: () => (
      <FrameOf
        id="top-bar-minimal"
        window={1280}
        height="240px"
        title="Example: a minimal top bar"
      />
    ),
  },
  {
    id: "narrow-windows",
    title: "Narrow windows",
    line: "Under 840px the scope path folds into one switcher and search hides; under 600px the product name hides behind the logo and the tools gather in one menu.",
    code: `<TopBar … />`,
    render: () => (
      <div className="qc-frame-pair">
        <FrameOf
          id="top-bar"
          window={720}
          height="240px"
          title="Example: the top bar in a 720px window"
        />
        <FrameOf
          id="top-bar"
          window={390}
          height="240px"
          title="Example: the top bar in a 390px window"
        />
      </div>
    ),
  },
];
