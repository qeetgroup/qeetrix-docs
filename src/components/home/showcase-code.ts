/**
 * The Code view of each showcase group: the essentials of what its preview renders, written the
 * way an app would. Highlighted on the server (see component-showcase.tsx).
 */
export const showcaseCode = {
  components: `import { Badge, Button, Progress, Switch } from "@qeetrix/ui";

export function Example() {
  return (
    <>
      <Button>Primary button</Button>
      <Button variant="secondary">Secondary button</Button>
      <Badge variant="success">Success</Badge>
      <Switch defaultChecked aria-label="Enable feature" />
      <Progress value={80} label="Uploading" />
    </>
  );
}`,
  layout: `import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@qeetrix/ui";

<Card>
  <CardHeader>
    <CardTitle>Invite your team</CardTitle>
    <CardDescription>Members sign in with a passkey on every device.</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button size="sm">Send invites</Button>
  </CardFooter>
</Card>`,
  navigation: `import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";

<SegmentedControl defaultValue="week" aria-label="Range">
  <SegmentedControlItem value="day">Day</SegmentedControlItem>
  <SegmentedControlItem value="week">Week</SegmentedControlItem>
  <SegmentedControlItem value="month">Month</SegmentedControlItem>
</SegmentedControl>`,
  forms: `import { Field, FieldControl, FieldDescription, FieldLabel, Textarea } from "@qeetrix/ui";

<Field>
  <FieldLabel>Note</FieldLabel>
  <FieldControl render={<Textarea placeholder="Add a note…" />} />
  <FieldDescription>Visible to admins only.</FieldDescription>
</Field>`,
  "data-display": `import { StatusPill, Table, TableBody, TableCell, TableRow } from "@qeetrix/ui";

<Table aria-label="Members">
  <TableBody>
    <TableRow>
      <TableCell>Rohan Mehta</TableCell>
      <TableCell><StatusPill status="active" /></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  overlays: `import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@qeetrix/ui";

<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>Share view</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Share this view</PopoverTitle>
    <PopoverDescription>Anyone in the tenant with the link can open it.</PopoverDescription>
  </PopoverContent>
</Popover>`,
  feedback: `import { TriangleAlertIcon } from "@qeetrix/icons";
import { Alert, AlertDescription, AlertTitle } from "@qeetrix/ui";

<Alert variant="warning" role="status">
  <TriangleAlertIcon aria-hidden />
  <AlertTitle>API key expires in 7 days</AlertTitle>
  <AlertDescription>Rotate it before it stops working.</AlertDescription>
</Alert>`,
  media: `import { Avatar, AvatarFallback, QRCode } from "@qeetrix/ui";

<Avatar name="Ananya Iyer">
  <AvatarFallback />
</Avatar>
<QRCode value="https://ui.qeet.in" size={96} aria-label="ui.qeet.in" />`,
  utilities: `import { CopyButton, Kbd, KbdGroup } from "@qeetrix/ui";

<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
<CopyButton value="qk_test_Ab91…" />`,
} as const;
