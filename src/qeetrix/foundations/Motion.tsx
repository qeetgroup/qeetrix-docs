// Foundations › Motion: quick, productive motion — durations, easings, enter and exit, and springs.
// Ported from qeetrix-story (stories/foundations/motion.stories.tsx); each story is a section. The
// live demos run in the browser (MotionDemos.tsx); this module gives them their tokens.
import { DURATION, EASING, SPRING } from "@qeetrix/tokens";
import light from "@qeetrix/tokens/dtcg/light.tokens.json";
import { format, ordered, TokenTable, token, tokens } from "./data";
import { CopyToken, type Section, Specimen } from "./kit";
import type { MotionItem, MotionPhase } from "./MotionDemos";

/* ── Shared ───────────────────────────────────────────────────────────────── */

const DURATIONS = tokens("motion.duration").sort(
  (a, b) =>
    (DURATION[a.name as keyof typeof DURATION] ?? 0) -
    (DURATION[b.name as keyof typeof DURATION] ?? 0),
);

/** Reading order: the everyday curve, the enter and exit pair, then the rest. */
const EASINGS = ordered(tokens("motion.easing"), [
  "standard",
  "enter",
  "exit",
  "emphasized",
  "linear",
]);

/** A token's `$description` in the package's DTCG document: what it is for. */
function usage(path: string): string | undefined {
  let node: unknown = light;
  for (const key of path.split(".")) node = (node as Record<string, unknown> | undefined)?.[key];
  return (node as { $description?: string } | undefined)?.$description;
}

/** The demos' tokens (MotionDemos.tsx), resolved here so the browser gets only what it shows. */
export const durationItems: MotionItem[] = DURATIONS.map((item) => ({
  path: item.path,
  name: item.name,
  cssVar: item.cssVar,
  meta: `${format(item.type, item.light)} · DURATION.${item.name}`,
  note: usage(item.path),
}));

/** Every duration within the 400ms ceiling, checked against the tokens. */
const CEILING = 400;
const LONGEST = Math.max(
  ...DURATIONS.map((item) => DURATION[item.name as keyof typeof DURATION] ?? 0),
);
export const durationCheck = {
  pass: LONGEST <= CEILING,
  text:
    LONGEST <= CEILING
      ? `Every duration is ${CEILING}ms or less; the longest is ${LONGEST}ms`
      : `A duration runs ${LONGEST}ms, past the ${CEILING}ms ceiling`,
};

export const easingItems: MotionItem[] = EASINGS.map((item) => ({
  path: item.path,
  name: item.name,
  cssVar: item.cssVar,
  meta: EASING[item.name as keyof typeof EASING],
  note: usage(item.path),
  points: item.light as number[],
}));

const Duration: Section = {
  id: "duration",
  name: "Duration",
  parameters: {
    docs: {
      description: {
        story: "How long a change takes, scaled to how much moves. Play runs every step at once.",
      },
    },
  },
  // Rendered by the page as an island (the "duration" slot).
  render: () => null,
};

/* ── Easing ───────────────────────────────────────────────────────────────── */

const Easing: Section = {
  id: "easing",
  name: "Easing",
  parameters: {
    docs: {
      description: {
        story:
          "How a change speeds up and slows down. All share one duration, so only the shape differs.",
      },
    },
  },
  // Rendered by the page as an island (the "easing" slot).
  render: () => null,
};

/* ── Enter and exit ───────────────────────────────────────────────────────── */

export const phases: MotionPhase[] = [
  {
    phase: "enter",
    label: "Enter",
    duration: {
      cssVar: token("motion.duration.normal").cssVar,
      display: format("duration", token("motion.duration.normal").light),
    },
    easing: { cssVar: token("motion.easing.enter").cssVar },
    note: "Fades in and rises 4px, slowing to rest.",
  },
  {
    phase: "exit",
    label: "Exit",
    duration: {
      cssVar: token("motion.duration.fast").cssVar,
      display: format("duration", token("motion.duration.fast").light),
    },
    easing: { cssVar: token("motion.easing.exit").cssVar },
    note: "Fades out and drops 4px, speeding away.",
  },
];

const EnterAndExit: Section = {
  id: "enter-and-exit",
  name: "Enter and exit",
  parameters: {
    docs: {
      description: {
        story:
          "A toast arrives at normal and decelerates; it leaves one step faster and accelerates.",
      },
    },
  },
  // Rendered by the page as an island (the "enter-and-exit" slot).
  render: () => null,
};

/* ── Which to use ─────────────────────────────────────────────────────────── */

/** Everyday changes, each with the pair the token descriptions give it. */
const RECIPES: Array<{ change: string; duration?: string; easing: string }> = [
  { change: "Hover and press feedback", duration: "fast", easing: "standard" },
  { change: "A size, a position or a colour changes", duration: "normal", easing: "standard" },
  { change: "A tooltip, menu or toggle opens", duration: "normal", easing: "enter" },
  { change: "It closes", duration: "fast", easing: "exit" },
  { change: "A dialog, drawer or sheet opens", duration: "slow", easing: "emphasized" },
  { change: "A full-screen transition", duration: "slower", easing: "emphasized" },
  { change: "Progress and other continuous motion", easing: "linear" },
];

const durationOf = (name: string) => token(`motion.duration.${name}`);
const easingOf = (name: string) => token(`motion.easing.${name}`);

const WhichToUse: Section = {
  id: "which-to-use",
  name: "Which to use",
  parameters: {
    docs: {
      description: {
        story:
          "Everyday changes and the duration and curve each takes. Closing is always a step faster than opening.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-ftable-wrap">
        <table className="qf-ftable qf-recipes">
          <caption className="qf-sr-only">The duration and easing for everyday changes</caption>
          <thead>
            <tr>
              <th scope="col">Change</th>
              <th scope="col">Duration</th>
              <th scope="col">Easing</th>
            </tr>
          </thead>
          <tbody>
            {RECIPES.map(({ change, duration, easing }) => (
              <tr key={change}>
                <th scope="row">{change}</th>
                <td>
                  {duration ? (
                    <span className="qf-recipe">
                      <CopyToken value={durationOf(duration).cssVar} />
                      <span>{format("duration", durationOf(duration).light)}</span>
                    </span>
                  ) : (
                    <span className="qf-recipe-note">Set by the work</span>
                  )}
                </td>
                <td>
                  <span className="qf-recipe">
                    <CopyToken value={easingOf(easing).cssVar} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Specimen>
  ),
};

/* ── Springs ──────────────────────────────────────────────────────────────── */

/** The peak overshoot of a mass-1 spring: none when it is critically damped or more. */
function overshoot(dampingRatio: number): string {
  if (dampingRatio >= 1) return "None";
  const peak = Math.exp((-dampingRatio * Math.PI) / Math.sqrt(1 - dampingRatio ** 2));
  return `${(peak * 100).toFixed(2)}%`;
}

const Springs: Section = {
  id: "springs",
  name: "Springs",
  parameters: {
    docs: {
      description: { story: "For native platforms; the web uses durations and curves." },
    },
  },
  render: () => (
    <Specimen>
      <TokenTable
        caption="Springs"
        columns={["Export", "Stiffness", "Damping ratio", "Overshoot", "SwiftUI response"]}
        rows={Object.entries(SPRING).map(([name, spring]) => ({
          token: `SPRING.${name}`,
          cells: [
            String(spring.stiffness),
            String(spring.dampingRatio),
            overshoot(spring.dampingRatio),
            `${((2 * Math.PI) / Math.sqrt(spring.stiffness)).toFixed(3)}s`,
          ],
        }))}
      />
    </Specimen>
  ),
};

export const sections: Section[] = [Duration, Easing, EnterAndExit, WhichToUse, Springs];
