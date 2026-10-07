import {
  ArrowUpDownIcon,
  DownloadIcon,
  ListFilterIcon,
  UserPlusIcon,
} from "@qeetrix/icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
} from "@qeetrix/ui";

/**
 * The header of a table: filters at the start, actions at the end. `ToolbarSpacer` pushes what
 * follows it to the end; the whole toolbar is one tab stop, and the arrow keys move along it.
 *
 * @layout wide
 */
export default function ToolbarDefault() {
  return (
    <Toolbar aria-label="Members">
      <ToolbarGroup>
        <ToolbarButton>
          <ListFilterIcon data-icon="inline-start" aria-hidden />
          Filter
        </ToolbarButton>
        <ToolbarButton>
          <ArrowUpDownIcon data-icon="inline-start" aria-hidden />
          Sort
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarButton>
        <DownloadIcon data-icon="inline-start" aria-hidden />
        Export
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton variant="default">
        <UserPlusIcon data-icon="inline-start" aria-hidden />
        Invite member
      </ToolbarButton>
    </Toolbar>
  );
}
