// Components › Context menu: its examples, the real ContextMenu with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { FileTextIcon } from "@qeetrix/icons/icons/file-text";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import {
  ContextMenu,
  ContextMenuTrigger,
  Inline,
  MenuContent,
  MenuItem,
  MenuSeparator,
  Stack,
  Text,
} from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Row() {
  const [did, setDid] = useState("");
  return (
    <Stack gap="sm">
      <ContextMenu>
        <ContextMenuTrigger className="qc-context-row" tabIndex={0}>
          <Text weight="semibold">Priya Sharma</Text>
          <Text tone="subtle" size="sm">
            priya@acme.in · Engineering
          </Text>
        </ContextMenuTrigger>
        <MenuContent>
          <MenuItem icon={PencilIcon} onClick={() => setDid("Edit")}>
            Edit
          </MenuItem>
          <MenuItem icon={CopyIcon} onClick={() => setDid("Copy email")}>
            Copy email
          </MenuItem>
          <MenuSeparator />
          <MenuItem icon={TrashIcon} tone="danger" onClick={() => setDid("Remove")}>
            Remove from Acme
          </MenuItem>
        </MenuContent>
      </ContextMenu>
      <Text tone="subtle" size="sm">
        {did
          ? `Chose: ${did}.`
          : "Right-click the row, long-press it, or focus it and press Shift+F10."}
      </Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "on-a-row",
    title: "On a row",
    line: "A menu at the pointer: right-click or a long press; Shift+F10 or the menu key while the row has focus.",
    code: `<ContextMenu>
  <ContextMenuTrigger tabIndex={0}>
    <Text weight="semibold">Priya Sharma</Text>
  </ContextMenuTrigger>
  <MenuContent>
    <MenuItem icon={PencilIcon}>Edit</MenuItem>
    <MenuItem icon={CopyIcon}>Copy email</MenuItem>
    <MenuSeparator />
    <MenuItem icon={TrashIcon} tone="danger">Remove from Acme</MenuItem>
  </MenuContent>
</ContextMenu>`,
    render: () => (
      <div className="qc-narrow">
        <Row />
      </div>
    ),
  },
  {
    id: "on-a-file",
    title: "On a file",
    line: "The same MenuContent and items as Menu, on any area that takes focus.",
    code: `<ContextMenu>
  <ContextMenuTrigger tabIndex={0}>{file}</ContextMenuTrigger>
  <MenuContent>
    <MenuItem icon={DownloadIcon}>Download</MenuItem>
    <MenuItem icon={PencilIcon}>Rename</MenuItem>
  </MenuContent>
</ContextMenu>`,
    render: () => (
      <ContextMenu>
        <ContextMenuTrigger className="qc-context-file" tabIndex={0}>
          <Inline gap="sm" align="center">
            <FileTextIcon size={20} aria-hidden />
            <Text>acme-idp.xml</Text>
          </Inline>
        </ContextMenuTrigger>
        <MenuContent>
          <MenuItem icon={DownloadIcon}>Download</MenuItem>
          <MenuItem icon={PencilIcon}>Rename</MenuItem>
        </MenuContent>
      </ContextMenu>
    ),
  },
];
