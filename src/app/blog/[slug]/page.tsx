import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getPost, POST_CONTENT, POSTS } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Post not found" };
  return { title: p.title, description: p.description };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const loader = POST_CONTENT[slug];
  if (!post || !loader) notFound();

  const { default: Post } = await loader();

  return (
    <PageShell
      title={post.title}
      crumbs={[{ title: "Blog", href: "/blog" }, { title: post.title }]}
    >
      <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
      <article className="mt-4 max-w-2xl">
        <Post />
      </article>
    </PageShell>
  );
}
