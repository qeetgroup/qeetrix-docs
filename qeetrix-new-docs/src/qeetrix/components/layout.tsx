// The Layout pages' shared pieces: a cell to lay out, so a gap or a column shows, and what every
// layout component's Accessibility tab says it's tested for.
import { Box, Text } from "@qeetrix/react";
import type { ReactNode } from "react";

/** A block to lay out: a tinted, ruled cell with a label. */
/** `fixed` keeps its width in a row, so a row that can't wrap overflows instead of squeezing. */
export const Cell = ({
  children,
  wide = false,
  fixed = false,
}: {
  children: ReactNode;
  wide?: boolean;
  fixed?: boolean;
}) => (
  <Box
    background="neutral"
    border="subtle"
    radius="control"
    padding="sm"
    className={["qc-cell", wide && "qc-cell-wide", fixed && "qc-cell-fixed"]
      .filter(Boolean)
      .join(" ")}
  >
    <Text size="sm">{children}</Text>
  </Box>
);

export const LAYOUT_TESTED = [
  "axe, WCAG 2.2 A and AA, in Chromium on every pull request",
  "Firefox and WebKit every night",
  "Right to left: logical properties, start and end",
  "Every window size class: 600, 840, 1200 and 1600px",
];
