// Foundations › Motion's live demos, in the browser: Duration and Easing replay on Play, and the
// toast enters and exits. Islands; the server passes each its tokens (Motion.tsx), so the token
// data stays on the server. Ported from qeetrix-story (motion.stories.tsx).
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { InfoIcon } from "@qeetrix/icons/icons/info";
import { PlayIcon } from "@qeetrix/icons/icons/play";
import { TriangleAlertIcon } from "@qeetrix/icons/icons/triangle-alert";
import { XIcon } from "@qeetrix/icons/icons/x";
import { Badge, Button, IconButton, Switch } from "@qeetrix/react";
import { DURATION } from "@qeetrix/tokens";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CopyToken, Group, Specimen, SpecimenRow, SpecimenRows } from "./kit";

/** A motion token as a demo needs it: its variable, the line under it, and what it's for. */
export interface MotionItem {
  path: string;
  name: string;
  cssVar: string;
  /** `200ms · DURATION.normal`, or an easing's cubic-bezier(). */
  meta: string;
  note?: string;
  /** An easing's control points. */
  points?: number[];
}

/** One phase of the toast's motion, with its tokens. */
export interface MotionPhase {
  phase: "enter" | "exit";
  label: string;
  duration: { cssVar: string; display: string };
  easing: { cssVar: string };
  note: string;
}

/** How many times slower Slow motion plays. A multiple of the token, so reduced motion still wins. */
const SLOW = 4;

/** The custom properties a demo's CSS reads (`--qx-*` is left to the package's own tokens). */
const demoVars = (vars: Record<string, string | number>) =>
  Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [`--motion-${key}`, value]),
  ) as CSSProperties;

const REDUCED = "(prefers-reduced-motion: reduce)";

/** The page's preview (motion-preview.ts) marks the demos' scope when it shows reduced motion. */
const SCOPE = "[data-qf-motion]";

/** Reduced motion: the system asks for it, or the page's preview shows it. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(REDUCED);
      list.addEventListener("change", notify);
      const scope = document.querySelector(SCOPE);
      const observer = new MutationObserver(notify);
      if (scope)
        observer.observe(scope, { attributes: true, attributeFilter: ["data-qf-reduced"] });
      return () => {
        list.removeEventListener("change", notify);
        observer.disconnect();
      };
    },
    () =>
      window.matchMedia(REDUCED).matches ||
      !!document.querySelector(SCOPE)?.hasAttribute("data-qf-reduced"),
    () => false,
  );
}

/**
 * The toolbar each demo puts in its group's head: Play replays it, Slow motion stretches it, and a
 * badge says why nothing moves while the system asks for reduced motion.
 */
function Controls({
  onPlay,
  slow,
  onSlowChange,
}: {
  onPlay: () => void;
  slow: boolean;
  onSlowChange: (slow: boolean) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="qf-motion-controls">
      {reduced && (
        <Badge tone="info" size="sm" icon={InfoIcon}>
          Reduced motion: 0ms
        </Badge>
      )}
      <Switch label="Slow motion" checked={slow} onCheckedChange={(on) => onSlowChange(on)} />
      <Button variant="soft" size="sm" icon={PlayIcon} onClick={onPlay}>
        Play
      </Button>
    </span>
  );
}

/**
 * A dot that crosses its rail in one duration, with a trail filling in behind it. A new `run`
 * remounts the moving parts, which restarts their animation from the start.
 */
function Track({ run, cssVar, slow }: { run: number; cssVar: string; slow: boolean }) {
  return (
    <span
      className="qf-motion-track"
      data-run={run > 0 ? "" : undefined}
      style={demoVars({ duration: `calc(var(${cssVar}) * ${slow ? SLOW : 1})` })}
      aria-hidden="true"
    >
      <span key={`trail-${run}`} className="qf-motion-trail" />
      <span key={`dot-${run}`} className="qf-motion-dot" />
    </span>
  );
}

/** Duration › Scale: every duration as a dot crossing its rail; Play runs them all at once. */
export function DurationDemo({
  items,
  check,
}: {
  items: MotionItem[];
  check?: { pass: boolean; text: string };
}) {
  const [run, setRun] = useState(0);
  const [slow, setSlow] = useState(false);
  return (
    <Specimen>
      {check && (
        <p className="qf-check" data-fail={check.pass ? undefined : ""}>
          <CheckIcon size={16} aria-hidden />
          {check.text}
        </p>
      )}
      <Group
        label="Scale"
        aside={
          <Controls
            onPlay={() => setRun((count) => count + 1)}
            slow={slow}
            onSlowChange={setSlow}
          />
        }
      >
        <SpecimenRows>
          {items.map((item) => (
            <SpecimenRow key={item.path} token={item.cssVar} meta={item.meta}>
              <span className="qf-motion-lane">
                <Track run={run} cssVar={item.cssVar} slow={slow} />
                <span className="qf-motion-note">
                  {item.note ?? "No motion: the change is immediate."}
                </span>
              </span>
            </SpecimenRow>
          ))}
        </SpecimenRows>
      </Group>
    </Specimen>
  );
}

/**
 * The curve on a 100 × 100 plot, time running right and progress up, with its control handles. On
 * Play a dot traces it: its group moves through time linearly while the dot rises on the curve
 * itself, so together they draw the shape. The rail on the right is the progress alone, the way the
 * property changes on screen.
 */
function CurvePlot({ points, run }: { points: number[]; run: number }) {
  const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = points;
  const p1 = [x1 * 100, 100 - y1 * 100] as const;
  const p2 = [x2 * 100, 100 - y2 * 100] as const;
  const linear = x1 === y1 && x2 === y2;
  return (
    <svg
      className="qf-motion-plot"
      viewBox="-6 -6 136 112"
      data-run={run > 0 ? "" : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <g className="qf-motion-plot-grid">
        <rect x="0" y="0" width="100" height="100" />
        {[25, 50, 75].map((at) => (
          <g key={at}>
            <line x1={at} y1="0" x2={at} y2="100" />
            <line x1="0" y1={at} x2="100" y2={at} />
          </g>
        ))}
      </g>
      <line className="qf-motion-plot-diagonal" x1="0" y1="100" x2="100" y2="0" />
      {!linear && (
        <g className="qf-motion-plot-handles">
          <line x1="0" y1="100" x2={p1[0]} y2={p1[1]} />
          <line x1="100" y1="0" x2={p2[0]} y2={p2[1]} />
          <circle cx={p1[0]} cy={p1[1]} r="2.25" />
          <circle cx={p2[0]} cy={p2[1]} r="2.25" />
        </g>
      )}
      <path
        className="qf-motion-plot-curve"
        d={`M0,100 C${p1[0]},${p1[1]} ${p2[0]},${p2[1]} 100,0`}
      />
      <line className="qf-motion-plot-rail" x1="120" y1="0" x2="120" y2="100" />
      <g key={`time-${run}`} className="qf-motion-plot-time">
        <rect className="qf-motion-plot-dot" x="-3.5" y="96.5" width="7" height="7" rx="1" />
      </g>
      <rect
        key={`rail-${run}`}
        className="qf-motion-plot-dot"
        x="116.5"
        y="96.5"
        width="7"
        height="7"
        rx="1"
      />
    </svg>
  );
}

function CurveCard({ item, run }: { item: MotionItem; run: number }) {
  const note = item.note;
  return (
    <div className="qf-motion-curve" style={demoVars({ easing: `var(${item.cssVar})` })}>
      <div className="qf-motion-plot-frame">
        <CurvePlot points={item.points ?? []} run={run} />
      </div>
      <div className="qf-motion-curve-meta">
        <span className="qf-motion-curve-name">{item.name}</span>
        <CopyToken value={item.cssVar} />
        <code className="qf-motion-curve-value">{item.meta}</code>
        {note && <span className="qf-motion-note">{note}</span>}
      </div>
    </div>
  );
}

/** Easing › Curves: each curve plotted, a dot tracing it on Play. */
export function EasingDemo({ items }: { items: MotionItem[] }) {
  const [run, setRun] = useState(0);
  const [slow, setSlow] = useState(false);
  return (
    <Specimen>
      <Group
        label="Curves"
        aside={
          <Controls
            onPlay={() => setRun((count) => count + 1)}
            slow={slow}
            onSlowChange={setSlow}
          />
        }
      >
        <div className="qf-motion-curves" style={demoVars({ slow: slow ? SLOW : 1 })}>
          {items.map((item) => (
            <CurveCard key={item.path} item={item} run={run} />
          ))}
        </div>
      </Group>
    </Specimen>
  );
}

/** How long the toast stays away, after its exit, before Play brings it back. */
const HOLD = 700;

/**
 * A toast drawn with @qeetrix/react's own toast styling, so what moves is the component's motion,
 * not a copy of it. Base UI marks a leaving toast `data-ending-style`: the demo sets the same
 * attribute to dismiss it, and removes it to run the toast's enter transition.
 */
/** Enter and exit: a toast leaves fast and comes back at normal, on Play. */
export function EnterExitDemo({ phases }: { phases: MotionPhase[] }) {
  const [open, setOpen] = useState(true);
  const [phase, setPhase] = useState<MotionPhase["phase"] | null>(null);
  const [slow, setSlow] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enter = () => {
    setOpen(true);
    setPhase("enter");
  };
  const exit = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
    setPhase("exit");
  };
  const play = () => {
    window.clearTimeout(timer.current);
    if (!open) return enter();
    exit();
    timer.current = window.setTimeout(enter, DURATION.fast * (slow ? SLOW : 1) + HOLD);
  };

  return (
    <Specimen>
      <Group label="Toast" aside={<Controls onPlay={play} slow={slow} onSlowChange={setSlow} />}>
        <div className="qf-motion-enter">
          <div
            className="qf-motion-stage"
            data-slow={slow ? "" : undefined}
            style={demoVars({ slow: SLOW })}
          >
            <span className="qf-motion-stage-page" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <div
              className="qx-toast qf-motion-toast"
              data-slot="toast"
              data-tone="warning"
              data-ending-style={open ? undefined : ""}
              inert={!open}
            >
              <TriangleAlertIcon
                shape="sharp"
                size={18}
                aria-hidden
                className="qx-toast-icon"
                data-slot="toast-icon"
              />
              <div className="qx-toast-content" data-slot="toast-content">
                <div className="qx-toast-title" data-slot="toast-title">
                  Session expires in 5 minutes
                </div>
                <div className="qx-toast-description" data-slot="toast-description">
                  Save your changes to keep them.
                </div>
              </div>
              <IconButton
                icon={XIcon}
                aria-label="Dismiss notification"
                size="sm"
                tone="neutral"
                tooltip={false}
                onClick={exit}
              />
            </div>
          </div>
          <div className="qf-motion-phases">
            {phases.map((item) => (
              <div
                key={item.phase}
                className="qf-motion-phase"
                data-active={phase === item.phase ? "" : undefined}
              >
                <span className="qf-motion-phase-head">
                  <span className="qf-specimen-label">{item.label}</span>
                  <code>{item.duration.display}</code>
                </span>
                <CopyToken value={item.duration.cssVar} />
                <CopyToken value={item.easing.cssVar} />
                <span className="qf-motion-note">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </Group>
    </Specimen>
  );
}
