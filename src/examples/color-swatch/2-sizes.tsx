import { ColorSwatch } from "@qeetrix/ui";

/** Four sizes. Without `onClick` a swatch is a plain colour chip, as in a palette or a legend. */
export default function ColorSwatchSizes() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#D9480F" size="xs" label="Qeet Ember" />
      <ColorSwatch color="#D9480F" size="sm" label="Qeet Ember" />
      <ColorSwatch color="#D9480F" size="md" label="Qeet Ember" />
      <ColorSwatch color="#D9480F" size="lg" label="Qeet Ember" />
    </div>
  );
}
