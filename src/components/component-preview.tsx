import { ArrowUpRightIcon } from "@qeetrix/icons";
import Github from "@thesvg/react/github";
import { highlight } from "fumadocs-core/highlight";
import { ClientOnly } from "@/components/client-only";
import { CodeBlock } from "@/components/docs/code-block";
import { PreviewFrame } from "@/components/docs/preview-frame";
import { examples } from "@/examples/registry";
import { qeetrixCodeTheme } from "@/lib/code-theme";
import { gitConfig } from "@/lib/shared";

/** Code longer than this many lines starts folded. */
const FOLD_AFTER = 14;

/**
 * An example from src/examples, rendered live above its source. The code is the very file the
 * preview renders, highlighted at build time, so the two cannot drift apart. An example whose
 * output depends on the clock or the runtime (see scripts/generate-components.mjs) mounts after
 * hydration, so the build-time HTML can't disagree with the browser. A wide example (tables,
 * charts, editors) fills the preview's width instead of sitting centred at its own size.
 */
export async function ComponentPreview({ name }: { name: string }) {
  const example = examples[name];
  if (!example) {
    throw new Error(
      `Unknown example "${name}". Run \`bun run generate:components\`.`,
    );
  }
  const Example = example.component;
  const file = `${name}.tsx`;
  const code = example.code.trimEnd();
  const highlighted = await highlight(code, {
    lang: "tsx",
    themes: { light: qeetrixCodeTheme, dark: qeetrixCodeTheme },
    defaultColor: false,
    components: {
      pre: (props) => (
        <CodeBlock {...props} data-language="tsx" title={file} bare />
      ),
    },
  });

  return (
    <PreviewFrame
      wide={Boolean(example.wide)}
      foldable={code.split("\n").length > FOLD_AFTER}
      toolbar={
        <a
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/src/examples/${file}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex h-7 items-center gap-1.5 rounded-md border border-border-subtle bg-card/80 px-2 text-caption font-medium text-muted-foreground backdrop-blur-sm transition-colors duration-fast hover:text-foreground focus-visible:focus-ring"
        >
          <Github variant="mono" aria-hidden className="size-3.5" />
          Source
          <ArrowUpRightIcon aria-hidden className="size-3" />
        </a>
      }
      preview={
        example.clientOnly ? (
          <ClientOnly>
            <Example />
          </ClientOnly>
        ) : (
          <Example />
        )
      }
      code={highlighted}
    />
  );
}
