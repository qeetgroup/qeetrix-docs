// Components › Chip: an example, live, in the browser, so a chip turns on and off, a group's arrow
// keys move the choice and a remove button removes. The example's stage (Example.astro) holds it,
// in the slot named for the example.
import { examples } from "./examples";

export default function Live({ id }: { id: string }) {
  return <>{examples.find((example) => example.id === id)?.render()}</>;
}
