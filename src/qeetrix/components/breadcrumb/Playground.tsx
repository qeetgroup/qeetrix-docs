// Components › Breadcrumb › Playground: the spec the playground kit draws. An island.
import { Breadcrumb, BreadcrumbItem } from "@qeetrix/react/experimental";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const LEVELS: Array<[href: string, label: string]> = [
  ["/applications", "Applications"],
  ["/applications/payroll", "Payroll portal"],
  ["/applications/payroll/users", "Users"],
];

const trail = (levels: string, current: string) =>
  LEVELS.slice(0, Number(levels) - 1).concat([["", current || "Priya Sharma"]]);

const spec: Spec = {
  file: "user-page.tsx",
  imports: [[["Breadcrumb", "BreadcrumbItem"], "@qeetrix/react/experimental"]],
  component: "Breadcrumb",
  controls: [
    {
      prop: "current",
      label: "Current page",
      kind: "text",
      initial: "Priya Sharma",
      code: () => null,
    },
    {
      prop: "levels",
      label: "Levels",
      kind: "choice",
      initial: "3",
      options: [
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
      ],
      code: () => null,
    },
    {
      prop: "label",
      label: "Landmark name",
      kind: "text",
      initial: "Breadcrumb",
      omit: "Breadcrumb",
    },
  ],
  inner: (v) =>
    trail(String(v.levels), String(v.current)).flatMap(([href, label]) =>
      href
        ? element("BreadcrumbItem", [["href", `"${href}"`]], label)
        : element("BreadcrumbItem", [["current"]], label),
    ),
  render: (v) => (
    <Breadcrumb label={String(v.label) || undefined}>
      {trail(String(v.levels), String(v.current)).map(([href, label]) =>
        href ? (
          <BreadcrumbItem key={href} href={`#${href}`}>
            {label}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key="current" current>
            {label}
          </BreadcrumbItem>
        ),
      )}
    </Breadcrumb>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
