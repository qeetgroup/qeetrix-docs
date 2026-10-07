import { Badge } from "@qeetrix/ui";

/** Neutral, brand and status tones for labels, counts and states. */
export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">ap-south-1</Badge>
      <Badge variant="outline">SAML</Badge>
      <Badge variant="brand">Enterprise</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="success">Paid</Badge>
      <Badge variant="warning">Due in 3 days</Badge>
      <Badge variant="destructive">Overdue</Badge>
      <Badge variant="muted">Draft</Badge>
    </div>
  );
}
