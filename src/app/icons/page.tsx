import { iconManifest } from "@qeetrix/icons/manifest";
import iconsPackage from "@qeetrix/icons/package.json";
import type { Metadata } from "next";
import { IconBrowser } from "@/components/icons/icon-browser";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Icons",
  description: `Browse, customise and copy all ${iconManifest.icons.length.toLocaleString("en")} icons in @qeetrix/icons — round and sharp, outline and filled.`,
};

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
