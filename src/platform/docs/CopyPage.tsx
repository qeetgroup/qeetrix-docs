// "Copy page": the page as Markdown for an AI tool or a note, in one click, and the other ways to
// take the page with you in its menu. Rendered to HTML; copy-page.ts does the copying.
import type { IconProps } from "@qeetrix/icons";
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { FileTextIcon } from "@qeetrix/icons/icons/file-text";
import { LinkIcon } from "@qeetrix/icons/icons/link";
import { SquarePenIcon } from "@qeetrix/icons/icons/square-pen";
import { Button, IconButton } from "@qeetrix/react";
import { MenuItem, MenuPopup, MenuSeparator } from "../components/StaticMenu";

/** Copy, and the check that replaces it for a moment once copied. */
function CopyIcons(props: IconProps<"outline">) {
  return (
    <>
      <CopyIcon {...props} data-copy-icon="copy" />
      <CheckIcon {...props} data-copy-icon="done" />
    </>
  );
}

export default function CopyPage({ source }: { source: string }) {
  return (
    <>
      <span className="doc-copy" data-copy-skip>
        <Button size="sm" variant="ghost" tone="neutral" icon={CopyIcons} data-copy-page="markdown">
          Copy page
        </Button>
        <IconButton
          size="sm"
          variant="ghost"
          tone="neutral"
          icon={ChevronDownIcon}
          aria-label="More ways to take this page"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-controls="doc-copy-menu"
          tooltip={false}
          data-site-menu
        />
      </span>
      <MenuPopup id="doc-copy-menu" label="Copy page" align="end">
        <MenuItem icon={CopyIcon} data-copy-page="markdown">
          Copy as Markdown
        </MenuItem>
        <MenuItem icon={FileTextIcon} data-copy-page="view">
          View as Markdown
        </MenuItem>
        <MenuItem icon={LinkIcon} data-copy-page="link">
          Copy link
        </MenuItem>
        <MenuSeparator />
        <MenuItem icon={SquarePenIcon} data-copy-page="edit" data-href={source}>
          Edit on GitHub
        </MenuItem>
      </MenuPopup>
    </>
  );
}
