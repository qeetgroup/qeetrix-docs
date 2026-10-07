import { Progress } from "@qeetrix/ui";

/**
 * Pass `value={null}` while the total is unknown. A segment sweeps along the track; under
 * reduced motion the track shows a still hatched fill, so it never looks complete.
 */
export default function ProgressIndeterminate() {
  return (
    <Progress label="Syncing members from Okta" value={null} className="w-80" />
  );
}
