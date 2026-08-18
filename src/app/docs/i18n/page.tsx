import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Internationalization (i18n)",
  description:
    "Localize Qeetrix component strings with @qeetrix/ui/i18n — I18nProvider, useTranslations, and message overrides.",
};

export default function I18nPage() {
  return (
    <PageShell
      title="Internationalization (i18n)"
      status="In development"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Internationalization (i18n)" }]}
      lead="Qeetrix separates system-owned component labels from caller-owned product content. An English fallback catalog ships with the package and can be overridden per locale."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">The i18n entry point</h2>
          <p className="mt-2 text-muted-foreground">
            System-owned strings in CommandPalette, Combobox/MultiSelect, Dialog, OTPInput,
            FileUpload, and Pagination come from{" "}
            <code className="font-mono text-sm">@qeetrix/ui/i18n</code>. It exports{" "}
            <code className="font-mono text-sm">I18nProvider</code>,{" "}
            <code className="font-mono text-sm">useTranslations</code>,{" "}
            <code className="font-mono text-sm">useI18n</code>, and the default{" "}
            <code className="font-mono text-sm">en</code> catalog. The provider is{" "}
            <strong>optional</strong> — components fall back to English when it is absent, so adding
            it later is safe. Caller-owned headings, option labels, errors, and product terminology
            are never translated implicitly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Wire a locale</h2>
          <p className="mt-2 text-muted-foreground">
            Wrap your app in <code className="font-mono text-sm">I18nProvider</code>, passing a
            BCP-47 <code className="font-mono text-sm">locale</code> and a{" "}
            <code className="font-mono text-sm">messages</code> object that is deep-merged over the
            English defaults per namespace. For RTL locales, compose with{" "}
            <code className="font-mono text-sm">DirectionProvider</code>. The provider sets{" "}
            <code className="font-mono text-sm">&lt;html lang&gt;</code> while mounted; pass{" "}
            <code className="font-mono text-sm">setDocumentLanguage={"{false}"}</code>
            when the host application owns that attribute.
          </p>
          <CodeBlock
            title="app/providers.tsx"
            code={`"use client";\nimport { I18nProvider } from "@qeetrix/ui/i18n";\nimport { DirectionProvider } from "@qeetrix/ui";\n\nconst ar = {\n  pagination: { next: "التالي", previous: "السابق" },\n};\n\nexport function Providers({ children }: { children: React.ReactNode }) {\n  return (\n    <I18nProvider locale="ar" messages={ar}>\n      <DirectionProvider direction="rtl">{children}</DirectionProvider>\n    </I18nProvider>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Translate in your own components</h2>
          <p className="mt-2 text-muted-foreground">
            <code className="font-mono text-sm">useTranslations(namespace)</code> returns a{" "}
            <code className="font-mono text-sm">t(key, vars?)</code> function that resolves from the
            active catalog, then the English default, then the raw key, interpolating{" "}
            <code className="font-mono text-sm">{"{var}"}</code> placeholders.
          </p>
          <CodeBlock
            title="cart-summary.tsx"
            code={`"use client";\nimport { useTranslations } from "@qeetrix/ui/i18n";\n\nfunction Total({ count }: { count: number }) {\n  const t = useTranslations("cart");\n  return <span>{t("itemCount", { count })}</span>;\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">What is not covered yet</h2>
          <p className="mt-2 text-muted-foreground">
            Only English (<code className="font-mono text-sm">en</code>) is bundled today; product
            teams supply reviewed locale catalogs. Components with caller-owned labels remain
            prop/slot driven. NumberFormatter, CurrencyInput, FileUpload byte sizes, and Pagination
            counts use explicit or active locales, while broader date/time localization still
            requires component-by-component work.
          </p>
          <InDevelopment>
            Additional locale catalogs and formatting helpers are on the roadmap. Today, supply your
            own <code className="font-mono text-sm">messages</code> per locale. For layout
            mirroring, see the{" "}
            <Link href="/docs/rtl" className="text-brand-text underline-offset-4 hover:underline">
              RTL guide
            </Link>
            .
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
