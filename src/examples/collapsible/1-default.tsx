import { ChevronDownIcon, CopyIcon } from "@qeetrix/icons";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@qeetrix/ui";

const recoveryCodes = [
  "7HC2-YT9M",
  "VBQ4-RNW8",
  "LPZ3-SXE1",
  "KDJ6-UFA0",
  "AB91-LM3N",
  "Q8RT-5VW2",
];

/**
 * A disclosure for secondary content: the recovery codes stay hidden until asked for. The
 * trigger is unstyled, so here it renders as a `Button` (`render={<Button />}`), and its
 * `data-panel-open` attribute swaps the label and turns the chevron.
 */
export default function CollapsibleDefault() {
  return (
    <Collapsible className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Recovery codes</span>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="sm" />}
          className="group/trigger"
        >
          <span className="group-data-panel-open/trigger:hidden">
            Show codes
          </span>
          <span className="hidden group-data-panel-open/trigger:inline">
            Hide codes
          </span>
          <ChevronDownIcon
            data-icon="inline-end"
            aria-hidden
            className="transition-transform group-data-panel-open/trigger:rotate-180"
          />
        </CollapsibleTrigger>
      </div>
      <p className="text-caption text-muted-foreground">
        Each code signs you in to Qeet ID once if you lose every passkey.
      </p>
      <CollapsibleContent>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface-sunken p-3">
          <ul className="grid grid-cols-2 gap-1.5 font-mono text-sm">
            {recoveryCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="self-start">
            <CopyIcon data-icon="inline-start" aria-hidden />
            Copy all
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
