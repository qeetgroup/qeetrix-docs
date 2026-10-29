// Components › Icon button: an example, live, in the browser, so its tooltips open on hover and
// focus. The example's stage (Example.astro) holds it, in the slot named for the example.
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <>{examples.find((example) => example.id === id)?.render()}</>;
}
