import { Tabs, TabsContent, TabsList, TabsTrigger } from "@qeetrix/ui";

/**
 * `variant="line"` on `TabsList` puts the tabs on a track with an underline for the selected
 * one, for page- and section-level navigation.
 */
export default function TabsLine() {
  return (
    <Tabs defaultValue="general" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-sm text-muted-foreground">
        Tenant name, slug and data region.
      </TabsContent>
      <TabsContent value="security" className="text-sm text-muted-foreground">
        Passkeys, session length and SSO enforcement.
      </TabsContent>
      <TabsContent value="billing" className="text-sm text-muted-foreground">
        Plan, GSTIN and invoice email.
      </TabsContent>
    </Tabs>
  );
}
