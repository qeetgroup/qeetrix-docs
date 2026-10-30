// Copy page (CopyPage.tsx): the page as Markdown, made from the page itself when asked: its title
// and lede, then its content — headings, text, lists, tables and code — leaving out pictures,
// specimens and controls (anything hidden from assistive technology, or marked data-copy-skip).
const skip =
  'script, style, template, svg, [aria-hidden="true"], [inert], [hidden], [data-copy-skip], [role="tablist"], .qx-button, .doc-eyebrow';
const blockTags = new Set([
  "H2",
  "H3",
  "H4",
  "P",
  "UL",
  "OL",
  "LI",
  "TABLE",
  "PRE",
  "FIGURE",
  "DL",
  "DIV",
  "SECTION",
  "NAV",
]);

const isBlock = (el: Element) => !["inline", "contents"].includes(getComputedStyle(el).display);
const tidy = (text: string) => text.replace(/\s+/g, " ").trim();

/** Code as written: its text, whitespace kept, without what's left out (a prompt, say). */
const raw = (node: Node): string =>
  node.nodeType === Node.TEXT_NODE
    ? (node.textContent ?? "")
    : node instanceof Element && !node.matches(skip)
      ? [...node.childNodes].map(raw).join("")
      : "";

/** An element's text, with code, bold and links marked; parts laid out apart stay apart. */
function inline(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  // A labelled mark (a browser's, say) reads as its name.
  if (node instanceof Element && node.matches("svg[aria-label]"))
    return `${node.getAttribute("aria-label")} `;
  if (!(node instanceof Element) || node.matches(skip)) return "";
  const parts = [...node.childNodes].map((child) => {
    const text = inline(child);
    return child instanceof Element && isBlock(child) && text ? ` ${text} ` : text;
  });
  const text = parts.join("");
  if (node.tagName === "CODE" && node.parentElement?.tagName !== "PRE") return `\`${tidy(text)}\``;
  if (node.tagName === "B" || node.tagName === "STRONG") return `**${tidy(text)}**`;
  if (node.tagName === "A" && (node as HTMLAnchorElement).href)
    return `[${tidy(text)}](${(node as HTMLAnchorElement).href})`;
  return text;
}

function blocks(el: Element): string[] {
  if (el.matches(skip)) return [];
  const tag = el.tagName;
  if (/^H[2-4]$/.test(tag)) return [`${"#".repeat(Number(tag[1]))} ${tidy(inline(el))}`];
  if (tag === "PRE") return [`\`\`\`\n${raw(el).trim()}\n\`\`\``];
  if (tag === "FIGURE" && el.querySelector("pre")) {
    const code =
      el.querySelector<HTMLElement>("[data-copy]")?.dataset.copy ??
      raw(el.querySelector("pre") as Element);
    const file = el.querySelector("figcaption > span")?.textContent?.trim() ?? "";
    return [`\`\`\`${file.includes(".") ? file.split(".").pop() : ""}\n${code.trim()}\n\`\`\``];
  }
  if (tag === "TABLE") {
    const rows = [...el.querySelectorAll("tr")].map(
      (tr) =>
        `| ${[...tr.children].map((cell) => tidy(inline(cell)).replaceAll("|", "\\|")).join(" | ")} |`,
    );
    const head = el.querySelector("tr")?.children.length ?? 0;
    return [[rows[0], `|${" --- |".repeat(head)}`, ...rows.slice(1)].join("\n")];
  }
  if (tag === "A" && el.querySelector("b")) {
    const title = tidy(el.querySelector("b")?.textContent ?? "");
    const rest = tidy(
      [...el.children]
        .filter((child) => child.tagName !== "B")
        .map(inline)
        .join(" "),
    );
    return [`- [${title}](${(el as HTMLAnchorElement).href})${rest ? ` — ${rest}` : ""}`];
  }
  if (
    (tag === "UL" || tag === "OL") &&
    ![...el.children].some((li) =>
      [...li.children].some((c) => blockTags.has(c.tagName) && c.tagName !== "DIV"),
    )
  ) {
    return [...el.children].map((li) => `- ${tidy(inline(li))}`).filter((line) => line !== "- ");
  }
  const children = [...el.children];
  if (children.some((child) => blockTags.has(child.tagName) || child.tagName === "A"))
    return children.flatMap(blocks);
  const text = tidy(inline(el));
  return text ? [text] : [];
}

const markdown = () => {
  const title = document.querySelector(".doc-mast-title")?.textContent?.trim() ?? document.title;
  const lede = document.querySelector(".doc-mast-lede")?.textContent?.trim();
  const content = document.querySelector(".doc-content");
  return [`# ${title}`, ...(lede ? [lede] : []), ...(content ? blocks(content) : [])]
    .join("\n\n")
    .concat("\n");
};

const done = (button: HTMLElement | null) => {
  const label = button?.querySelector('[data-slot="button-label"]');
  if (!button || !label) return;
  button.toggleAttribute("data-copied", true);
  label.textContent = "Copied";
  setTimeout(() => {
    button.toggleAttribute("data-copied", false);
    label.textContent = "Copy page";
  }, 1600);
};

document.addEventListener("click", async (event) => {
  const control = (event.target as Element).closest<HTMLElement>("[data-copy-page]");
  if (!control) return;
  const action = control.dataset.copyPage;
  const button = document.querySelector<HTMLElement>('.doc-copy [data-copy-page="markdown"]');
  if (action === "markdown") {
    await navigator.clipboard?.writeText(markdown());
    done(button);
  } else if (action === "link") {
    await navigator.clipboard?.writeText(location.href);
  } else if (action === "view") {
    open(
      URL.createObjectURL(new Blob([markdown()], { type: "text/plain;charset=utf-8" })),
      "_blank",
    );
  } else if (action === "edit" && control.dataset.href) {
    open(control.dataset.href, "_blank", "noopener");
  }
});

// A module, so its names stay its own.
export {};
