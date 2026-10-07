import {
  CopyIcon,
  PencilIcon,
  SettingsIcon,
  StarIcon,
  TrashIcon,
} from "@qeetrix/icons";
import { IconButton } from "@qeetrix/ui";

/** Every Button variant, square. The `aria-label` is required — TypeScript won't compile without it. */
export default function IconButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton icon={StarIcon} aria-label="Add to favourites" />
      <IconButton icon={PencilIcon} variant="secondary" aria-label="Edit" />
      <IconButton icon={CopyIcon} variant="outline" aria-label="Duplicate" />
      <IconButton icon={SettingsIcon} variant="ghost" aria-label="Settings" />
      <IconButton
        icon={TrashIcon}
        variant="destructive"
        aria-label="Delete tenant"
      />
    </div>
  );
}
