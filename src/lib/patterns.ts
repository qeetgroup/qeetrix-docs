export type Pattern = {
  /** URL slug under /patterns. */
  slug: string;
  /** Display title. */
  title: string;
  /** One-line tagline used on cards and as page metadata. */
  description: string;
  /** The recurring UX problem this pattern solves. */
  problem: string;
  /** The recommended composition, naming real @qeetrix/ui pieces. */
  solution: string;
  /** Component slugs this pattern composes — each links to /components/<slug>. */
  components: string[];
  /** What to do. */
  dos: string[];
  /** What to avoid. */
  donts: string[];
  /** Accessibility notes. */
  a11y: string[];
  /** Optional short, copy-pasteable example. */
  example?: string;
};

export const PATTERNS: Pattern[] = [
  {
    slug: "forms-validation",
    title: "Forms & validation",
    description: "Structured input with inline, accessible error messaging on submit and on blur.",
    problem:
      "Users need to enter structured data and recover from mistakes without losing their work or guessing what went wrong. Error handling that only fires on submit — or that shouts on every keystroke — makes the form feel hostile.",
    solution:
      "Compose Form with a Field per control so each input is programmatically bound to its label, hint, and error. Validate on submit and re-validate on blur once a field has been touched; render the error inline beneath the field. Use Input, Select, and Checkbox for the controls and a single primary Button to submit.",
    components: ["form", "field", "input", "select", "checkbox", "button"],
    dos: [
      "Wrap every control in a Field so its label, description, and error are linked.",
      "Validate on submit, then re-validate on blur once a field has been touched.",
      "On a failed submit, report all errors at once and move focus to the first invalid field.",
      'Write errors that say how to fix it ("Enter a work email"), not just that it is wrong.',
    ],
    donts: [
      "Don't disable the submit button until the form is valid — it hides why the user is stuck.",
      "Don't validate aggressively on every keystroke before the field has been left.",
      "Don't signal errors with a red border alone.",
      "Don't clear the user's input when validation fails.",
    ],
    a11y: [
      "Field wires aria-describedby to the hint and error and sets aria-invalid on the control.",
      'Give each error role="alert" (or a live region) so it is announced on submit.',
      "Set the right autocomplete tokens so browsers and password managers can help.",
    ],
    example: `import { Form, Field, Input, Button } from "@qeetrix/ui";

<Form onSubmit={onSubmit}>
  <Field name="email" label="Work email" error={errors.email}>
    <Input type="email" autoComplete="username" />
  </Field>
  <Field name="password" label="Password" error={errors.password}>
    <Input type="password" autoComplete="current-password" />
  </Field>
  <Button type="submit">Create account</Button>
</Form>`,
  },
  {
    slug: "empty-states",
    title: "Empty states",
    description:
      "Turn a blank screen into a clear next step with a heading, context, and one action.",
    problem:
      "A screen with no data yet reads as broken or as a failed load; the user can't tell whether to wait or to act. First-run empty and filtered-empty look identical unless you design them apart.",
    solution:
      'Use EmptyState for a blank region — an optional icon, a one-line heading, a sentence of context, and a single primary action — or the page-state block for a whole page. Distinguish first-run ("Create your first project") from filtered-empty ("No results for \'atlas\'").',
    components: ["empty-state", "button", "icon", "card"],
    dos: [
      "Distinguish first-run empty from search/filter empty with different copy and actions.",
      "Offer exactly one primary action that resolves the state.",
      "Keep the copy specific and encouraging for the surface it sits on.",
    ],
    donts: [
      "Don't show an empty state where a loading Skeleton belongs — confirm the fetch resolved first.",
      "Don't stack multiple competing buttons.",
      'Don\'t reuse one generic "No data" for both search-empty and first-run.',
    ],
    a11y: [
      "Make the message a real heading in the page outline, not just large text.",
      "Mark a decorative illustration or Icon aria-hidden.",
      "Ensure the action is a real focusable Button.",
    ],
    example: `import { EmptyState, Button } from "@qeetrix/ui";

<EmptyState
  title="No projects yet"
  description="Create your first project to start shipping."
  action={<Button>New project</Button>}
/>`,
  },
  {
    slug: "loading-skeletons",
    title: "Loading & skeletons",
    description: "Hold layout with shaped placeholders so content swaps in without a jump.",
    problem:
      "Content that pops in after a fetch shifts the layout and makes the page feel janky, while a bare spinner gives no sense of what is coming or how much.",
    solution:
      "Reserve space with Skeleton placeholders shaped like the real content for known-shape regions (cards, tables, avatars). Use Spinner only for indeterminate, in-place waits such as a button submitting; use Progress when the percentage is known, like an upload.",
    components: ["skeleton", "spinner", "progress"],
    dos: [
      "Match the skeleton's shape and count to the real content so the swap is seamless.",
      "Prefer skeletons for full regions; reserve the Spinner for inline, button-level waits.",
      "Use a determinate Progress when the duration is known (uploads, imports).",
      "Keep placeholders up for a minimum beat to avoid a flash if data returns instantly.",
    ],
    donts: [
      "Don't layout-shift — the skeleton must occupy the same box as the loaded content.",
      "Don't animate so aggressively it distracts; respect prefers-reduced-motion.",
      "Don't leave a skeleton up forever — fall through to an error or empty state on failure.",
    ],
    a11y: [
      'Mark the loading region aria-busy="true" and swap it for content when ready.',
      "Skeletons are decorative — hide them from the accessibility tree with aria-hidden.",
      'Give the Spinner an accessible label such as "Loading".',
    ],
    example: `import { Skeleton } from "@qeetrix/ui";

<div aria-busy className="space-y-2">
  <Skeleton className="h-5 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>`,
  },
  {
    slug: "data-tables",
    title: "Data tables",
    description: "Sort, filter, paginate, and act on tabular data without overwhelming the screen.",
    problem:
      "Large tabular datasets need sorting, filtering, pagination, and row actions, and they must stay usable on small screens — but a heavy grid is overkill for three static rows.",
    solution:
      "Build interactive grids on DataTable (sort, filter, selection, pagination); use the plain Table for static, read-only data. Pair with an Input for search, Badge for cell status, a DropdownMenu for per-row actions, and a pagination bar for large sets.",
    components: ["data-table", "table", "input", "badge", "dropdown-menu", "pagination-bar"],
    dos: [
      "Use DataTable when you need sort/filter/select; use Table for static content.",
      "Provide a search input and clear pagination for large sets.",
      "Put row actions behind a DropdownMenu triggered by a labelled icon button.",
      "Right-align numeric columns and keep the header row sticky on long scrolls.",
    ],
    donts: [
      "Don't paginate client-side over thousands of rows — page on the server.",
      "Don't hide the only way to act on a row behind hover-only affordances.",
      "Don't reach for a full DataTable to render three static rows.",
      "Don't drop the column header text; icon-only sort controls read as unlabelled.",
    ],
    a11y: [
      "Use real th scope headers and set aria-sort on the sorted column.",
      "Give every icon-only row-action button an aria-label.",
      "Ensure keyboard users can reach sort, filter, pagination, and row menus in order.",
    ],
    example: `import { DataTable } from "@qeetrix/ui";

<DataTable
  data={rows}
  columns={columns}
  enableSorting
  enableRowSelection
  pageSize={25}
/>`,
  },
  {
    slug: "auth-flows",
    title: "Auth flows",
    description:
      "Sign-in, sign-up, passkey, and OTP on a focused, trustworthy single-column canvas.",
    problem:
      "Sign-in, sign-up, passkey, and OTP screens must feel focused and trustworthy, and every product must behave identically as a Qeet ID relying party rather than reinventing auth.",
    solution:
      "Use the auth block — AuthShell with LoginForm, SignupForm, ForgotPasswordForm, and OtpForm — for a centred single-column canvas. It composes Field, Input, Button, Checkbox, and OtpInput. Lead with passkeys, keep email a clear secondary path, and show a PasswordStrengthMeter on sign-up.",
    components: ["form", "field", "input", "button", "otp-input", "password-strength-meter"],
    dos: [
      "Reach for the auth block first rather than rebuilding a login card.",
      "Lead with the passkey / primary provider; make email a clear secondary path.",
      "Show a PasswordStrengthMeter on sign-up and reflect server errors inline.",
      "Keep OTP entry in a dedicated OtpInput with autofocus and paste support.",
    ],
    donts: [
      "Don't roll your own auth — every product is a Qeet ID OIDC relying party.",
      "Don't crowd the auth canvas with marketing, nav, or multiple columns.",
      "Don't reveal whether an email is registered in error copy (enumeration).",
      "Don't block paste in password or OTP fields.",
    ],
    a11y: [
      "Set autocomplete tokens: username, current-password, new-password, one-time-code.",
      "Announce auth failures via a live region, not a colour change alone.",
      "Make the show/hide-password control a labelled button, not a bare icon.",
    ],
    example: `import { AuthShell, LoginForm } from "@qeetrix/ui/blocks/auth";

<AuthShell title="Sign in to Qeet ID">
  <LoginForm passkeyFirst onSubmit={signIn} />
</AuthShell>`,
  },
  {
    slug: "notifications",
    title: "Notifications & toasts",
    description:
      "Confirm background outcomes without stealing focus; stack and auto-dismiss politely.",
    problem:
      "Background outcomes — saved, sent, failed — need to be confirmed without stealing focus or blocking the user's next action, and critical messages must not vanish before they are read.",
    solution:
      "Use Toast for transient, non-blocking confirmations that auto-dismiss; use an inline Alert for persistent messages tied to a region; use the NotificationCenter for durable history and a Banner for system-wide notices. Reserve AlertDialog for outcomes that must be acknowledged.",
    components: ["toast", "alert", "notification", "notification-center", "banner"],
    dos: [
      "Use Toast for transient success/info — one line plus an optional action.",
      "Use an inline Alert for errors that belong to a specific form or region.",
      "Give failure toasts a Retry action instead of a dead-end message.",
      "Auto-dismiss success after a few seconds while still allowing manual dismiss.",
    ],
    donts: [
      "Don't put critical, must-read information only in a toast that disappears.",
      "Don't stack a wall of toasts — queue or collapse them.",
      "Don't use a toast to ask a question that needs a decision (use AlertDialog).",
      "Don't auto-dismiss error toasts the user may still need to read or act on.",
    ],
    a11y: [
      "Render toasts in an aria-live region — polite for success, assertive for errors.",
      "Don't auto-dismiss so fast that a screen-reader user cannot hear it.",
      "Keep any toast action keyboard-reachable while the toast is visible.",
    ],
    example: `import { toast } from "@qeetrix/ui";

toast.success("Invite sent");
toast.error("Couldn't send invite", {
  action: { label: "Retry", onClick: resend },
});`,
  },
  {
    slug: "destructive-actions",
    title: "Confirmation & destructive actions",
    description:
      "Gate irreversible actions behind a dialog that names the consequence before it happens.",
    problem:
      "Irreversible actions — delete, revoke, disable — are easy to trigger by accident and impossible to undo, yet confirming every trivial action trains users to click straight through.",
    solution:
      "Gate the action behind an AlertDialog that names the exact consequence, uses the destructive Button variant for confirm, and — for high-blast-radius cases — requires typing the resource name in an Input to confirm. Prefer a toast with Undo where reversal is cheap.",
    components: ["alert-dialog", "button", "dialog", "input"],
    dos: [
      "Name the specific object and consequence (\"Delete project 'atlas'? Removes 4 environments.\").",
      "Use the destructive Button variant only for the confirming action.",
      "For irreversible, high-impact actions, require typing the resource name.",
      "Prefer a toast with Undo when the action is cheaply reversible.",
    ],
    donts: [
      "Don't make the destructive button the default or initially-focused action.",
      'Don\'t ship a generic "Are you sure?" with no named consequence.',
      "Don't rely on colour alone to separate confirm from cancel.",
      "Don't confirm trivial, reversible actions — it trains users to click through.",
    ],
    a11y: [
      "Use AlertDialog (role alertdialog) so it is announced and traps focus.",
      "Move initial focus to the safe action (Cancel), not the destructive one.",
      "Ensure Escape and the backdrop cancel — never confirm.",
    ],
    example: `import { AlertDialog, Button } from "@qeetrix/ui";

<AlertDialog>
  <AlertDialog.Trigger render={<Button variant="destructive">Delete</Button>} />
  <AlertDialog.Content>
    <AlertDialog.Title>Delete project "atlas"?</AlertDialog.Title>
    <AlertDialog.Description>
      This permanently removes 4 environments and cannot be undone.
    </AlertDialog.Description>
    <AlertDialog.Close render={<Button variant="outline">Cancel</Button>} />
    <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
  </AlertDialog.Content>
</AlertDialog>`,
  },
];

export const getPattern = (slug: string): Pattern | undefined =>
  PATTERNS.find((p) => p.slug === slug);
