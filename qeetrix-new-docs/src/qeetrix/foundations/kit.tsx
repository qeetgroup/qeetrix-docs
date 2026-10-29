import { CheckIcon } from "@qeetrix/icons/icons/check";
import type { ReactNode } from "react";

import "./kit.css";

/**
 * The specimen kit the Foundations pages are built from (ported from qeetrix-story): swatches, ramps, labelled groups, specimen
 * rows and copyable token names. Workshop chrome, not product UI, styled in `_specimens.css` with
 * token values only. A swatch paints the CSS variable it documents, never a raw colour.
 */

/** The root of every Foundations story: full width, the body role's face and letter style. */
export function Specimen({ children }: { children: ReactNode }) {
  return <div className="qf-specimen">{children}</div>;
}

/** A labelled group inside a specimen, with an optional note on the right. */
export function Group({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="qf-specimen-group">
      <div className="qf-specimen-group-head">
        <span className="qf-specimen-label">{label}</span>
        {aside && <span className="qf-specimen-aside">{aside}</span>}
      </div>
      {children}
    </div>
  );
}

/**
 * A docs section, as each Foundations page lists them: its anchor, name, one line and specimen.
 * The pages render to HTML; copy.ts does the copying, marking a control `data-copied` for a moment.
 */
export interface Section {
  id: string;
  name: string;
  parameters: { docs: { description: { story: string } } };
  render: () => ReactNode;
}

/** A token name that copies itself: the thing a developer came to the page for. */
export function CopyToken({ value, label }: { value: string; label?: string }) {
  return (
    <button
      type="button"
      className="qf-copy-token"
      data-copy-value={value}
      title={`Copy ${value}`}
      aria-label={`Copy ${value}`}
    >
      <code>{label ?? value}</code>
      <CheckIcon size={12} aria-hidden className="qf-copied-mark" />
    </button>
  );
}

/**
 * One half of a tile, pinned to a colour scheme with `data-qx-color-scheme`, the attribute
 * @qeetrix/tokens scopes its colours to. A translucent token is layered over that scheme's default
 * surface, which is what it is drawn on in product.
 */
function SchemeHalf({ cssVar, scheme }: { cssVar: string; scheme?: "light" | "dark" }) {
  return (
    <span
      data-qx-color-scheme={scheme}
      className="qf-swatch-half"
      style={{
        background: `linear-gradient(var(${cssVar}), var(${cssVar})), var(--qx-color-surface-default)`,
      }}
    />
  );
}

/**
 * One colour token: the tile (split into light and dark when they differ), its name, its variable
 * and its values. Click the tile to copy the variable.
 */
export function Swatch({
  cssVar,
  name,
  light,
  dark,
}: {
  cssVar: string;
  name: string;
  /** The light value, for the label. */
  light?: string;
  /** The dark value; a different one splits the tile. */
  dark?: string;
}) {
  const split = dark !== undefined && dark !== light;
  return (
    <div className="qf-swatch">
      <button
        type="button"
        data-copy-value={cssVar}
        title={`Copy ${cssVar}`}
        aria-label={`Copy ${cssVar}`}
        className="qf-swatch-tile"
      >
        {split ? (
          <>
            <SchemeHalf cssVar={cssVar} scheme="light" />
            <SchemeHalf cssVar={cssVar} scheme="dark" />
          </>
        ) : (
          <SchemeHalf cssVar={cssVar} />
        )}
      </button>
      <div className="qf-swatch-meta">
        <span className="qf-swatch-name">
          <span className="qf-swatch-label">{name}</span>
          <span className="qf-swatch-copied">
            <CheckIcon size={12} aria-hidden /> Copied
          </span>
        </span>
        <code className="qf-swatch-var">{cssVar}</code>
        {light ? (
          <code className="qf-swatch-value">{split ? `${light} · ${dark}` : light}</code>
        ) : null}
      </div>
    </div>
  );
}

/** Aligned swatch grid: as many columns as fit, each wide enough for a split tile. */
export function SwatchGrid({ children }: { children: ReactNode }) {
  return <div className="qf-swatch-grid">{children}</div>;
}

/**
 * A primitive ramp: one joined strip of steps, each with its step and hex. Primitives are absent
 * from the runtime stylesheet on purpose (they live in @qeetrix/tokens' DTCG files), so the tiles
 * paint the DTCG hex: domain data, shown as reference.
 */
export function Ramp({
  name,
  steps,
}: {
  name: string;
  steps: Array<{ step: string; hex: string }>;
}) {
  return (
    <div
      className="qf-ramp"
      data-dense={steps.length > 13 ? "" : undefined}
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map(({ step, hex }) => (
        <div key={step} className="qf-ramp-step">
          <button
            type="button"
            data-copy-value={hex}
            title={`Copy ${hex}`}
            aria-label={`Copy ${hex}, primitive.color.${name}.${step}`}
            className="qf-ramp-tile"
            style={{ background: hex }}
          />
          <span className="qf-ramp-label">{step}</span>
          <code className="qf-ramp-hex">{hex}</code>
        </div>
      ))}
    </div>
  );
}

/** Rows that pair a token with a live sample: the type scale, families, durations. */
export function SpecimenRows({ children }: { children: ReactNode }) {
  return <div className="qf-specimen-rows">{children}</div>;
}

/** One row: the token and its numbers on the left, the sample it draws on the right. */
export function SpecimenRow({
  token,
  meta,
  children,
}: {
  token: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="qf-specimen-row">
      <div className="qf-specimen-row-meta">
        <CopyToken value={token} />
        {meta && <span className="qf-specimen-row-numbers">{meta}</span>}
      </div>
      <div className="qf-specimen-row-sample">{children}</div>
    </div>
  );
}
