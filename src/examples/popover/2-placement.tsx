import { BellIcon } from "@qeetrix/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@qeetrix/ui";

const notifications = [
  {
    id: "n1",
    text: "Payout of ₹1,24,500 sent to HDFC Bank ••4821",
    time: "2 min ago",
  },
  {
    id: "n2",
    text: "Kabir Rao signed in from a new device in Pune",
    time: "1 hr ago",
  },
  { id: "n3", text: "Invoice INV-2041 is 3 days overdue", time: "Yesterday" },
];

/**
 * `side` picks the edge of the trigger the panel opens from, and `align` lines it up along that
 * edge. A trigger at the end of a header opens below with `align="end"`, so the panel stays
 * under the header instead of hanging past it.
 */
export default function PopoverPlacement() {
  return (
    <div className="flex w-96 items-center justify-between rounded-lg border border-border bg-card px-4 py-2">
      <span className="text-label font-medium">Northwind Retail</span>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Notifications" />
          }
        >
          <BellIcon aria-hidden />
        </PopoverTrigger>
        <PopoverContent side="bottom" align="end" className="w-80 p-0">
          <PopoverTitle className="border-b border-border px-4 py-3">
            Notifications
          </PopoverTitle>
          <ul className="divide-y divide-border">
            {notifications.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <p className="text-sm text-foreground">{item.text}</p>
                <p className="text-caption text-muted-foreground">
                  {item.time}
                </p>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
