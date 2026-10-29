// Components › Grid: its examples, the real Grid with the code for each. Server-safe, so they're
// rendered with the page: nothing here reads token data.
import { Grid, GridItem } from "@qeetrix/react";
import { Cell } from "../layout";
import type { ExampleDoc } from "../types";

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cells = (n: number) => NUMBERS.slice(0, n).map((label) => <Cell key={label}>{label}</Cell>);

export const examples: ExampleDoc[] = [
  {
    id: "equal-columns",
    title: "Equal columns",
    line: "columns: one count, 1 to 12, each column the same width; md (12px) apart by default.",
    code: `<Grid columns={3}>…</Grid>`,
    render: () => (
      <div className="qc-grid-stage">
        <Grid columns={3}>{cells(6)}</Grid>
      </div>
    ),
  },
  {
    id: "by-window-size",
    title: "By window size",
    line: "One count per window size class: base under 600px, medium from 600, expanded from 840, large from 1200, xlarge from 1600. Resize the window.",
    code: `<Grid columns={{ base: 1, medium: 2, expanded: 3, large: 4 }} gap="lg">…</Grid>`,
    render: () => (
      <div className="qc-grid-stage">
        <Grid columns={{ base: 1, medium: 2, expanded: 3, large: 4 }} gap="lg">
          {cells(8)}
        </Grid>
      </div>
    ),
  },
  {
    id: "a-main-and-a-side-column",
    title: "A main and a side column",
    line: "GridItem span: a detail page's main column beside its side column, stacked where it's narrow.",
    code: `<Grid columns={{ base: 1, large: 3 }} gap="xl">
  <GridItem span={{ large: 2 }}>…</GridItem>
  <GridItem>…</GridItem>
</Grid>`,
    render: () => (
      <div className="qc-grid-stage">
        <Grid columns={{ base: 1, large: 3 }} gap="xl">
          <GridItem span={{ large: 2 }}>
            <Cell>Profile, security and sessions</Cell>
          </GridItem>
          <GridItem>
            <Cell>Recent activity</Cell>
          </GridItem>
        </Grid>
      </div>
    ),
  },
  {
    id: "a-place-of-its-own",
    title: "A place of its own",
    line: "GridItem start: the column a cell starts in, 1 at the start edge.",
    code: `<Grid columns={4}>
  <GridItem start={2} span={2}>…</GridItem>
</Grid>`,
    render: () => (
      <div className="qc-grid-stage">
        <Grid columns={4}>
          <GridItem start={2} span={2}>
            <Cell>Columns 2 and 3</Cell>
          </GridItem>
        </Grid>
      </div>
    ),
  },
];
