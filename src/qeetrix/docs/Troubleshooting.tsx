// The setup problems people hit, answered in place.
import { Accordion, AccordionItem, Text } from "@qeetrix/react";

export default function Troubleshooting() {
  return (
    <Accordion className="qd-faq">
      <AccordionItem value="styles" title="The components render without styles">
        <Text tone="subtle">
          Check both imports are in your root stylesheet, tokens first, and that the tokens come by
          their full path, @qeetrix/tokens/tokens.css. The short @qeetrix/tokens only resolves where
          a tool reads the package's style condition, as Tailwind does; Vite stops the build.
        </Text>
      </AccordionItem>
      <AccordionItem value="tailwind" title="With Tailwind, buttons lose their padding">
        <Text tone="subtle">
          Tailwind v4's preflight is overriding the components: the Qeetrix import declared the
          components layer first, so it ranks lowest. Declare Tailwind's order before the imports,
          @layer theme, base, components, utilities; then import the tokens, the components and
          tailwindcss.
        </Text>
      </AccordionItem>
      <AccordionItem value="font" title="The text doesn't look like these docs">
        <Text tone="subtle">
          Qeet Sans comes with @qeetrix/tokens. If your own CSS sets a font on html or body before
          the tokens load, it wins: set fonts after the tokens, on body, never on html.
        </Text>
      </AccordionItem>
      <AccordionItem value="scheme" title="The page flashes light before turning dark">
        <Text tone="subtle">
          The colour scheme has to be set before the first paint: put colorSchemeScript() from
          @qeetrix/react in the head, and give QeetrixProvider the same storageKey. Each framework
          guide shows where.
        </Text>
      </AccordionItem>
    </Accordion>
  );
}
