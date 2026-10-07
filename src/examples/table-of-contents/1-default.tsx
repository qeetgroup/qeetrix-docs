import { TableOfContents } from "@qeetrix/ui";

const sections = [
  {
    id: "toc-sso-overview",
    label: "Overview",
    body: "Northwind Retail signs in to Qeet ID through Okta. Members on northwind.in are redirected to Okta and provisioned over SCIM.",
  },
  {
    id: "toc-sso-metadata",
    label: "Upload IdP metadata",
    body: "Download the SAML metadata from Okta and upload it here. Qeet ID reads the entity ID, the sign-in URL and the signing certificate.",
  },
  {
    id: "toc-sso-domain",
    label: "Verify your domain",
    body: "Add the TXT record to northwind.in. Verification usually completes within a few minutes of the record going live.",
  },
  {
    id: "toc-sso-test",
    label: "Test sign-in",
    body: "Sign in as a test member before you enforce SSO. Admins keep their passkeys as a break-glass route.",
  },
  {
    id: "toc-sso-enforce",
    label: "Enforce SSO",
    body: "Once enforced, members can only sign in through Okta. Existing sessions stay valid until they expire.",
  },
];

/**
 * Pass the article's headings as `items`. The built-in scroll-spy marks the first heading in the
 * top 30% of the viewport as current (`aria-current="location"`), so scroll this page to see the
 * highlight follow the article.
 *
 * @layout wide
 */
export default function TableOfContentsDefault() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="flex flex-col gap-6">
        {sections.map((section) => (
          <section key={section.id} className="flex flex-col gap-1.5">
            <h4
              id={section.id}
              className="scroll-mt-24 font-heading text-base font-medium"
            >
              {section.label}
            </h4>
            <p className="text-sm text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </article>
      <TableOfContents
        items={sections.map(({ id, label }) => ({ id, label }))}
        className="hidden sm:block"
      />
    </div>
  );
}
