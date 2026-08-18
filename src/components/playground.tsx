"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  Progress,
  Switch,
} from "@qeetrix/ui";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";

type Ctrl =
  | { key: string; label: string; type: "select"; options: string[]; default: string }
  | { key: string; label: string; type: "text"; default: string }
  | { key: string; label: string; type: "boolean"; default: boolean }
  | { key: string; label: string; type: "range"; min: number; max: number; default: number };

type State = Record<string, string | boolean | number>;

type Entry = {
  slug: string;
  name: string;
  controls: Ctrl[];
  render: (v: State) => React.ReactNode;
  code: (v: State) => string;
};

const attr = (name: string, value: string | boolean | number, def?: string | boolean | number) => {
  if (value === def) return "";
  if (typeof value === "boolean") return value ? ` ${name}` : "";
  if (typeof value === "number") return ` ${name}={${value}}`;
  return ` ${name}="${value}"`;
};

const ENTRIES: Entry[] = [
  {
    slug: "button",
    name: "Button",
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
        default: "default",
      },
      {
        key: "size",
        label: "size",
        type: "select",
        options: ["default", "sm", "lg", "xs", "icon"],
        default: "default",
      },
      { key: "disabled", label: "disabled", type: "boolean", default: false },
      { key: "children", label: "text", type: "text", default: "Button" },
    ],
    render: (v) => (
      <Button variant={v.variant as never} size={v.size as never} disabled={v.disabled as boolean}>
        {String(v.children)}
      </Button>
    ),
    code: (v) =>
      `<Button${attr("variant", v.variant, "default")}${attr("size", v.size, "default")}${attr("disabled", v.disabled, false)}>${v.children}</Button>`,
  },
  {
    slug: "badge",
    name: "Badge",
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["default", "secondary", "outline", "destructive"],
        default: "default",
      },
      { key: "children", label: "text", type: "text", default: "Badge" },
    ],
    render: (v) => <Badge variant={v.variant as never}>{String(v.children)}</Badge>,
    code: (v) => `<Badge${attr("variant", v.variant, "default")}>${v.children}</Badge>`,
  },
  {
    slug: "input",
    name: "Input",
    controls: [
      {
        key: "type",
        label: "type",
        type: "select",
        options: ["text", "email", "password", "number"],
        default: "text",
      },
      { key: "placeholder", label: "placeholder", type: "text", default: "you@qeet.in" },
      { key: "disabled", label: "disabled", type: "boolean", default: false },
    ],
    render: (v) => (
      <Input
        type={v.type as string}
        placeholder={String(v.placeholder)}
        disabled={v.disabled as boolean}
        className="w-64"
      />
    ),
    code: (v) =>
      `<Input${attr("type", v.type, "text")}${attr("placeholder", v.placeholder, "")}${attr("disabled", v.disabled, false)} />`,
  },
  {
    slug: "switch",
    name: "Switch",
    controls: [
      { key: "checked", label: "checked", type: "boolean", default: true },
      { key: "disabled", label: "disabled", type: "boolean", default: false },
    ],
    render: (v) => (
      <Switch defaultChecked={v.checked as boolean} disabled={v.disabled as boolean} />
    ),
    code: (v) =>
      `<Switch${attr("defaultChecked", v.checked, false)}${attr("disabled", v.disabled, false)} />`,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    controls: [
      { key: "checked", label: "checked", type: "boolean", default: true },
      { key: "disabled", label: "disabled", type: "boolean", default: false },
      { key: "label", label: "label", type: "text", default: "Accept terms" },
    ],
    render: (v) => (
      <div className="flex items-center gap-2">
        <Checkbox
          defaultChecked={v.checked as boolean}
          disabled={v.disabled as boolean}
          id="pg-check"
        />
        <Label htmlFor="pg-check">{String(v.label)}</Label>
      </div>
    ),
    code: (v) =>
      `<Checkbox${attr("defaultChecked", v.checked, false)}${attr("disabled", v.disabled, false)} id="terms" />\n<Label htmlFor="terms">${v.label}</Label>`,
  },
  {
    slug: "progress",
    name: "Progress",
    controls: [{ key: "value", label: "value", type: "range", min: 0, max: 100, default: 60 }],
    render: (v) => <Progress value={v.value as number} className="w-64" />,
    code: (v) => `<Progress value={${v.value}} />`,
  },
  {
    slug: "alert",
    name: "Alert",
    controls: [
      { key: "title", label: "title", type: "text", default: "Heads up" },
      {
        key: "description",
        label: "description",
        type: "text",
        default: "Your changes have been saved.",
      },
    ],
    render: (v) => (
      <Alert className="w-80">
        <AlertTitle>{String(v.title)}</AlertTitle>
        <AlertDescription>{String(v.description)}</AlertDescription>
      </Alert>
    ),
    code: (v) =>
      `<Alert>\n  <AlertTitle>${v.title}</AlertTitle>\n  <AlertDescription>${v.description}</AlertDescription>\n</Alert>`,
  },
];

function initialState(entry: Entry): State {
  const s: State = {};
  for (const c of entry.controls) s[c.key] = c.default;
  return s;
}

export function Playground() {
  const [slug, setSlug] = useState(ENTRIES[0].slug);
  const entry = useMemo(() => ENTRIES.find((e) => e.slug === slug) ?? ENTRIES[0], [slug]);
  const [state, setState] = useState<State>(() => initialState(ENTRIES[0]));

  const pick = (s: string) => {
    const next = ENTRIES.find((e) => e.slug === s) ?? ENTRIES[0];
    setSlug(s);
    setState(initialState(next));
  };
  const set = (key: string, value: string | boolean | number) =>
    setState((p) => ({ ...p, [key]: value }));

  const code = `import { ${entry.name} } from "@qeetrix/ui";\n\n${entry.code(state)}`;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-1.5">
        {ENTRIES.map((e) => (
          <button
            key={e.slug}
            type="button"
            onClick={() => pick(e.slug)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              e.slug === slug
                ? "border-brand bg-brand/10 text-brand-text"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="order-2 space-y-4 lg:order-1">
          <div className="flex min-h-56 flex-wrap items-center justify-center gap-4 rounded-xl border border-border bg-card p-10 shadow-rest">
            {entry.render(state)}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">code</span>
              <CopyButton value={code} label="Copy code" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">{code}</pre>
          </div>
        </div>

        <div className="order-1 space-y-4 lg:order-2">
          <h2 className="text-sm font-semibold">Controls</h2>
          {entry.controls.map((c) => (
            <div key={c.key} className="space-y-1.5">
              <label
                htmlFor={`ctrl-${c.key}`}
                className="block font-mono text-xs text-muted-foreground"
              >
                {c.label}
              </label>
              {c.type === "select" && (
                <select
                  id={`ctrl-${c.key}`}
                  value={String(state[c.key])}
                  onChange={(e) => set(c.key, e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {c.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
              {c.type === "text" && (
                <input
                  id={`ctrl-${c.key}`}
                  type="text"
                  value={String(state[c.key])}
                  onChange={(e) => set(c.key, e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              )}
              {c.type === "boolean" && (
                <input
                  id={`ctrl-${c.key}`}
                  type="checkbox"
                  checked={Boolean(state[c.key])}
                  onChange={(e) => set(c.key, e.target.checked)}
                  className="size-4 accent-brand"
                />
              )}
              {c.type === "range" && (
                <div className="flex items-center gap-2">
                  <input
                    id={`ctrl-${c.key}`}
                    type="range"
                    min={c.min}
                    max={c.max}
                    value={Number(state[c.key])}
                    onChange={(e) => set(c.key, Number(e.target.value))}
                    className="flex-1 accent-brand"
                  />
                  <span className="w-8 text-right font-mono text-xs text-muted-foreground">
                    {String(state[c.key])}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
