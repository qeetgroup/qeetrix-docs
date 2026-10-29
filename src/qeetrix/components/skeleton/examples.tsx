// Components › Skeleton: its examples, the real Skeleton with the code for each. Server-safe, so
// they're rendered with the page: nothing here reads token data.
import { Card, Inline, Skeleton, Stack, Text, VisuallyHidden } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

/** Priya Sharma's profile card, still on its way. */
export const LoadingProfile = () => (
  <Card title="Profile" level={3}>
    <Stack gap="md" aria-busy="true">
      <VisuallyHidden>
        <Text role="status">Loading Priya Sharma's profile</Text>
      </VisuallyHidden>
      <Inline gap="sm" wrap={false}>
        <Skeleton variant="circle" size="lg" />
        <Stack gap="xs" style={{ flex: 1 }}>
          <Skeleton style={{ inlineSize: "55%" }} />
          <Skeleton style={{ inlineSize: "35%" }} />
        </Stack>
      </Inline>
      <Skeleton lines={3} />
    </Stack>
  </Card>
);

export const examples: ExampleDoc[] = [
  {
    id: "shapes",
    title: "Shapes",
    line: "text, one line; lines, a paragraph whose last line is shorter; block for a card or image; circle for an avatar.",
    code: `<Skeleton />
<Skeleton lines={3} />
<Skeleton variant="block" style={{ blockSize: 96 }} />
<Skeleton variant="circle" />`,
    render: () => (
      <Stack gap="lg" className="qc-skeleton-stage">
        <Skeleton />
        <Skeleton lines={3} />
        <Skeleton variant="block" style={{ blockSize: 96 }} />
        <Skeleton variant="circle" />
      </Stack>
    ),
  },
  {
    id: "avatar-sizes",
    title: "Avatar sizes",
    line: "size, with a circle: the diameter of an Avatar of the same size.",
    code: `<Skeleton variant="circle" size="sm" />
<Skeleton variant="circle" />
<Skeleton variant="circle" size="lg" />
<Skeleton variant="circle" size="xl" />`,
    render: () => (
      <Inline gap="lg" align="end">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Skeleton key={size} variant="circle" size={size} />
        ))}
      </Inline>
    ),
  },
  {
    id: "a-card-loading",
    title: "A card loading",
    line: "Shaped like what's coming. It's hidden from screen readers: mark the region aria-busy and say the wait once.",
    code: `<Stack gap="md" aria-busy="true">
  <VisuallyHidden><Text role="status">Loading Priya Sharma's profile</Text></VisuallyHidden>
  <Inline gap="sm" wrap={false}>
    <Skeleton variant="circle" size="lg" />
    <Stack gap="xs" style={{ flex: 1 }}>
      <Skeleton style={{ inlineSize: "55%" }} />
      <Skeleton style={{ inlineSize: "35%" }} />
    </Stack>
  </Inline>
  <Skeleton lines={3} />
</Stack>`,
    render: () => (
      <div className="qc-fold-stage">
        <LoadingProfile />
      </div>
    ),
  },
];
