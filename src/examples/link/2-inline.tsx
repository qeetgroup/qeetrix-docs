import { Link } from "@qeetrix/ui";

/**
 * `inline` for a link inside running text: it wraps with the sentence, takes the surrounding size
 * and is underlined at rest, so it never relies on colour alone. `external` opens a new tab, adds
 * the ↗ glyph and tells screen readers that a new tab will open.
 */
export default function LinkInline() {
  return (
    <p className="max-w-sm text-sm text-muted-foreground">
      Qeet Pay signs every webhook body. Before you go live,{" "}
      <Link inline href="#">
        add the signing secret to your Northwind Retail endpoint
      </Link>{" "}
      and check the{" "}
      <Link inline external href="https://apis.qeet.in">
        Qeet Pay API reference
      </Link>
      .
    </p>
  );
}
