"use client";

import { RefreshCwIcon } from "@qeetrix/icons";
import {
  Avatar,
  AvatarFallback,
  Button,
  DataState,
  EmptyState,
  Skeleton,
} from "@qeetrix/ui";
import { useEffect, useState } from "react";

const members = [
  {
    id: "u1",
    initials: "AM",
    name: "Aarav Mehta",
    email: "aarav@northwind.in",
  },
  { id: "u2", initials: "DS", name: "Diya Sharma", email: "diya@northwind.in" },
  { id: "u3", initials: "KR", name: "Kabir Rao", email: "kabir@northwind.in" },
];

/**
 * `loading` and `errorFallback` replace the default skeleton rows and error state: here a
 * skeleton shaped like the rows it stands in for, and an error state with a retry. Press Retry
 * to load the list.
 */
export default function DataStateCustomSlots() {
  const [status, setStatus] = useState<"error" | "loading" | "ready">("error");

  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => setStatus("ready"), 1500);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="min-h-56 w-full max-w-md rounded-lg border border-border bg-card">
      <DataState
        isLoading={status === "loading"}
        isError={status === "error"}
        loading={members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
        errorFallback={
          <EmptyState
            variant="error"
            size="sm"
            className="py-10"
            title="Couldn't load members"
            description="The directory sync with Okta timed out."
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStatus("loading")}
              >
                <RefreshCwIcon data-icon="inline-start" aria-hidden />
                Retry
              </Button>
            }
          />
        }
      >
        <ul className="divide-y divide-border">
          {members.map((member) => (
            <li key={member.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar aria-hidden>
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <span className="text-label">
                <span className="block font-medium">{member.name}</span>
                <span className="block text-caption text-muted-foreground">
                  {member.email}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </DataState>
    </div>
  );
}
