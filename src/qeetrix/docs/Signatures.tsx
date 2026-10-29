// "The seven signatures" (design rules §2), each beside a live specimen drawn with the component
// itself. Rendered to HTML: the specimens are pictures, inert and hidden from assistive technology,
// because the words beside them say the same.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { StarIcon } from "@qeetrix/icons/icons/star";
import {
  Button,
  Card,
  Checkbox,
  mirrorInRtl,
  Tab,
  Tabs,
  TabsList,
  Text,
  TextField,
} from "@qeetrix/react";
import type { ReactNode } from "react";

const Forward = mirrorInRtl(ArrowRightIcon);

const signatures: { title: string; line: string; specimen: ReactNode }[] = [
  {
    title: "Square geometry",
    line: "4px corners on controls and surfaces, 2px on small marks.",
    specimen: (
      <span className="qd-sig-row">
        <Button>Save</Button>
        <Checkbox label="Remember" defaultChecked />
      </span>
    ),
  },
  {
    title: "Filled fields, strong bottom line",
    line: "Inputs, selects and text areas sit on a fill with a ruled base.",
    specimen: <TextField label="Work email" defaultValue="priya@acme.in" />,
  },
  {
    title: "Label-first actions",
    line: "The label leads and the icon trails, on its own zone.",
    specimen: <Button icon={Forward}>Continue</Button>,
  },
  {
    title: "Two solid actions",
    line: "Ember for the primary action, warm graphite for the secondary.",
    specimen: (
      <span className="qd-sig-row">
        <Button>Publish</Button>
        <Button variant="soft">Preview</Button>
      </span>
    ),
  },
  {
    title: "The Ember bar",
    line: "A 3px Ember line marks where you are: tabs, navigation, dialogs.",
    specimen: (
      <Tabs defaultValue="members">
        <TabsList>
          <Tab value="members">Members</Tab>
          <Tab value="roles">Roles</Tab>
        </TabsList>
      </Tabs>
    ),
  },
  {
    title: "Ruled surfaces",
    line: "Flat, separated by 1px lines and tone. Only floating layers cast shadows.",
    specimen: (
      <Card title="Invoice INV-2047" level={4}>
        <Text size="sm" tone="subtle">
          Due 30 Oct 2026
        </Text>
      </Card>
    ),
  },
  {
    title: "Sharp icons",
    line: "Square ends and mitred corners; filled only when selected.",
    specimen: (
      <span className="qd-sig-row qd-sig-icons">
        <SearchIcon size={20} shape="sharp" />
        <BellIcon size={20} shape="sharp" />
        <SettingsIcon size={20} shape="sharp" />
        <StarIcon size={20} shape="sharp" variant="filled" />
      </span>
    ),
  },
];

export default function Signatures() {
  return (
    <ol className="qd-sigs">
      {signatures.map((s, i) => (
        <li key={s.title}>
          <span className="qd-sig-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="qd-sig-text">
            <b>{s.title}</b>
            <span>{s.line}</span>
          </span>
          <span className="qd-sig-specimen" aria-hidden="true" inert>
            {s.specimen}
          </span>
        </li>
      ))}
    </ol>
  );
}
