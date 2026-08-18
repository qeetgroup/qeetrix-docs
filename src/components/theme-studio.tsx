"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Progress,
  Separator,
  Switch,
} from "@qeetrix/ui";
import { type CSSProperties, useState } from "react";
import { CopyButton } from "@/components/copy-button";

type Theme = { l: number; c: number; h: number; radius: number };

const DEFAULT: Theme = { l: 0.7, c: 0.19, h: 47, radius: 0.45 };

const PRESETS: { name: string; theme: Theme }[] = [
  { name: "Qeet orange", theme: { l: 0.7, c: 0.19, h: 47, radius: 0.45 } },
  { name: "Blue", theme: { l: 0.62, c: 0.19, h: 250, radius: 0.5 } },
  { name: "Green", theme: { l: 0.65, c: 0.17, h: 150, radius: 0.5 } },
  { name: "Violet", theme: { l: 0.58, c: 0.24, h: 295, radius: 0.75 } },
  { name: "Rose", theme: { l: 0.62, c: 0.24, h: 12, radius: 0.9 } },
];

const round = (n: number, p = 3) => Number(n.toFixed(p));

function primaryOf(t: Theme) {
  return `oklch(${round(t.l)} ${round(t.c)} ${round(t.h, 1)})`;
}

function exportCss(t: Theme) {
  const p = primaryOf(t);
  return `:root {
  --primary: ${p};
  --primary-foreground: oklch(0.985 0 0);
  --ring: ${p};
  --brand: ${p};
  --brand-500: ${p};
  --brand-text: ${p};
  --radius: ${round(t.radius, 2)}rem;
}`;
}

export function ThemeStudio() {
  const [t, setT] = useState<Theme>(DEFAULT);
  const set = (k: keyof Theme, v: number) => setT((p) => ({ ...p, [k]: v }));
  const primary = primaryOf(t);

  const previewStyle = {
    "--primary": primary,
    "--primary-foreground": "oklch(0.985 0 0)",
    "--ring": primary,
    "--brand": primary,
    "--brand-500": primary,
    "--brand-text": primary,
    "--radius": `${t.radius}rem`,
  } as CSSProperties;

  const css = exportCss(t);

  const Slider = ({
    label,
    k,
    min,
    max,
    step,
  }: {
    label: string;
    k: keyof Theme;
    min: number;
    max: number;
    step: number;
  }) => (
    <div className="space-y-1.5">
      <label
        htmlFor={`ts-${k}`}
        className="flex justify-between font-mono text-xs text-muted-foreground"
      >
        <span>{label}</span>
        <span>{round(t[k], k === "h" ? 0 : 2)}</span>
      </label>
      <input
        id={`ts-${k}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={t[k]}
        onChange={(e) => set(k, Number(e.target.value))}
        className="w-full accent-brand"
      />
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Controls */}
      <div className="space-y-5">
        <div>
          <h2 className="mb-2 text-sm font-semibold">Presets</h2>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setT(p.theme)}
                className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs transition-colors hover:border-brand"
              >
                <span className="size-3 rounded-full" style={{ background: primaryOf(p.theme) }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="size-10 rounded-lg border border-border"
              style={{ background: primary }}
            />
            <div>
              <p className="text-sm font-semibold">Primary</p>
              <code className="font-mono text-xs text-muted-foreground">{primary}</code>
            </div>
          </div>
          <Slider label="Lightness (L)" k="l" min={0.3} max={0.95} step={0.005} />
          <Slider label="Chroma (C)" k="c" min={0} max={0.37} step={0.005} />
          <Slider label="Hue (H)" k="h" min={0} max={360} step={1} />
          <Slider label="Radius (rem)" k="radius" min={0} max={1.5} step={0.05} />
        </div>

        <Separator />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Export</h2>
            <CopyButton value={css} label="Copy CSS" />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-card p-3 font-mono text-[0.7rem] leading-relaxed">
            {css}
          </pre>
          <p className="mt-2 text-xs text-muted-foreground">
            Paste into your global CSS, or scope it under{" "}
            <code className="font-mono">[data-qx-brand="custom"]</code> for a brand overlay.
          </p>
        </div>
      </div>

      {/* Live preview */}
      <div
        style={previewStyle}
        className="space-y-6 rounded-xl border border-border bg-background p-8 shadow-rest"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your brand, live</CardTitle>
              <CardDescription>Every component re-tones instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="you@qeet.in" />
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-sm">Enable notifications</span>
              </div>
              <Progress value={64} />
            </CardContent>
          </Card>

          <Alert>
            <AlertTitle>Ring &amp; focus follow the primary</AlertTitle>
            <AlertDescription>
              Tab into the input to see the focus ring pick up your colour, and note the radius
              across every surface.
            </AlertDescription>
          </Alert>
        </div>

        <p className="text-sm">
          Links and accents use{" "}
          <a
            href="/tokens/color"
            className="font-medium text-brand-text underline-offset-4 hover:underline"
          >
            the brand text token
          </a>
          .
        </p>
      </div>
    </div>
  );
}
