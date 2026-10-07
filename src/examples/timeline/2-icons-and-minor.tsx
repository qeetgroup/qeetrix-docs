import { KeyRoundIcon, ShieldAlertIcon, UserPlusIcon } from "@qeetrix/icons";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@qeetrix/ui";

/**
 * Three levels of emphasis: an `icon` marker for the events that matter most, a plain dot for
 * the rest, and `emphasis="minor"` for housekeeping, which shrinks the marker and mutes the
 * text so a run of it reads as one quiet block.
 */
export default function TimelineIconsAndMinor() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem>
        <TimelineIndicator
          tone="destructive"
          icon={<ShieldAlertIcon aria-hidden />}
        />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Sign-in blocked from a new country</TimelineTitle>
            <TimelineTime>Today, 08:12</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Rohan Gupta · Frankfurt, Germany · risk score 92
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem emphasis="minor">
        <TimelineIndicator />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Directory sync ran</TimelineTitle>
            <TimelineTime>07:00</TimelineTime>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem emphasis="minor">
        <TimelineIndicator />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Group “Store managers” renamed</TimelineTitle>
            <TimelineTime>Yesterday</TimelineTime>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator tone="success" icon={<KeyRoundIcon aria-hidden />} />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Passkey added</TimelineTitle>
            <TimelineTime>Yesterday</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>Meera Iyer · MacBook Pro</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator icon={<UserPlusIcon aria-hidden />} />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Kabir Rao joined</TimelineTitle>
            <TimelineTime>3 Oct</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>Invited by Aarav Mehta</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
