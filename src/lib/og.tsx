import { QeetLogo } from "@qeetrix/icons";
import { generateOGImage } from "fumadocs-ui/og";
import { plainText } from "./metadata";
import { appName } from "./shared";

/** Qeet orange, `color.brand` in @qeetrix/ui's tokens. Satori cannot read CSS variables. */
const QEET_ORANGE = "#F26D0E";

/**
 * A 1200×630 share card on Fumadocs' layout, in Qeet's colours: the mark drawn for dark
 * surfaces (the card is near-black), an orange rule and the site name.
 */
export function ogImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return generateOGImage({
    title,
    description: description ? plainText(description) : undefined,
    site: appName,
    icon: <QeetLogo variant="dark" height={56} />,
    primaryColor: "rgba(242, 109, 14, 0.55)",
    primaryTextColor: QEET_ORANGE,
  });
}
