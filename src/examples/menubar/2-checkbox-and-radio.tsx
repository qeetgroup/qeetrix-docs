"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@qeetrix/ui";
import { useState } from "react";

/**
 * Settings live in `MenubarCheckboxItem` and `MenubarRadioItem`, controlled like any checkbox or
 * radio group. They keep the menu open when chosen, so several can be changed in one visit.
 */
export default function MenubarCheckboxAndRadio() {
  const [wrapLines, setWrapLines] = useState(true);
  const [timestamps, setTimestamps] = useState(true);
  const [traceIds, setTraceIds] = useState(false);
  const [timeZone, setTimeZone] = useState("ist");

  return (
    <Menubar aria-label="Log explorer">
      <MenubarMenu>
        <MenubarTrigger>Query</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Run query</MenubarItem>
          <MenubarItem>Save query</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={wrapLines}
            onCheckedChange={setWrapLines}
          >
            Wrap long lines
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={timestamps}
            onCheckedChange={setTimestamps}
          >
            Show timestamps
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={traceIds} onCheckedChange={setTraceIds}>
            Show trace IDs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={timeZone} onValueChange={setTimeZone}>
            <MenubarLabel>Time zone</MenubarLabel>
            <MenubarRadioItem value="ist">India (UTC+05:30)</MenubarRadioItem>
            <MenubarRadioItem value="utc">UTC</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
