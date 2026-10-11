import { iconManifest } from "@qeetrix/icons/manifest";
import { ogImage } from "@/lib/og";
import { iconsDescription } from "@/lib/shared";

export const revalidate = false;

export function GET() {
  return ogImage({
    title: "Icons",
    description: iconsDescription(iconManifest.icons.length),
  });
}
