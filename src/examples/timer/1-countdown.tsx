import { Timer } from "@qeetrix/ui";

/** A countdown with Start/Pause and Reset — 30 seconds, as a TOTP code lasts. */
export default function TimerCountdown() {
  return <Timer mode="countdown" initialSeconds={30} />;
}
