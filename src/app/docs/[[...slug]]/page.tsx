import {
  DocsBody,
  DocsPage,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/spacious/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPageHeader } from "@/components/docs/page-header";
import { getMDXComponents } from "@/components/mdx";
import { getComponentMeta, uiVersion } from "@/lib/components";
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from "@/lib/shared";
import { links } from "@/lib/site-links";
import { source } from "@/lib/source";

/** The section a page belongs to, for the breadcrumb: its first slug, or Getting Started. */
const sections: Record<string, { name: string; url: string }> = {
  components: { name: "Components", url: links.components },
  foundations: { name: "Foundations", url: links.foundations },
  guides: { name: "Guides", url: links.guides },
  patterns: { name: "Patterns", url: links.patterns },
  resources: { name: "Resources", url: links.resources },
};
const gettingStarted = { name: "Getting started", url: links.docs };

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const [first, second] = page.slugs;
  const section = (first && sections[first]) || gettingStarted;
  const meta =
    first === "components" && second ? getComponentMeta(second) : null;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      // The "clerk" outline: a line that follows heading depth, lighting only the current section.
      tableOfContent={{ style: "clerk", single: true }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <DocsPageHeader
        section={section}
        title={page.data.title}
        description={page.data.description}
        component={meta ? { meta, version: uiVersion } : null}
        actions={
          <>
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
            />
          </>
        }
      />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
