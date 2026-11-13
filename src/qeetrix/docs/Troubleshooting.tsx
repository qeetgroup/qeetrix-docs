// The setup problems people hit, answered in place: the web's by default, or a page's own.
import { Accordion, AccordionItem, Text } from "@qeetrix/react";

export interface Problem {
  value: string;
  title: string;
  answer: string;
}

const web: Problem[] = [
  {
    value: "styles",
    title: "The components render without styles",
    answer:
      "Check both imports are in your root stylesheet, tokens first, and that the tokens come by their full path, @qeetrix/tokens/tokens.css. The short @qeetrix/tokens only resolves where a tool reads the package's style condition, as Tailwind does; Vite stops the build.",
  },
  {
    value: "tailwind",
    title: "With Tailwind, buttons lose their padding",
    answer:
      "Tailwind v4's preflight is overriding the components: the Qeetrix import declared the components layer first, so it ranks lowest. Declare Tailwind's order before the imports, @layer theme, base, components, utilities; then import the tokens, the components and tailwindcss.",
  },
  {
    value: "font",
    title: "The text doesn't look like these docs",
    answer:
      "Qeet Sans comes with @qeetrix/tokens. If your own CSS sets a font on html or body before the tokens load, it wins: set fonts after the tokens, on body, never on html.",
  },
  {
    value: "scheme",
    title: "The page flashes light before turning dark",
    answer:
      "The colour scheme has to be set before the first paint: put colorSchemeScript() from @qeetrix/react in the head, and give QeetrixProvider the same storageKey. Each framework guide shows where.",
  },
];

export default function Troubleshooting({ problems = web }: { problems?: Problem[] }) {
  return (
    <Accordion className="qd-faq">
      {problems.map((p) => (
        <AccordionItem key={p.value} value={p.value} title={p.title}>
          <Text tone="subtle">{p.answer}</Text>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
