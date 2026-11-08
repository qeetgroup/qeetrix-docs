// Components › Avatar group: an example, live, in the browser, which names it. The example's
// stage (Example.astro) holds it, in the slot named for the example.
import { OnStage } from "../OnStage";
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <OnStage>{examples.find((example) => example.id === id)?.render()}</OnStage>;
}
