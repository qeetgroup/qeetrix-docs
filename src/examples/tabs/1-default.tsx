import { MonitorSmartphoneIcon, UserIcon } from "@qeetrix/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@qeetrix/ui";

/** The contained style, for tabs inside a card or a panel. */
export default function TabsDefault() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">
          <UserIcon aria-hidden />
          Overview
        </TabsTrigger>
        <TabsTrigger value="sessions">
          <MonitorSmartphoneIcon aria-hidden />
          Sessions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        Rohan Mehta · Admin · joined 12 Mar 2025.
      </TabsContent>
      <TabsContent value="sessions" className="text-sm text-muted-foreground">
        3 active sessions: MacBook Pro, iPhone 15 and a Chrome on Windows.
      </TabsContent>
    </Tabs>
  );
}
