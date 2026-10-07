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

const events = [
  {
    title: "Payment captured",
    description: "₹2,926.40 via UPI from diya@northwind.in",
    time: "09:41",
    dateTime: "2026-10-08T09:41:00+05:30",
    tone: "success",
  },
  {
    title: "Payment authorised",
    description: "Bank approved the collect request",
    time: "09:40",
    dateTime: "2026-10-08T09:40:00+05:30",
    tone: "neutral",
  },
  {
    title: "First attempt failed",
    description: "UPI PIN entered incorrectly",
    time: "09:38",
    dateTime: "2026-10-08T09:38:00+05:30",
    tone: "destructive",
  },
  {
    title: "Payment created",
    description: "Order NW-10482 · Northwind Retail",
    time: "09:37",
    dateTime: "2026-10-08T09:37:00+05:30",
    tone: "neutral",
  },
] as const;

/**
 * Each event is a marker on the rail and its content. `tone` colours the marker as a second
 * channel only, so the title must still say what happened. `TimelineTime` with `dateTime`
 * renders a `<time>` element.
 */
export default function TimelineDefault() {
  return (
    <Timeline className="w-full max-w-md">
      {events.map((event) => (
        <TimelineItem key={event.dateTime}>
          <TimelineIndicator tone={event.tone} />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime dateTime={event.dateTime}>
                {event.time}
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{event.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
