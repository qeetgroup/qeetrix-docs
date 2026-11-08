// Components › App shell: an example, live, in the browser, so the embedded shell runs. The
// example's stage (Example.astro) holds it, in the slot named for the example.
import { OnStage } from "../OnStage";
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <OnStage>{examples.find((example) => example.id === id)?.render()}</OnStage>;
}
