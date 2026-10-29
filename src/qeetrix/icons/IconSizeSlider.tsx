// The Icon browser's size, in the browser: the Qeetrix Slider, from the smallest size an icon reads at
// to the largest it's drawn for. An island inside the server-rendered browser; it tells browser.ts
// each new size with a "qf-icon-size" event on the browser.
import { Slider } from "@qeetrix/react";
import { useRef, useState } from "react";

export default function IconSizeSlider({
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
}) {
  const [size, setSize] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const change = (next: number) => {
    setSize(next);
    ref.current?.dispatchEvent(new CustomEvent("qf-icon-size", { detail: next, bubbles: true }));
  };
  return (
    <span className="qf-browser-size" ref={ref}>
      <span className="qf-toolbar-label" aria-hidden="true">
        Size
      </span>
      <Slider
        aria-label="Size of the icons, in pixels"
        className="qf-browser-size-slider"
        min={min}
        max={max}
        value={size}
        onValueChange={(next) => change(next as number)}
      />
      <code className="qf-browser-size-value">{size}px</code>
    </span>
  );
}
