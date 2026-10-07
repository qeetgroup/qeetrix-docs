import { Timer } from "@qeetrix/ui";

/** `mode="stopwatch"` counts up; `format="hh:mm:ss"` always shows the hours. */
export default function TimerStopwatch() {
  return <Timer mode="stopwatch" format="hh:mm:ss" />;
}
