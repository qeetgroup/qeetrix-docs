// A Foundations section's specimen, rendered to HTML.
import type { Section } from "./kit";

export default function SectionBody({ section }: { section: Section }) {
  return <>{section.render()}</>;
}
