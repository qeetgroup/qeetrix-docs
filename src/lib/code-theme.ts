/**
 * The site's Shiki theme. Every colour is a CSS variable (defined in global.css from Qeetrix's
 * syntax tokens), so highlighted code takes the same palette as @qeetrix/ui's CodeBlock and
 * follows the light and dark themes without a second highlight pass. The scope map follows
 * Shiki's `createCssVariablesTheme`, written out here because `shiki` isn't a direct dependency.
 */
const v = (name: string) => `var(--code-${name})`;

export const qeetrixCodeTheme = {
  name: "qeetrix",
  type: "light" as const,
  colors: {
    "editor.foreground": v("foreground"),
    "editor.background": "transparent",
  },
  tokenColors: [
    {
      scope: [
        "keyword.operator.accessor",
        "meta.group.braces.round.function.arguments",
        "meta.template.expression",
        "markup.fenced_code meta.embedded.block",
      ],
      settings: { foreground: v("foreground") },
    },
    { scope: "emphasis", settings: { fontStyle: "italic" } },
    {
      scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
      settings: { fontStyle: "bold" },
    },
    {
      scope: ["string", "markup.fenced_code", "markup.inline"],
      settings: { foreground: v("string") },
    },
    {
      scope: ["comment", "string.quoted.docstring.multi"],
      settings: { foreground: v("comment"), fontStyle: "italic" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.other.placeholder",
        "constant.character.format.placeholder",
        "variable.language.this",
        "variable.other.constant",
        "support.constant",
      ],
      settings: { foreground: v("constant") },
    },
    {
      scope: [
        "keyword",
        "storage.modifier",
        "storage.type",
        "support.type.property-name.json",
        "punctuation.definition.template-expression",
      ],
      settings: { foreground: v("keyword") },
    },
    {
      scope: ["variable.parameter.function", "variable.parameter"],
      settings: { foreground: v("foreground") },
    },
    {
      scope: [
        "support.function",
        "entity.name.type",
        "entity.other.inherited-class",
        "meta.function-call",
        "meta.instance.constructor",
        "entity.name.function",
        "entity.name.tag",
        "support.class.component",
      ],
      settings: { foreground: v("function") },
    },
    {
      scope: [
        "entity.other.attribute-name",
        "meta.property-name",
        "support.type.property-name",
        "variable.other.property",
        "meta.object-literal.key",
      ],
      settings: { foreground: v("attribute") },
    },
    {
      scope: [
        "string.quoted",
        "string.regexp",
        "string.interpolated",
        "string.template",
        "string.unquoted.plain.out.yaml",
      ],
      settings: { foreground: v("string") },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "punctuation.definition.tag",
        "punctuation.separator",
      ],
      settings: { foreground: v("punctuation") },
    },
    {
      scope: ["keyword.operator.new", "keyword.operator.expression"],
      settings: { foreground: v("keyword") },
    },
    // A string's quotes are punctuation inside the string; colour them with it.
    {
      scope: ["punctuation.definition.string", "string punctuation"],
      settings: { foreground: v("string") },
    },
  ],
};

/** A Shiki transformer that records the block's language on its `<pre>` for the code header. */
export function transformerLanguage() {
  return {
    name: "qeetrix:language",
    pre(
      this: { options: { lang?: string } },
      node: { properties: Record<string, unknown> },
    ) {
      node.properties["data-language"] = this.options.lang;
    },
  };
}
