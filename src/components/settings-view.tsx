"use client";

import { buttonVariants, Separator, useTheme } from "@qeetrix/ui";
import { useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";
type Framework = "react" | "next" | "vite" | "remix";
type ImportStyle = "barrel" | "deep";

const FRAMEWORK_KEY = "qeetrix-pref-framework";
const IMPORT_KEY = "qeetrix-pref-import";

const THEMES: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const FRAMEWORKS: { value: Framework; label: string }[] = [
  { value: "react", label: "React" },
  { value: "next", label: "Next" },
  { value: "vite", label: "Vite" },
  { value: "remix", label: "Remix" },
];

const IMPORT_STYLES: { value: ImportStyle; label: string; hint: string }[] = [
  { value: "barrel", label: "Barrel", hint: "@qeetrix/ui" },
  { value: "deep", label: "Deep", hint: "@qeetrix/ui/components/*" },
];

function isFramework(value: string | null): value is Framework {
  return value === "react" || value === "next" || value === "vite" || value === "remix";
}

function isImportStyle(value: string | null): value is ImportStyle {
  return value === "barrel" || value === "deep";
}

function segmentClass(active: boolean): string {
  return buttonVariants({ variant: active ? "default" : "outline", size: "sm" });
}

export function SettingsView() {
  const { theme, setTheme } = useTheme();

  const [framework, setFramework] = useState<Framework>("react");
  const [importStyle, setImportStyle] = useState<ImportStyle>("barrel");
  const [hydrated, setHydrated] = useState(false);

  // Restore persisted preferences on mount (client-only).
  useEffect(() => {
    const storedFramework = window.localStorage.getItem(FRAMEWORK_KEY);
    if (isFramework(storedFramework)) setFramework(storedFramework);
    const storedImport = window.localStorage.getItem(IMPORT_KEY);
    if (isImportStyle(storedImport)) setImportStyle(storedImport);
    setHydrated(true);
  }, []);

  // Persist after hydration so we never overwrite stored values with defaults.
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FRAMEWORK_KEY, framework);
  }, [framework, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(IMPORT_KEY, importStyle);
  }, [importStyle, hydrated]);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Theme
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose light, dark, or follow your operating system.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={theme === option.value}
              onClick={() => setTheme(option.value)}
              className={segmentClass(theme === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Code framework
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preferred framework for code samples across the docs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FRAMEWORKS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={framework === option.value}
              onClick={() => setFramework(option.value)}
              className={segmentClass(framework === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Import style
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            How import statements are written in copied snippets.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {IMPORT_STYLES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={importStyle === option.value}
              onClick={() => setImportStyle(option.value)}
              className={segmentClass(importStyle === option.value)}
            >
              {option.label}
              <span className="font-mono text-xs opacity-70">{option.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-2">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground">
          This site respects your operating system’s{" "}
          <span className="font-mono text-foreground">prefers-reduced-motion</span> setting —
          animations are reduced automatically when it’s enabled.
        </p>
      </section>
    </div>
  );
}
