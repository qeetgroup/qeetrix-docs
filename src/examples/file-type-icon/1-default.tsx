import { FileTypeIcon } from "@qeetrix/ui";

const files = [
  "Offer letter.pdf",
  "Payroll register.xlsx",
  "Board deck Q2.pptx",
  "Store front.png",
  "Onboarding walkthrough.mp4",
  "Support call.m4a",
  "Audit export.zip",
  "openid-configuration.json",
  "verify-webhook.ts",
  "qeet-id-saml.crt",
  "QeetText-Regular.woff2",
  "release.sig",
];

/**
 * Pass a filename or extension. Every type shares one page silhouette with a glyph inside for
 * its category, deliberately not colour-coded, and an unknown type gets a plain page. The icon
 * is decorative; the file name beside it is the accessible text.
 */
export default function FileTypeIconDefault() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-label sm:grid-cols-3">
      {files.map((file) => (
        <li key={file} className="flex min-w-0 items-center gap-2">
          <FileTypeIcon type={file} />
          <span className="truncate">{file}</span>
        </li>
      ))}
    </ul>
  );
}
