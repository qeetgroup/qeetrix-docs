// A React node, or what a render function returns, inside an Astro tab: Astro renders components,
// not elements, so the examples and the do-and-don'ts pass through here, rendered to HTML.
import type { ReactNode } from "react";

export default function Node({ node, render }: { node?: ReactNode; render?: () => ReactNode }) {
  return <>{render ? render() : node}</>;
}
