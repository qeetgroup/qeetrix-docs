import { BoldIcon, ItalicIcon, LinkIcon } from "@qeetrix/icons";
import {
  Kbd,
  KbdGroup,
  Toolbar,
  ToolbarButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@qeetrix/ui";

const actions = [
  { label: "Bold", key: "B", icon: BoldIcon },
  { label: "Italic", key: "I", icon: ItalicIcon },
  { label: "Insert link", key: "K", icon: LinkIcon },
];

/**
 * `TooltipProvider` gives a group one shared delay: once a tooltip is open its neighbours open
 * instantly, so sweeping along a toolbar doesn't wait at every button. A `Kbd` in the content
 * shows the control's shortcut.
 */
export default function TooltipGroup() {
  return (
    <TooltipProvider>
      <Toolbar aria-label="Email template formatting">
        {actions.map(({ label, key, icon: Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={<ToolbarButton size="icon" aria-label={label} />}
            >
              <Icon aria-hidden />
            </TooltipTrigger>
            <TooltipContent>
              {label}
              <KbdGroup>
                <Kbd label="Command">⌘</Kbd>
                <Kbd>{key}</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        ))}
      </Toolbar>
    </TooltipProvider>
  );
}
