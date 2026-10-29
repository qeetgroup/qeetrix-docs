// A console example's frame: /frames/<id>/ in an iframe (frames.tsx), named for what it shows. With
// a window width, the frame lays out at that width (a console's media queries read the window) and
// frame-fit.ts zooms it to fit its column. The example's bar sets its scheme, density and direction
// (example.ts); a link opens it full size.
import { Link } from "@qeetrix/react";
import type { CSSProperties } from "react";
import "./frame.css";

export function FrameOf({
  id,
  title,
  query = "",
  height = "36rem",
  window,
  narrow = false,
}: {
  id: string;
  title: string;
  query?: string;
  /** Its height, in the frame's own pixels when it has a window. */
  height?: string;
  /** The window's width it lays out at, in pixels: 1200 for a console's desktop layout. */
  window?: number;
  narrow?: boolean;
}) {
  const src = `/frames/${id}/${query}`;
  return (
    <div className="qc-frame-wrap">
      <iframe
        className="qc-frame"
        src={src}
        title={title}
        loading="lazy"
        data-narrow={narrow ? "" : undefined}
        data-window={window}
        style={
          {
            "--qc-frame-height": height,
            ...(window ? { inlineSize: `${window}px` } : {}),
          } as CSSProperties
        }
      />
      <Link href={src} target="_blank" rel="noopener">
        Open in a new tab
      </Link>
    </div>
  );
}
