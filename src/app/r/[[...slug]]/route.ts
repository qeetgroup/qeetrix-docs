import { buildRegistryIndex, buildRegistryItem, registrySlugs } from "@/lib/registry";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: ["registry.json"] }, ...registrySlugs().map((s) => ({ slug: [`${s}.json`] }))];
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const seg = slug?.[0] ?? "registry.json";

  if (seg === "registry.json" || seg === "registry") {
    return Response.json(buildRegistryIndex());
  }

  const name = seg.replace(/\.json$/, "");
  const item = buildRegistryItem(name);
  if (!item) return new Response("Not found", { status: 404 });
  return Response.json(item);
}
