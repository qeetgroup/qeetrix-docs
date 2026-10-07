import { Typography } from "@qeetrix/ui";

/**
 * `inlineCode` is sized in em, so it matches the text around it; `list` is a bulleted list;
 * `small` is an interface label and `large` an emphasised line.
 */
export default function TypographyInlineAndLists() {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <Typography variant="large">Rotate your webhook secret</Typography>
      <Typography>
        Send the new secret in the{" "}
        <Typography variant="inlineCode">Qeet-Signature</Typography> header for
        24 hours before you revoke the old one.
      </Typography>
      <Typography variant="list">
        <li>Create a second secret in the dashboard</li>
        <li>Deploy it to every service that verifies events</li>
        <li>Revoke the old secret once deliveries succeed</li>
      </Typography>
      <Typography variant="small" className="text-muted-foreground">
        Last rotated 12 Aug 2026 by Kabir Rao
      </Typography>
    </div>
  );
}
