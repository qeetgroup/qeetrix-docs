"use client";

import { DiffViewer } from "@qeetrix/ui";

const before = `{
  "role": "billing-admin",
  "permissions": [
    "invoices:read",
    "invoices:write",
    "payouts:read"
  ],
  "mfa_required": false
}`;

const after = `{
  "role": "billing-admin",
  "permissions": [
    "invoices:read",
    "invoices:write",
    "payouts:read",
    "refunds:approve"
  ],
  "mfa_required": true
}`;

/**
 * A read-only diff for config history and audit. Changed lines carry a +/− marker as well as
 * a tint, and where a line was edited rather than replaced the changed words are emphasised.
 * Giving `beforeLabel` or `afterLabel` adds a header with both names and the change counts.
 *
 * @layout wide
 */
export default function DiffViewerDefault() {
  return (
    <DiffViewer
      before={before}
      after={after}
      beforeLabel="Version 3 · 2 Sep"
      afterLabel="Version 4 · 8 Oct"
    />
  );
}
