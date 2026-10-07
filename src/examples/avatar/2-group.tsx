import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@qeetrix/ui";

const reviewers = ["Aarav Mehta", "Diya Sharma", "Kabir Rao", "Meera Iyer"];

/**
 * `AvatarGroup` overlaps its avatars and rings each one off from the next. Name every avatar,
 * and give the overflow count a full sentence with `aria-label`.
 */
export default function AvatarGroupExample() {
  return (
    <div className="flex items-center gap-3">
      <AvatarGroup>
        {reviewers.map((name) => (
          <Avatar key={name} name={name}>
            <AvatarFallback />
          </Avatar>
        ))}
        <AvatarGroupCount aria-label="3 more reviewers">+3</AvatarGroupCount>
      </AvatarGroup>
      <span className="text-label text-muted-foreground">
        7 reviewers on this access request
      </span>
    </div>
  );
}
