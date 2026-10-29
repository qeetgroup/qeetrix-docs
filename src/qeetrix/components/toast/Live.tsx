// Components › Toast: an example, live, in the browser, so it shows its toasts. The example's stage
// (Example.astro) holds it, in the slot named for the example.
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <>{examples.find((example) => example.id === id)?.render()}</>;
}
