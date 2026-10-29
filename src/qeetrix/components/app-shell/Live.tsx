// Components › App shell: an example, live, in the browser, so the embedded shell runs. The
// example's stage (Example.astro) holds it, in the slot named for the example.
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <>{examples.find((example) => example.id === id)?.render()}</>;
}
