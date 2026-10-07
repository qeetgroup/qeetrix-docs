import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  Undo2Icon,
} from "@qeetrix/icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarSpacer,
} from "@qeetrix/ui";

/** Icon-only items use `size="icon"` and an `aria-label`; `ToolbarLink` is a link at the toolbar's height. */
export default function ToolbarEditor() {
  return (
    <Toolbar aria-label="Formatting" className="w-full max-w-xl">
      <ToolbarGroup>
        <ToolbarButton size="icon" aria-label="Undo">
          <Undo2Icon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Redo">
          <Redo2Icon aria-hidden />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton size="icon" aria-label="Bold">
          <BoldIcon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Italic">
          <ItalicIcon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Inline code">
          <CodeIcon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Link">
          <LinkIcon aria-hidden />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton size="icon" aria-label="Bulleted list">
          <ListIcon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Numbered list">
          <ListOrderedIcon aria-hidden />
        </ToolbarButton>
        <ToolbarButton size="icon" aria-label="Quote">
          <QuoteIcon aria-hidden />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarLink href="/docs/components/rich-text-editor">
        Markdown help
      </ToolbarLink>
    </Toolbar>
  );
}
