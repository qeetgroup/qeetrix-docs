import { QRCode } from "@qeetrix/ui";

const upi =
  "upi://pay?pa=northwind@hdfcbank&pn=Northwind%20Retail&am=2926.40&cu=INR&tn=Order%20NW-10482";

/**
 * A UPI payment code with its amount and payee in text beside it. `size` is the tile's edge in
 * pixels, quiet zone included, and the tile shrinks to fit a narrower container.
 */
export default function QRCodePayment() {
  return (
    <div className="flex w-64 flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center">
      <QRCode
        value={upi}
        size={200}
        aria-label="Scan to pay ₹2,926.40 to Northwind Retail"
      />
      <div>
        <div className="font-heading text-xl font-semibold">₹2,926.40</div>
        <div className="text-caption text-muted-foreground">
          Northwind Retail · Order NW-10482
        </div>
      </div>
    </div>
  );
}
