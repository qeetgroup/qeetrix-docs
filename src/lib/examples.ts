/** Curated example source for component pages (server-readable). The matching
 * live render lives in components/component-preview.tsx (client), keyed by slug. */
export const EXAMPLE_CODE: Record<string, string> = {
  button: `import { Button } from "@qeetrix/ui";

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
  badge: `import { Badge } from "@qeetrix/ui";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
  card: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@qeetrix/ui";

<Card>
  <CardHeader>
    <CardTitle>Total revenue</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>₹12,45,000</CardContent>
</Card>`,
  separator: `import { Separator } from "@qeetrix/ui";

<div>Above</div>
<Separator />
<div>Below</div>`,
  input: `import { Input } from "@qeetrix/ui";

<Input type="email" placeholder="you@qeet.in" />`,
  switch: `import { Switch } from "@qeetrix/ui";

<Switch defaultChecked />`,
  checkbox: `import { Checkbox } from "@qeetrix/ui";

<Checkbox defaultChecked />`,
  skeleton: `import { Skeleton } from "@qeetrix/ui";

<Skeleton className="h-4 w-40" />
<Skeleton className="h-4 w-28" />`,
  label: `import { Label, Input } from "@qeetrix/ui";

<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="you@qeet.in" />`,
  alert: `import { Alert, AlertTitle, AlertDescription } from "@qeetrix/ui";

<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>`,
  spinner: `import { Spinner } from "@qeetrix/ui";

<Spinner />`,
  kbd: `import { Kbd } from "@qeetrix/ui";

<Kbd>⌘</Kbd>
<Kbd>K</Kbd>`,
  progress: `import { Progress } from "@qeetrix/ui";

<Progress value={60} />`,
  textarea: `import { Textarea } from "@qeetrix/ui";

<Textarea placeholder="Write a message…" />`,
  blockquote: `import { Blockquote } from "@qeetrix/ui";

<Blockquote attribution="Qeet Group">
  Design is not just what it looks like — design is how it works.
</Blockquote>`,
  chip: `import { Chip } from "@qeetrix/ui";

<Chip>Design</Chip>
<Chip>System</Chip>`,
  banner: `import { Banner } from "@qeetrix/ui";

<Banner>Qeetrix v0.4.0 is now available.</Banner>`,
  toggle: `import { Toggle } from "@qeetrix/ui";

<Toggle>Bold</Toggle>`,
  avatar: `import { Avatar, AvatarFallback } from "@qeetrix/ui";

<Avatar>
  <AvatarFallback>QG</AvatarFallback>
</Avatar>`,
};

export const EXAMPLE_SLUGS = Object.keys(EXAMPLE_CODE);
export const hasExample = (slug: string) => slug in EXAMPLE_CODE;
