import { iconManifest } from "@qeetrix/icons/manifest";
import iconsPackage from "@qeetrix/icons/package.json";
import { IconBrowser } from "@/components/icons/icon-browser";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/lib/metadata";
import { iconsDescription } from "@/lib/shared";
import { links } from "@/lib/site-links";

export const metadata = pageMetadata({
  title: "Icons",
  description: iconsDescription(iconManifest.icons.length),
  path: links.iconBrowser,
  image: "/og/icons/image.png",
});

/**
 * The icon browser. The catalogue and drawings load from public/icon-data, written from the
 * installed @qeetrix/icons by scripts/generate-icons.mjs; the version picks the matching files.
 */
export default function IconsPage() {
  return (
    <>
      <SiteHeader />
      <IconBrowser
        version={iconsPackage.version}
        total={iconManifest.icons.length}
      />
    </>
  );
}
