import { QuoteIcon } from "@qeetrix/icons";
import { Blockquote } from "@qeetrix/ui";

/**
 * A pull-quote or testimonial. `attribution` is rendered as a `<figcaption>` outside the
 * `<blockquote>`, so a screen reader does not read the name as part of the quote; `icon` is
 * decorative.
 */
export default function BlockquoteDefault() {
  return (
    <Blockquote
      className="max-w-lg"
      icon={<QuoteIcon aria-hidden />}
      attribution="Meera Iyer, Head of IT, Northwind Retail"
    >
      We moved 1,200 store staff to passkeys over one weekend. Password-reset
      tickets went from forty a day to almost none.
    </Blockquote>
  );
}
