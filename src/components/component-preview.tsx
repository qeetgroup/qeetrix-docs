"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Banner,
  Blockquote,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Input,
  Kbd,
  Label,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Textarea,
  Toggle,
} from "@qeetrix/ui";
import { ArrowRight } from "lucide-react";

const PREVIEWS: Record<string, () => React.ReactNode> = {
  button: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
        <Button>
          Continue <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
  card: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Total revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">₹12,45,000</CardContent>
    </Card>
  ),
  separator: () => (
    <div className="w-64 text-center text-sm">
      <p>Above</p>
      <Separator className="my-3" />
      <p>Below</p>
    </div>
  ),
  input: () => <Input type="email" placeholder="you@qeet.in" className="w-64" />,
  switch: () => <Switch defaultChecked />,
  checkbox: () => (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked id="demo-check" />
      <Label htmlFor="demo-check">Accept terms</Label>
    </div>
  ),
  skeleton: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-28" />
    </div>
  ),
  label: () => (
    <div className="grid w-64 gap-1.5">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" placeholder="you@qeet.in" />
    </div>
  ),
  alert: () => (
    <Alert className="w-80">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
  spinner: () => <Spinner />,
  kbd: () => (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
  progress: () => <Progress value={60} className="w-64" />,
  textarea: () => <Textarea placeholder="Write a message…" className="w-64" />,
  blockquote: () => (
    <Blockquote attribution="Qeet Group" className="max-w-sm">
      Design is not just what it looks like — design is how it works.
    </Blockquote>
  ),
  chip: () => (
    <div className="flex flex-wrap gap-2">
      <Chip>Design</Chip>
      <Chip>System</Chip>
      <Chip>Tokens</Chip>
    </div>
  ),
  banner: () => <Banner className="w-80">Qeetrix v0.4.0 is now available.</Banner>,
  toggle: () => <Toggle>Bold</Toggle>,
  avatar: () => (
    <Avatar>
      <AvatarFallback>QG</AvatarFallback>
    </Avatar>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  const render = PREVIEWS[slug];
  if (!render) return null;
  return (
    <div className="flex min-h-40 flex-wrap items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 shadow-rest">
      {render()}
    </div>
  );
}
