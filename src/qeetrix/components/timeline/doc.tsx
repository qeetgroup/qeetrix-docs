// Components › Timeline: its documentation, from @qeetrix/react 0.2.0 (experimental/timeline),
// the Storybook stories (data-display/timeline.stories.tsx) and the changelog. Server-safe: its
// examples and figures are rendered with the page.
import { CircleXIcon } from "@qeetrix/icons/icons/circle-x";
import { LogInIcon } from "@qeetrix/icons/icons/log-in";
import { Timeline, TimelineGroup, TimelineItem } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Fold = ({ children }: { children: ReactNode }) => (
  <div className="qc-fold-stage">{children}</div>
);

export const timeline: ComponentDoc = {
  name: "Timeline",
  slug: "timeline",
  category: "data-display",
  status: "experimental",
  since: "0.0.6",
  lede: "What happened, newest first: a user's recent activity, a payment's history. Failures take the danger colour.",
  exports: ["Timeline", "TimelineGroup", "TimelineItem"],
  renders: "<ol>",
  source: "experimental/timeline",
  story: "components/data-display/timeline.stories.tsx",
  examples,

  usage: {
    useFor: ["A user's recent activity, on their page.", "A payment's or a delivery's history."],
    notFor: [
      { text: "The full audit log, to search and filter", use: "Table" },
      { text: "Steps still to take", use: "Steps" },
    ],
    anatomyFigure: (
      <Fold>
        <Timeline aria-label="Recent activity">
          <TimelineGroup label="Today">
            <TimelineItem
              icon={LogInIcon}
              title="Signed in with a passkey"
              description="Bengaluru, India"
              time="2 min ago"
              dateTime="2026-10-29T03:58:00Z"
            />
            <TimelineItem icon={CircleXIcon} tone="danger" title="Failed sign-in" time="09:12" />
          </TimelineGroup>
        </Timeline>
      </Fold>
    ),
    anatomy: [
      { slot: "timeline-group-label", element: "<span>", note: "The group's heading: the day." },
      {
        slot: "timeline-marker",
        element: "<span>",
        note: "The icon, aria-hidden; a line joins them.",
      },
      { slot: "timeline-title", element: "<span>", note: "What happened." },
      { slot: "timeline-description", element: "<span>", note: "Where, by whom, or how." },
      { slot: "timeline-time", element: "<time>", note: "When, with dateTime for machines." },
    ],
    rules: [
      {
        title: "Newest first",
        doLine: "The latest at the top, where it's looked for.",
        dontLine: "Oldest first: today's events at the bottom of a long list.",
        doIt: (
          <Fold>
            <Timeline aria-label="Newest first">
              <TimelineItem icon={LogInIcon} title="Signed in" time="09:28" />
              <TimelineItem icon={CircleXIcon} tone="danger" title="Failed sign-in" time="09:12" />
            </Timeline>
          </Fold>
        ),
        dontIt: (
          <Fold>
            <Timeline aria-label="Oldest first">
              <TimelineItem icon={CircleXIcon} tone="danger" title="Failed sign-in" time="09:12" />
              <TimelineItem icon={LogInIcon} title="Signed in" time="09:28" />
            </Timeline>
          </Fold>
        ),
      },
      {
        title: "Say what happened",
        doLine: "A past-tense title a person reads: Signed in with a passkey.",
        dontLine: "The event's code: nobody reads auth.login.success.",
        doIt: (
          <Fold>
            <Timeline aria-label="In words">
              <TimelineItem icon={LogInIcon} title="Signed in with a passkey" time="09:28" />
            </Timeline>
          </Fold>
        ),
        dontIt: (
          <Fold>
            <Timeline aria-label="As a code">
              <TimelineItem icon={LogInIcon} title="auth.login.success" time="09:28" />
            </Timeline>
          </Fold>
        ),
      },
    ],
    content: [
      "Titles in the past tense, sentence case: Role changed to Admin.",
      "Descriptions say where, by whom or how: By Rahul Verma.",
      "Times as people read them; dateTime for the exact instant.",
    ],
  },

  api: {
    props: [
      {
        name: "variant",
        type: '"default" | "compact"',
        default: '"default"',
        note: "An icon per event, joined by a line; or a dot, for a side panel.",
      },
      {
        name: "TimelineGroup: label",
        type: "ReactNode",
        default: "required",
        note: 'The heading: "Today".',
      },
      {
        name: "TimelineItem: title",
        type: "ReactNode",
        default: "required",
        note: "What happened.",
      },
      {
        name: "TimelineItem: description",
        type: "ReactNode",
        default: "—",
        note: "Where, by whom, or how.",
      },
      {
        name: "TimelineItem: time · dateTime",
        type: "ReactNode · string",
        default: "—",
        note: "When, as shown; with dateTime, it's a <time> element.",
      },
      {
        name: "TimelineItem: icon",
        type: "QeetrixIcon",
        default: "—",
        note: "16px, for the kind of event.",
      },
      {
        name: "TimelineItem: tone",
        type: '"neutral" | "brand" | "info" | "success" | "warning" | "danger"',
        default: '"neutral"',
        note: "Colours the icon or dot; danger turns the title danger too.",
      },
    ],
    parts: [
      { slot: "timeline", element: "<ol>", note: "data-variant." },
      { slot: "timeline-group", element: "<li>", note: "A heading and its events." },
      { slot: "timeline-events", element: "<ol>", note: "The group's events." },
      { slot: "timeline-item", element: "<li>", note: "One event: data-tone." },
      { slot: "timeline-marker", element: "<span>", note: "The icon or dot, aria-hidden." },
      { slot: "timeline-time", element: "<time>", note: "Or a <span>, without dateTime." },
    ],
    recipes: [
      {
        title: "Grouped by day",
        line: "Group events under the day they happened, in the reader's time zone, newest first.",
        file: "recent-activity.tsx",
        code: `{days.map((day) => (
  <TimelineGroup key={day.key} label={day.label}>
    {day.events.map((event) => (
      <TimelineItem key={event.id} title={event.title} time={event.time} dateTime={event.at} />
    ))}
  </TimelineGroup>
))}`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "Order",
        result: "Ordered lists: each group's length, and each event's position, are read.",
      },
      { check: "Time", result: "A <time> with dateTime: the exact instant, whatever is shown." },
      { check: "Tone", result: "The icon is aria-hidden: say a failure in the title." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.1.0",
      items: [
        "Tones brand and info, matching Badge.",
        "The compact dot sits on the title's line, in the event's tone.",
      ],
    },
    {
      version: "0.0.6",
      items: [
        "Timeline, TimelineGroup and TimelineItem: what happened, newest first, grouped by day: an icon, the event, where or by whom, and when (<time> with dateTime); failures in danger; a compact dots variant. Server-safe.",
      ],
    },
  ],

  related: [
    { name: "Table", when: "The full log" },
    { name: "Card", when: "Its usual home" },
    { name: "Badge", when: "A status" },
  ],
};
