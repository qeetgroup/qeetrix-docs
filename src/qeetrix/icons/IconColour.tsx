// The Icon browser's colour, in the browser: a swatch per icon token (Qeetrix's ColorSwatchGroup),
// then any colour of your own (ColorField: the system's picker, and the eyedropper where there is
// one). An island inside the server-rendered browser; it tells browser.ts each choice with a
// "qf-icon-colour" event on the browser: { token } or { own: "#RRGGBB" }.
import { ColorField, ColorSwatchGroup, toHexColor } from "@qeetrix/react/experimental";
import { useRef, useState } from "react";
import { ICON_COLOURS } from "./icon-colours";

const OPTIONS = ICON_COLOURS.map(([token, name]) => ({
  value: token,
  label: name,
  color: `var(--qx-color-icon-${token})`,
}));

export default function IconColour() {
  const [token, setToken] = useState<string | null>("default");
  const [own, setOwn] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const send = (detail: { token: string } | { own: string }) =>
    ref.current?.dispatchEvent(new CustomEvent("qf-icon-colour", { detail, bubbles: true }));
  return (
    <span className="qf-browser-switch qf-browser-colour" ref={ref}>
      <span className="qf-toolbar-label" aria-hidden="true">
        Colour
      </span>
      <ColorSwatchGroup
        aria-label="Colour of the icons"
        options={OPTIONS}
        value={token}
        onValueChange={(next) => {
          setToken(next);
          setOwn("");
          send({ token: next });
        }}
      />
      <ColorField
        aria-label="A colour of your own"
        className="qf-browser-own"
        placeholder="#1A73E8"
        value={own}
        onValueChange={(next) => {
          setOwn(next);
          const hex = toHexColor(next);
          if (hex) {
            setToken(null);
            send({ own: hex });
          } else if (next === "") {
            setToken("default");
            send({ token: "default" });
          }
        }}
      />
    </span>
  );
}
