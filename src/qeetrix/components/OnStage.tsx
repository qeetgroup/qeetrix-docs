// An example's island on its stage (Example.astro): it takes the stage's direction, so when the
// bar's RTL switch sets the stage's `dir`, Base UI's arrow keys mirror too — in a ChipGroup,
// ToggleGroup or Tabs — as in a right-to-left app, not only the drawing.
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function OnStage({ children }: { children: ReactNode }) {
  const marker = useRef<HTMLSpanElement>(null);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  useEffect(() => {
    const stage = marker.current?.closest<HTMLElement>("[data-qc-ex-stage]");
    if (!stage) return;
    const read = () => setDirection(stage.dir === "rtl" ? "rtl" : "ltr");
    read();
    const observer = new MutationObserver(read);
    observer.observe(stage, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);
  return (
    <DirectionProvider direction={direction}>
      {children}
      {/* A marker to find the stage by, after the example and hidden. The example's own elements stay
          the island's children, which client:visible watches to hydrate it: a wrapper with no box
          would never come into view. */}
      <span ref={marker} hidden />
    </DirectionProvider>
  );
}
