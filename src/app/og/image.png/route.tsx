import { ogImage } from "@/lib/og";
import { appDescription } from "@/lib/shared";

export const revalidate = false;

export function GET() {
  return ogImage({
    title: "One system. Every interface.",
    description: appDescription,
  });
}
