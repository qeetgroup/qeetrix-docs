// A playground's controls, in the browser: one of a few choices as a segmented Qeetrix ToggleGroup,
// in words or in icons (each named by its label, which shows as its tooltip).
import type { QeetrixIcon } from "@qeetrix/react";
import { Toggle, ToggleGroup } from "@qeetrix/react";

export default function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<[T, string]>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="qc-play-field">
      <span className="qc-play-label">{label}</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label={label}
        value={[value]}
        onValueChange={(next) => next[0] && onChange(next[0] as T)}
      >
        {options.map(([option, text]) => (
          <Toggle key={option} value={option}>
            {text}
          </Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function IconChoice<T extends string>({
  label,
  value,
  icons,
  onChange,
}: {
  label: string;
  value: T;
  icons: Record<T, { label: string; Glyph: QeetrixIcon }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="qc-play-field">
      <span className="qc-play-label">{label}</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label={label}
        value={[value]}
        onValueChange={(next) => next[0] && onChange(next[0] as T)}
      >
        {(Object.keys(icons) as T[]).map((key) => (
          <Toggle key={key} value={key} icon={icons[key].Glyph} aria-label={icons[key].label} />
        ))}
      </ToggleGroup>
    </div>
  );
}
