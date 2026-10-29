// A frame's content, in the browser: the island /frames/<id>/ hydrates, with the address's options.
import { FRAMES } from "./frames";

export default function Frame({ id }: { id: string }) {
  const params = new URLSearchParams(typeof location === "undefined" ? "" : location.search);
  return <>{FRAMES[id]?.(params)}</>;
}
