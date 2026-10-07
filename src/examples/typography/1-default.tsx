import { Typography } from "@qeetrix/ui";

/**
 * The variant picks both the style and the element: `h2` renders an `<h2>`. To keep the
 * document outline right, change the element with `as` and keep the look, as the `h3` variant
 * here renders an `<h2>`. No variant has outer margins; the parent's gap spaces them.
 */
export default function TypographyDefault() {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <Typography variant="h1">Security settings</Typography>
      <Typography variant="lead">
        Control how people in Northwind Retail sign in to Qeet ID and every app
        connected to it.
      </Typography>
      <Typography variant="h3" as="h2" className="mt-4">
        Passkeys
      </Typography>
      <Typography>
        Passkeys replace passwords with a fingerprint, face or screen lock. They
        can't be phished, and there's nothing for anyone to remember.
      </Typography>
      <Typography variant="muted">
        214 of 260 members have enrolled at least one passkey.
      </Typography>
    </div>
  );
}
