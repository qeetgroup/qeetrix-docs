import { QRCode } from "@qeetrix/ui";

const secret = "JBSWY3DPEHPK3PXP";
const uri = `otpauth://totp/Qeet%20ID:diya%40northwind.in?secret=${secret}&issuer=Qeet%20ID`;

/**
 * An inline SVG, encoded synchronously so it renders on the server with no loading placeholder.
 * It is always dark on a light tile with a four-module quiet zone, in the dark theme too. Name
 * it for what scanning does, not what it contains, and tie a non-camera fallback to it with
 * `aria-describedby`.
 */
export default function QRCodeDefault() {
  return (
    <div className="flex items-center gap-6">
      <QRCode
        value={uri}
        size={168}
        aria-label="Scan with your authenticator app to add Qeet ID"
        aria-describedby="totp-manual-key"
      />
      <div id="totp-manual-key" className="flex max-w-56 flex-col gap-1">
        <span className="text-label font-medium">Can't scan the code?</span>
        <span className="text-caption text-muted-foreground">
          Enter this key in your authenticator app instead:
        </span>
        <span className="font-mono text-label tracking-wider">
          JBSW Y3DP EHPK 3PXP
        </span>
      </div>
    </div>
  );
}
