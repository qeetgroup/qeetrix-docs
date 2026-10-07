"use client";

import { type Reaction, ReactionBar } from "@qeetrix/ui";
import { useState } from "react";

/** Spoken names for the picker's default emoji, so screen readers say "thumbs up 3". */
const NAMES: Record<string, string> = {
  "👍": "thumbs up",
  "👎": "thumbs down",
  "✅": "check mark",
  "👀": "eyes",
  "🎉": "party popper",
  "🙏": "folded hands",
  "❤️": "red heart",
  "😄": "grinning face",
};

const initial: Reaction[] = [
  {
    emoji: "👍",
    label: NAMES["👍"],
    count: 3,
    reacted: true,
    users: ["You", "Diya Sharma", "Kabir Rao"],
  },
  {
    emoji: "✅",
    label: NAMES["✅"],
    count: 2,
    users: ["Meera Iyer", "Rohan Gupta"],
  },
  { emoji: "👀", label: NAMES["👀"], count: 1, users: ["Aarav Mehta"] },
];

/**
 * Click a pill to add or take back your reaction, or pick a new one from the add-reaction picker.
 * Your own reactions take the selected style, and hovering or focusing a pill shows who reacted.
 */
export default function ReactionBarDefault() {
  const [reactions, setReactions] = useState(initial);

  const toggle = (emoji: string) =>
    setReactions((current) => {
      const existing = current.find((reaction) => reaction.emoji === emoji);
      if (!existing) {
        return [
          ...current,
          {
            emoji,
            label: NAMES[emoji],
            count: 1,
            reacted: true,
            users: ["You"],
          },
        ];
      }
      return current
        .map((reaction) => {
          if (reaction !== existing) return reaction;
          const others = (reaction.users ?? []).filter(
            (user) => user !== "You",
          );
          return reaction.reacted
            ? {
                ...reaction,
                count: reaction.count - 1,
                reacted: false,
                users: others,
              }
            : {
                ...reaction,
                count: reaction.count + 1,
                reacted: true,
                users: ["You", ...others],
              };
        })
        .filter((reaction) => reaction.count > 0);
    });

  return (
    <div className="w-full max-w-md space-y-3 rounded-lg border border-border bg-card p-4">
      <p className="text-label">
        <span className="font-medium">Diya Sharma</span>{" "}
        <span className="text-muted-foreground">
          Passkey sign-in is now on for every Northwind store. Password sign-in
          turns off next month.
        </span>
      </p>
      <ReactionBar reactions={reactions} onToggle={toggle} />
    </div>
  );
}
