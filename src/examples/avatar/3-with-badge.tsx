import { Avatar, AvatarBadge, AvatarFallback } from "@qeetrix/ui";

const team = [
  { name: "Kabir Rao", initials: "KR", status: "Online", tone: "bg-success" },
  { name: "Meera Iyer", initials: "MI", status: "Away", tone: "bg-warning" },
  {
    name: "Rohan Gupta",
    initials: "RG",
    status: "Offline",
    tone: "bg-muted-foreground",
  },
];

/**
 * `AvatarBadge` puts a mark on the avatar's bottom-end edge. Colour alone is not a status: here
 * the row says it in words, so the avatar is hidden from screen readers; with no visible text,
 * put the status inside the badge as `sr-only` text.
 */
export default function AvatarWithBadge() {
  return (
    <ul className="flex w-64 flex-col gap-3">
      {team.map((person) => (
        <li key={person.name} className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback aria-hidden>{person.initials}</AvatarFallback>
            <AvatarBadge className={person.tone} />
          </Avatar>
          <div className="min-w-0">
            <div className="text-label font-medium">{person.name}</div>
            <div className="text-caption text-muted-foreground">
              {person.status}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
