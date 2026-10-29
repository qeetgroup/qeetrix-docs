// A live preview of each foundation for its card on the Foundations page, drawn with the tokens
// themselves, so each follows the scheme. Pictures: inert, hidden from assistive technology; the
// card's name says the rest.
import type { ReactNode } from "react";

const tones = ["brand", "neutral", "info", "success", "warning", "danger"] as const;
const steps = ["xs", "sm", "md", "lg", "xl"] as const;

export const specimens: Record<string, ReactNode> = {
  Colour: (
    <span className="qf-pv-colour">
      {tones.map((t) => (
        <span
          key={t}
          className="qf-pv-swatch"
          style={{ background: `var(--qx-color-bg-${t}-bold)` }}
        />
      ))}
      {tones.map((t) => (
        <span
          key={`${t}-subtle`}
          className="qf-pv-swatch"
          style={{ background: `var(--qx-color-bg-${t}-subtle)` }}
        />
      ))}
    </span>
  ),
  Typography: (
    <span className="qf-pv-type">
      <span className="qf-pv-type-aa">Aa</span>
      <span className="qf-pv-type-scale">
        <b>Display</b>
        <b>Heading</b>
        <b>Title</b>
        <span>Body</span>
      </span>
    </span>
  ),
  Spacing: (
    <span className="qf-pv-space">
      {steps.map((s) => (
        <span key={s}>
          <i
            style={{
              inlineSize: `calc(var(--qx-space-inset-${s}) * 2)`,
              blockSize: `calc(var(--qx-space-inset-${s}) * 2)`,
            }}
          />
          {s}
        </span>
      ))}
    </span>
  ),
  Elevation: (
    <span className="qf-pv-elevation">
      <i style={{ boxShadow: "var(--qx-shadow-raised)" }}>Raised</i>
      <i style={{ boxShadow: "var(--qx-shadow-overlay)" }}>Overlay</i>
      <i style={{ boxShadow: "var(--qx-shadow-modal)" }}>Modal</i>
    </span>
  ),
  Motion: (
    <span className="qf-pv-motion">
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path className="qf-pv-motion-axis" d="M10 70 H110 M10 70 V10" />
        <path className="qf-pv-motion-curve" d="M10 70 C 75 70, 45 10, 110 10" />
        <circle cx="110" cy="10" r="3.5" />
      </svg>
      <span>standard · 200ms</span>
    </span>
  ),
};

export function FoundationSpecimen({ name }: { name: string }) {
  return (
    <div className="doc-card-art" aria-hidden="true" inert>
      {specimens[name]}
    </div>
  );
}
