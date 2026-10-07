import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@qeetrix/ui";

const details = [
  { label: "Beneficiary", value: "Northwind Retail Pvt Ltd" },
  { label: "Account", value: "HDFC Bank ••4821" },
  { label: "Reference", value: "PO-7F3A-1124" },
];

/**
 * A bottom sheet for mobile layouts. It slides up from the bottom edge and closes when swiped
 * down, as well as with Escape, the close button or a click on the backdrop.
 */
export default function DrawerDefault() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Review payout</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Approve payout of ₹1,24,500?</DrawerTitle>
          <DrawerDescription>
            It goes out with the next settlement cycle, today at 6:00 pm IST.
          </DrawerDescription>
        </DrawerHeader>
        <dl className="mx-4 divide-y divide-border rounded-lg border border-border">
          {details.map((row) => (
            <div
              key={row.label}
              className="flex justify-between gap-4 px-3 py-2"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Approve payout</DrawerClose>
          <DrawerClose render={<Button variant="outline" />}>
            Not now
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
