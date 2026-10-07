"use client";

import { Avatar, AvatarFallback, Feed, FeedItem } from "@qeetrix/ui";

const posts = [
  {
    id: "feed-post-passkeys",
    product: "Qeet ID",
    date: "2 Oct",
    title: "Passkeys are now the default for new members",
    body: "People you invite are asked to create a passkey first. Passwords stay available as a fallback until you turn them off.",
  },
  {
    id: "feed-post-einvoice",
    product: "Qeet Pay",
    date: "24 Sep",
    title: "GST e-invoicing for B2B invoices",
    body: "Invoices to GST-registered customers now get an IRN and a signed QR code from the IRP automatically.",
  },
  {
    id: "feed-post-whatsapp",
    product: "Qeet Notify",
    date: "11 Sep",
    title: "WhatsApp templates",
    body: "Send approved WhatsApp templates through the same API as email and SMS, with delivery receipts.",
  },
];

/**
 * A stream of articles, each its own card by default. Every article is focusable and gets its
 * position in the set; `PageDown` and `PageUp` move between them. Name each article with
 * `FeedItem`'s `aria-labelledby`.
 */
export default function FeedDefault() {
  return (
    <Feed aria-label="Product updates" className="w-full max-w-lg">
      {posts.map((post) => (
        <FeedItem key={post.id} aria-labelledby={post.id}>
          <div className="flex items-center gap-2">
            <Avatar size="sm" shape="square" name={post.product}>
              <AvatarFallback />
            </Avatar>
            <span className="text-label font-medium">{post.product}</span>
            <span className="ms-auto text-caption text-muted-foreground">
              {post.date}
            </span>
          </div>
          <p id={post.id} className="mt-3 text-label font-semibold">
            {post.title}
          </p>
          <p className="mt-1 text-label text-muted-foreground">{post.body}</p>
        </FeedItem>
      ))}
    </Feed>
  );
}
