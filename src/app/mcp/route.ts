import { getMeta } from "@/lib/component-meta";
import { EXAMPLE_CODE, hasExample } from "@/lib/examples";
import components from "@/lib/generated/components.json";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";
import { categories, categoryMeta, tokensFor } from "@/lib/tokens";

// Minimal MCP server over Streamable HTTP (JSON-RPC via POST). Exposes the
// Qeetrix design system to AI agents (spec §D12). Non-streaming: each request
// gets a single application/json response, which the Streamable HTTP spec allows.

const PROTOCOL_VERSION = "2025-06-18";

const TOOLS = [
  {
    name: "list_components",
    description:
      "List every @qeetrix/ui component with its import path, test/story status, and variant count.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_component",
    description:
      "Get details for one component: import paths, cva variants + defaults, data-slots, the Base UI primitive, and an example if available.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name or slug, e.g. 'Button' or 'button'." },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "get_examples",
    description: "Get ready-to-paste example code for a component.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component name or slug." } },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "get_tokens",
    description:
      "Get design tokens. With no category, lists the categories; with a category, returns its tokens (name, --qx var, light/dark values).",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", enum: categories(), description: "Optional token category." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "search",
    description:
      "Search components, tokens, and pages by keyword; returns names and their ui.qeet.in URLs.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Search text." } },
      required: ["query"],
      additionalProperties: false,
    },
  },
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
function findComponent(name: string) {
  const n = norm(name);
  return components.components.find((c) => norm(c.slug) === n || norm(c.name) === n);
}

function text(t: string) {
  return { content: [{ type: "text", text: t }] };
}
function errorText(t: string) {
  return { content: [{ type: "text", text: t }], isError: true };
}

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_components": {
      const list = components.components
        .map((c) => {
          const m = getMeta(c.slug);
          const v = m ? Object.keys(m.variants).length : 0;
          return `- ${c.name} (${c.deepImport})${c.tested ? " · tested" : ""}${v ? ` · ${v} variant groups` : ""}`;
        })
        .join("\n");
      return text(
        `${components.count} @qeetrix/ui components (v${components.version}):\n\n${list}`,
      );
    }
    case "get_component": {
      const c = findComponent(String(args.name ?? ""));
      if (!c) return errorText(`No component named "${args.name}". Try list_components.`);
      const m = getMeta(c.slug);
      const out = {
        name: c.name,
        slug: c.slug,
        import: `import { ${c.name} } from "${c.import}";`,
        deepImport: c.deepImport,
        tested: c.tested,
        story: c.story,
        primitive: m?.primitive ?? null,
        exports: m?.exports ?? [c.name],
        dataSlots: m?.dataSlots ?? [],
        variants: m?.variants ?? {},
        example: hasExample(c.slug) ? EXAMPLE_CODE[c.slug] : null,
        docs: `${SITE.url}/components/${c.slug}`,
      };
      return text(JSON.stringify(out, null, 2));
    }
    case "get_examples": {
      const c = findComponent(String(args.name ?? ""));
      if (!c) return errorText(`No component named "${args.name}".`);
      if (!hasExample(c.slug))
        return errorText(
          `No example yet for ${c.name}. Import: import { ${c.name} } from "${c.import}";`,
        );
      return text(EXAMPLE_CODE[c.slug]);
    }
    case "get_tokens": {
      const cat = args.category ? String(args.category) : "";
      if (!cat) {
        return text(
          `Token categories:\n${categories()
            .map((x) => `- ${x}: ${categoryMeta(x).label}`)
            .join("\n")}`,
        );
      }
      if (!categories().includes(cat)) return errorText(`Unknown category "${cat}".`);
      const toks = tokensFor(cat).map(
        (t) => `${t.varName}: ${t.light}${t.dark !== t.light ? ` (dark: ${t.dark})` : ""}`,
      );
      return text(`${categoryMeta(cat).label} tokens:\n${toks.join("\n")}`);
    }
    case "search": {
      const q = norm(String(args.query ?? ""));
      if (!q) return errorText("Provide a query.");
      const hits = components.components
        .filter((c) => norm(c.name).includes(q) || norm(c.slug).includes(q))
        .slice(0, 20)
        .map((c) => `- ${c.name}: ${SITE.url}/components/${c.slug}`);
      const catHits = categories()
        .filter((c) => c.includes(q) || norm(categoryMeta(c).label).includes(q))
        .map((c) => `- ${categoryMeta(c).label} tokens: ${SITE.url}/tokens/${c}`);
      const all = [...hits, ...catHits];
      return text(all.length ? all.join("\n") : `No matches for "${args.query}".`);
    }
    default:
      return errorText(`Unknown tool: ${name}`);
  }
}

type RpcMsg = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};
const reply = (id: RpcMsg["id"], result: unknown) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id: RpcMsg["id"], code: number, message: string) => ({
  jsonrpc: "2.0",
  id,
  error: { code, message },
});

function handle(msg: RpcMsg) {
  const { id, method, params } = msg;
  switch (method) {
    case "initialize":
      return reply(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "qeetrix", version: SITE.version },
      });
    case "ping":
      return reply(id, {});
    case "tools/list":
      return reply(id, { tools: TOOLS });
    case "tools/call": {
      const name = String(params?.name ?? "");
      const args = (params?.arguments as Record<string, unknown>) ?? {};
      if (!TOOLS.some((t) => t.name === name)) return rpcError(id, -32602, `Unknown tool: ${name}`);
      return reply(id, callTool(name, args));
    }
    default:
      if (method?.startsWith("notifications/")) return null; // notifications get no response
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

export async function POST(req: Request) {
  const rl = await rateLimit(clientKey(req), { limit: 120, windowMs: 60000 });
  if (!rl.ok)
    return Response.json(
      { jsonrpc: "2.0", id: null, error: { code: -32029, message: "Rate limited" } },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } },
    );

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(rpcError(null, -32700, "Parse error"), { status: 400 });
  }

  if (Array.isArray(body)) {
    const out = body.map((m) => handle(m as RpcMsg)).filter(Boolean);
    return out.length ? Response.json(out) : new Response(null, { status: 202 });
  }

  const res = handle(body as RpcMsg);
  if (!res) return new Response(null, { status: 202 });
  return Response.json(res);
}

export function GET() {
  return Response.json(
    {
      name: "qeetrix",
      version: SITE.version,
      transport: "streamable-http",
      usage: "POST JSON-RPC 2.0 to this endpoint. Call tools/list to discover tools.",
      tools: TOOLS.map((t) => t.name),
    },
    { status: 405, headers: { Allow: "POST" } },
  );
}
