// Destination cards with a live specimen of where they go (the Storybook Welcome's cards), for
// Explore and What's new. Each card is one link; its picture is inert.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { PlayIcon } from "@qeetrix/icons/icons/play";
import { SendIcon } from "@qeetrix/icons/icons/send";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { TriangleAlertIcon } from "@qeetrix/icons/icons/triangle-alert";
import {
  Badge,
  Button,
  Checkbox,
  Heading,
  Input,
  mirrorInRtl,
  Switch,
  Tab,
  Tabs,
  TabsList,
  Text,
} from "@qeetrix/react";
import { AvatarGroup, CodeBlock } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { counts } from "../counts";
import { packages } from "../packages";
import { links } from "../site";

const Forward = mirrorInRtl(ArrowRightIcon);

interface Destination {
  title: string;
  text: string;
  href: string;
  art: ReactNode;
  tag?: string;
}

export const explore: Destination[] = [
  {
    title: "Getting started",
    text: "Install, load the styles, wrap the app.",
    href: links.docs,
    art: <CodeBlock language="tsx" code={`<QeetrixProvider>\n  <App />\n</QeetrixProvider>`} />,
  },
  {
    title: "Foundations",
    text: "Colour, type, spacing, elevation and motion.",
    href: links.foundations,
    art: (
      <div className="home-specimen">
        <span className="home-specimen-type">Aa</span>
        <span className="home-swatches">
          {["brand", "info", "success", "warning", "danger", "neutral"].map((t) => (
            <i key={t} data-tone={t} />
          ))}
        </span>
      </div>
    ),
  },
  {
    title: "Components",
    text: `${counts.components} components, each with live examples and props.`,
    href: links.components,
    art: (
      <div className="home-cluster">
        <Button size="sm">Save changes</Button>
        <Switch label="Alerts" defaultChecked />
        <Checkbox label="Email" defaultChecked />
        <AvatarGroup
          size="sm"
          people={[{ name: "Priya Sharma" }, { name: "Rahul Verma" }, { name: "Ananya Iyer" }]}
          total={12}
          max={3}
        />
      </div>
    ),
  },
  {
    title: "Patterns",
    text: "Qeet ID console screens, composed end to end.",
    href: links.patterns,
    art: (
      <div className="home-signin">
        <Heading level={3} size="title-md">
          Sign in to Acme
        </Heading>
        <Input placeholder="priya@acme.in" aria-label="Email" />
        <Button size="sm" icon={KeyRoundIcon} fullWidth>
          Continue with passkey
        </Button>
      </div>
    ),
  },
];

export const whatsNew: Destination[] = [
  {
    title: "Arrows that follow the reading direction",
    text: `${packages.react.name} ${packages.react.version}`,
    tag: "React",
    href: links.changelog.react,
    art: (
      <div className="home-row">
        <Button variant="soft" size="sm" icon={Forward}>
          Continue
        </Button>
        <span dir="rtl">
          <Button variant="soft" size="sm" icon={Forward}>
            متابعة
          </Button>
        </span>
      </div>
    ),
  },
  {
    title: "A 12px icon size for chips",
    text: `${packages.tokens.name} ${packages.tokens.version}`,
    tag: "Tokens",
    href: links.changelog.tokens,
    art: (
      <div className="home-row">
        <Badge variant="solid" tone="success">
          Active
        </Badge>
        <Badge variant="solid" tone="warning">
          Pending
        </Badge>
        <Badge variant="solid" tone="danger">
          Suspended
        </Badge>
      </div>
    ),
  },
  {
    title: "Sharp icons keep their points",
    text: `${packages.icons.name} ${packages.icons.version}`,
    tag: "Icons",
    href: links.changelog.icons,
    art: (
      <div className="home-row home-icons">
        {(
          [
            ["star", StarIcon],
            ["alert", TriangleAlertIcon],
            ["send", SendIcon],
            ["play", PlayIcon],
            ["bell", BellIcon],
          ] as const
        ).map(([id, Icon]) => (
          <Icon key={id} size={28} shape="sharp" />
        ))}
      </div>
    ),
  },
  {
    title: "Contained tabs with counts",
    text: `${packages.react.name} 0.1.0`,
    tag: "React",
    href: links.changelog.react,
    art: (
      <Tabs defaultValue="members">
        <TabsList variant="contained">
          <Tab value="members" badge={24}>
            Members
          </Tab>
          <Tab value="groups">Groups</Tab>
        </TabsList>
      </Tabs>
    ),
  },
];

/** A card that's one link: a picture of where it goes, its name and a line about it. */
export function DestinationCard({ item, delay = 0 }: { item: Destination; delay?: number }) {
  return (
    <div className="home-card" data-reveal data-reveal-delay={delay}>
      <div className="home-card-art" aria-hidden="true" inert>
        {item.art}
      </div>
      <span className="home-card-copy">
        {item.tag && <span className="home-card-tag">{item.tag}</span>}
        <span className="home-card-title">
          <a className="home-card-link" href={item.href}>
            <Text weight="semibold">{item.title}</Text>
          </a>
          <ArrowRightIcon size={16} className="home-card-arrow" data-qx-mirror />
        </span>
        <Text size="sm" tone="subtle">
          {item.text}
        </Text>
      </span>
    </div>
  );
}

export function CardGrid({ items }: { items: Destination[] }) {
  return (
    <div className="home-grid">
      {items.map((item, i) => (
        <DestinationCard key={item.title} item={item} delay={i * 60} />
      ))}
    </div>
  );
}
