// Components › Icon button: its examples, the real IconButton with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), as an icon button's tooltip needs React:
// so nothing here reads token data.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { EllipsisIcon } from "@qeetrix/icons/icons/ellipsis";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { RefreshCwIcon } from "@qeetrix/icons/icons/refresh-cw";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { XIcon } from "@qeetrix/icons/icons/x";
import { IconButton, Inline, Stack, Text } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "variants",
    title: "Variants and tones",
    line: "Ghost by default. Soft or solid only for the one action a region leads with.",
    code: `<Stack gap="md">
  <Inline gap="sm">
    <IconButton icon={PencilIcon} aria-label="Edit" />
    <IconButton variant="soft" icon={PencilIcon} aria-label="Edit" />
    <IconButton variant="solid" icon={PencilIcon} aria-label="Edit" />
  </Inline>
  <Inline gap="sm">
    <IconButton tone="danger" icon={TrashIcon} aria-label="Remove" />
    <IconButton tone="danger" variant="soft" icon={TrashIcon} aria-label="Revoke" />
    <IconButton tone="danger" variant="solid" icon={TrashIcon} aria-label="Delete" />
  </Inline>
  <Inline gap="sm">
    <IconButton tone="neutral" icon={SettingsIcon} aria-label="Settings" />
    <IconButton tone="neutral" icon={EllipsisIcon} aria-label="More actions" />
    <IconButton tone="neutral" icon={XIcon} aria-label="Close" />
  </Inline>
</Stack>`,
    render: () => (
      <Stack gap="md">
        <Inline gap="sm">
          <IconButton icon={PencilIcon} aria-label="Edit" />
          <IconButton variant="soft" icon={PencilIcon} aria-label="Edit" />
          <IconButton variant="solid" icon={PencilIcon} aria-label="Edit" />
        </Inline>
        <Inline gap="sm">
          <IconButton tone="danger" icon={TrashIcon} aria-label="Remove" />
          <IconButton tone="danger" variant="soft" icon={TrashIcon} aria-label="Revoke" />
          <IconButton tone="danger" variant="solid" icon={TrashIcon} aria-label="Delete" />
        </Inline>
        <Inline gap="sm">
          <IconButton tone="neutral" icon={SettingsIcon} aria-label="Settings" />
          <IconButton tone="neutral" icon={EllipsisIcon} aria-label="More actions" />
          <IconButton tone="neutral" icon={XIcon} aria-label="Close" />
        </Inline>
      </Stack>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "Square, at a control's height in the region's density.",
    code: `<Inline gap="sm" align="center">
  <IconButton size="sm" icon={SettingsIcon} aria-label="Settings, small" />
  <IconButton size="md" icon={SettingsIcon} aria-label="Settings, medium" />
  <IconButton size="lg" icon={SettingsIcon} aria-label="Settings, large" />
</Inline>`,
    render: () => (
      <Inline gap="sm" align="center">
        <IconButton size="sm" icon={SettingsIcon} aria-label="Settings, small" />
        <IconButton size="md" icon={SettingsIcon} aria-label="Settings, medium" />
        <IconButton size="lg" icon={SettingsIcon} aria-label="Settings, large" />
      </Inline>
    ),
  },
  {
    id: "tooltips",
    title: "Tooltips",
    line: "Its name shows on hover and focus. Replace the text, move it, or hide it beside visible words.",
    code: `<Inline gap="md" align="center">
  <IconButton icon={DownloadIcon} aria-label="Download invoice" tooltip="Download INV-2026-0042 (PDF)" />
  <IconButton icon={RefreshCwIcon} aria-label="Refresh sessions" tooltipSide="bottom" />
  <Inline gap="xs" align="center">
    <Text mono>usr_01J8K2M4PQ</Text>
    <IconButton icon={CopyIcon} aria-label="Copy user ID" tooltip={false} />
  </Inline>
</Inline>`,
    render: () => (
      <Inline gap="md" align="center">
        <IconButton
          icon={DownloadIcon}
          aria-label="Download invoice"
          tooltip="Download INV-2026-0042 (PDF)"
        />
        <IconButton icon={RefreshCwIcon} aria-label="Refresh sessions" tooltipSide="bottom" />
        <Inline gap="xs" align="center">
          <Text mono>usr_01J8K2M4PQ</Text>
          <IconButton icon={CopyIcon} aria-label="Copy user ID" tooltip={false} />
        </Inline>
      </Inline>
    ),
  },
  {
    id: "loading-and-disabled",
    title: "Loading and disabled",
    line: "Loading swaps the icon for a spinner. Disabled stays focusable, so its tooltip can say why.",
    code: `<Inline gap="sm">
  <IconButton icon={RefreshCwIcon} aria-label="Refresh sessions" loading />
  <IconButton icon={TrashIcon} aria-label="Delete workspace: only an owner can" disabled />
</Inline>`,
    render: () => (
      <Inline gap="sm">
        <IconButton icon={RefreshCwIcon} aria-label="Refresh sessions" loading />
        <IconButton icon={TrashIcon} aria-label="Delete workspace: only an owner can" disabled />
      </Inline>
    ),
  },
  {
    id: "in-a-row",
    title: "In a row",
    line: "A row's own actions: neutral ghosts, the destructive one last.",
    code: `<Inline gap="md" align="center" justify="between">
  <Text>Priya Sharma</Text>
  <Inline gap="xs">
    <IconButton tone="neutral" icon={PencilIcon} aria-label="Edit Priya Sharma" />
    <IconButton tone="neutral" icon={CopyIcon} aria-label="Copy Priya's email" />
    <IconButton tone="danger" icon={TrashIcon} aria-label="Remove Priya Sharma" />
  </Inline>
</Inline>`,
    render: () => (
      <div className="qc-row">
        <Inline gap="md" align="center" justify="between">
          <Text>Priya Sharma</Text>
          <Inline gap="xs">
            <IconButton tone="neutral" icon={PencilIcon} aria-label="Edit Priya Sharma" />
            <IconButton tone="neutral" icon={CopyIcon} aria-label="Copy Priya's email" />
            <IconButton tone="danger" icon={TrashIcon} aria-label="Remove Priya Sharma" />
          </Inline>
        </Inline>
      </div>
    ),
  },
];
