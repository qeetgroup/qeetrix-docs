import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ThemeStudio } from "@/components/theme-studio";

export const metadata: Metadata = {
  title: "Theme Studio",
  description:
    "Visually tune the Qeetrix primary colour (OKLCH) and radius, preview every component live, and export the CSS.",
};

export default function ThemePage() {
  return (
    <PageShell
      title="Theme Studio"
      crumbs={[{ title: "Theme Studio" }]}
      lead="Tune the primary colour in OKLCH and the corner radius, watch every component re-tone live, then export the CSS. This edits the same --primary / --radius / brand variables Qeetrix ships."
    >
      <ThemeStudio />
    </PageShell>
  );
}
