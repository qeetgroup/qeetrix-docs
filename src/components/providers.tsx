"use client";

import { DirectionProvider, ThemeProvider, TooltipProvider } from "@qeetrix/ui";
import * as React from "react";

/**
 * Client providers for ui.qeet.in — dogfooding the system's own providers:
 * ThemeProvider (light/dark via `.dark`), DirectionProvider (RTL-ready),
 * TooltipProvider (chrome tooltips).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="qeetrix-theme">
      <DirectionProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}
