import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { ClientOnly } from "@/components/client-only";
import { examples } from "@/examples/registry";

/**
 * An example from src/examples, rendered live beside its source. The code tab shows the very file
 * the preview renders, highlighted at build time, so the two cannot drift apart. An example whose
 * output depends on the clock or the runtime (see scripts/generate-components.mjs) mounts after
 * hydration, so the build-time HTML can't disagree with the browser. A wide example (tables,
 * charts, editors) fills the preview's width instead of sitting centred at its own size.
 */
export function ComponentPreview({ name }: { name: string }) {
  const example = examples[name];
  if (!example) {
    throw new Error(
      `Unknown example "${name}". Run \`bun run generate:components\`.`,
    );
  }
  const Example = example.component;
  return (
    <Tabs items={["Preview", "Code"]}>
      <Tab value="Preview">
        <div
          className={`not-prose flex min-h-48 w-full justify-center overflow-x-auto p-6 *:max-w-full ${example.wide ? "flex-col" : "items-center"}`}
        >
          {example.clientOnly ? (
            <ClientOnly>
              <Example />
            </ClientOnly>
          ) : (
            <Example />
          )}
        </div>
      </Tab>
      <Tab value="Code">
        <ServerCodeBlock code={example.code} lang="tsx" />
      </Tab>
    </Tabs>
  );
}
