import { JSONTree } from "@qeetrix/ui";

const event = {
  action: "user.role_changed",
  actor: { id: "usr_7h2k", name: "Kabir Rao", ip: "103.21.58.14" },
  target: { id: "usr_4f2a", name: "Meera Iyer" },
  changes: {
    role: { from: "Member", to: "Billing admin" },
    scopes: { added: ["refunds:approve"], removed: [] },
  },
  occurred_at: "2026-10-08T09:12:44+05:30",
};

/**
 * `initialOpenDepth` sets how deep the tree starts open: `2` opens the top level and its
 * children, and `0` starts fully collapsed.
 *
 * @layout wide
 */
export default function JSONTreeOpenDepth() {
  return (
    <JSONTree
      value={event}
      initialOpenDepth={2}
      label="Audit event"
      className="w-full max-w-xl"
    />
  );
}
