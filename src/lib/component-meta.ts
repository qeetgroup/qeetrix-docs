import meta from "@/lib/generated/component-meta.json";

export type VariantGroup = { options: string[]; default?: string };
export type ParamType = { type: string; optional: boolean };
export type FnProps = {
  params: string[];
  hasRest: boolean;
  propsType: string | null;
  paramTypes?: Record<string, ParamType>;
};
export type ComponentMeta = {
  exports: string[];
  dataSlots: string[];
  variants: Record<string, VariantGroup>;
  functions: Record<string, FnProps>;
  primitive: string | null;
};

const META = meta as unknown as Record<string, ComponentMeta>;

export function getMeta(slug: string): ComponentMeta | undefined {
  return META[slug];
}
