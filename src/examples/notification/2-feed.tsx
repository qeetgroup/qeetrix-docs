"use client";

import { Button, Notification, TimeSince } from "@qeetrix/ui";
import { useState } from "react";

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000);

type Event = {
  id: string;
  variant: "info" | "success" | "warning" | "error";
  title: string;
  description: string;
  at: Date;
  unread: boolean;
};

const events: Event[] = [
  {
    id: "n1",
    variant: "warning",
    title: "New sign-in from Pune",
    description: "Diya Sharma · Chrome on Windows · unrecognised device",
    at: ago(4),
    unread: true,
  },
  {
    id: "n2",
    variant: "success",
    title: "Invoice QP-INV-2026-00412 paid",
    description: "Acme India paid ₹1,41,600 by UPI.",
    at: ago(38),
    unread: true,
  },
  {
    id: "n3",
    variant: "info",
    title: "September payroll approved",
    description: "Meera Iyer approved the run for 128 employees.",
    at: ago(5 * 60),
    unread: false,
  },
  {
    id: "n4",
    variant: "error",
    title: "Webhook delivery failed",
    description: "payments.northwind.in returned 503 for 12 events.",
    at: ago(26 * 60),
    unread: false,
  },
];

/**
 * `size="sm"` cards make a feed. The card is stateless, so you own read and dismissed state:
 * `unread` adds a dot and a heavier title, `onClose` a dismiss button. Each card is a live region
 * by default; in a feed, override `role` and `aria-live` so they don't all announce.
 */
export default function NotificationFeed() {
  const [items, setItems] = useState(() => events);
  const unreadCount = items.filter((item) => item.unread).length;

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex min-h-8 items-center justify-between">
        <span className="text-label font-medium">
          Activity{unreadCount > 0 ? ` · ${unreadCount} unread` : ""}
        </span>
        {unreadCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setItems((current) =>
                current.map((item) => ({ ...item, unread: false })),
              )
            }
          >
            Mark all read
          </Button>
        ) : null}
      </div>
      {items.map((item) => (
        <Notification
          key={item.id}
          role="article"
          aria-live="off"
          size="sm"
          variant={item.variant}
          unread={item.unread}
          title={item.title}
          description={item.description}
          time={<TimeSince value={item.at} />}
          onClose={() =>
            setItems((current) =>
              current.filter((entry) => entry.id !== item.id),
            )
          }
        />
      ))}
      {items.length === 0 ? (
        <Button
          variant="outline"
          size="sm"
          className="self-center"
          onClick={() => setItems(events)}
        >
          Restore notifications
        </Button>
      ) : null}
    </div>
  );
}
