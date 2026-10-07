import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { examples } from "@/examples/registry";

/**
 * An example from src/examples, rendered live beside its source. The code tab shows the very file
 * the preview renders, highlighted at build time, so the two cannot drift apart.
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
        <div className="not-prose flex min-h-48 w-full items-center justify-center overflow-x-auto p-6 *:max-w-full">
          <Example />
        </div>
      </Tab>
      <Tab value="Code">
        <ServerCodeBlock code={example.code} lang="tsx" />
      </Tab>
    </Tabs>
  );
}
