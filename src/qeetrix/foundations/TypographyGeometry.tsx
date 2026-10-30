// Foundations › Typography › Geometry, in the browser: drag GEOM to move Qeet Sans from its most
// legible letters (0) to geometric ones (100). An island; it takes the axis stops as props so the
// token data stays on the server. Ported from qeetrix-story (typography.stories.tsx).
import { Slider } from "@qeetrix/react";
import { type CSSProperties, useState } from "react";
import { CopyToken, Specimen } from "./kit";

export interface GeometryStop {
  name: string;
  label: string;
  roles: string;
  value: number;
  cssVar: string;
}

const GEOMETRY_SAMPLE = "Ilya signed in to Qeet with a passkey";

/** Custom properties for typography.css: React's CSSProperties doesn't type them. */
const vars = (values: Record<string, string>) => values as CSSProperties;

export default function TypographyGeometry({ stops }: { stops: GeometryStop[] }) {
  const [geom, setGeom] = useState(stops.find((stop) => stop.name === "heading")?.value ?? 50);
  return (
    <Specimen>
      <div className="qf-typo-geom-stage">
        <p className="qf-typo-geom-sample" style={vars({ "--qx-typo-geom": String(geom) })}>
          {GEOMETRY_SAMPLE}
        </p>
      </div>
      <div className="qf-typo-geom-control">
        <Slider
          label="GEOM"
          showValue
          min={0}
          max={100}
          value={geom}
          onValueChange={(value) => setGeom(value as number)}
        />
        <div className="qf-typo-geom-stops">
          {stops.map((stop, index) => (
            <div
              key={stop.cssVar}
              className="qf-typo-geom-stop"
              data-align={index === 0 ? "start" : index === stops.length - 1 ? "end" : "center"}
              data-active={stop.value === geom ? "" : undefined}
            >
              <span className="qf-typo-geom-stop-name">
                {stop.label} · {stop.value}
              </span>
              <CopyToken value={stop.cssVar} />
              <span className="qf-typo-geom-stop-roles">{stop.roles}</span>
            </div>
          ))}
        </div>
      </div>
    </Specimen>
  );
}
