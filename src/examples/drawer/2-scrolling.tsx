import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@qeetrix/ui";

const payments = [
  ["Aarav Mehta", "UPI", "₹2,499"],
  ["Diya Sharma", "Card ••4242", "₹18,750"],
  ["Kabir Rao", "UPI", "₹640"],
  ["Meera Iyer", "Netbanking", "₹9,200"],
  ["Rohan Gupta", "UPI", "₹1,150"],
  ["Ananya Nair", "Card ••1881", "₹32,000"],
  ["Vikram Singh", "UPI", "₹4,780"],
  ["Ishita Bose", "Wallet", "₹999"],
  ["Arjun Pillai", "UPI", "₹12,300"],
  ["Sneha Kulkarni", "Card ••5100", "₹6,450"],
  ["Farhan Qureshi", "UPI", "₹2,050"],
  ["Pooja Reddy", "Netbanking", "₹15,600"],
];

/**
 * Wrap long content in `DrawerBody` and only that region scrolls, so the title and the actions
 * stay in place.
 *
 * @title Scrolling body
 */
export default function DrawerScrolling() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Today's payments
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Today's payments</DrawerTitle>
          <DrawerDescription>
            {payments.length} captured payments, settling tomorrow.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ul className="divide-y divide-border">
            {payments.map(([name, method, amount]) => (
              <li
                key={name}
                className="flex items-center justify-between py-2.5"
              >
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-caption text-muted-foreground">{method}</p>
                </div>
                <span className="tabular-nums">{amount}</span>
              </li>
            ))}
          </ul>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
