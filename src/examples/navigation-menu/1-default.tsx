"use client";

import {
  BellRingIcon,
  FingerprintPatternIcon,
  IndianRupeeIcon,
  ScrollTextIcon,
} from "@qeetrix/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@qeetrix/ui";

const products = [
  {
    name: "Qeet ID",
    description: "Passkeys-first sign-in, SSO and SCIM for every tenant.",
    icon: FingerprintPatternIcon,
  },
  {
    name: "Qeet Pay",
    description: "UPI, cards and NACH with GST-ready invoicing.",
    icon: IndianRupeeIcon,
  },
  {
    name: "Qeet Logs",
    description: "Logs, metrics and traces, stored in India.",
    icon: ScrollTextIcon,
  },
  {
    name: "Qeet Notify",
    description: "Email, SMS, WhatsApp and push from one API.",
    icon: BellRingIcon,
  },
];

const developers = [
  { name: "API reference", description: "Endpoints, errors and limits" },
  { name: "SDKs", description: "Go, Node and React" },
  { name: "Webhooks", description: "Signed events and retries" },
];

/**
 * Site navigation. Each trigger opens its content in one shared popup that morphs between items;
 * a plain link styled with `navigationMenuTriggerStyle()` sits in line with the triggers.
 */
export default function NavigationMenuDefault() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[min(34rem,calc(100vw-3rem))] gap-1 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.name}>
                  <NavigationMenuLink href="#" className="flex-row gap-3">
                    <product.icon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-brand"
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="text-muted-foreground">
                        {product.description}
                      </span>
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-64 flex-col gap-1">
              {developers.map((link) => (
                <li key={link.name}>
                  <NavigationMenuLink href="#">
                    <span className="font-medium text-foreground">
                      {link.name}
                    </span>
                    <span className="text-muted-foreground">
                      {link.description}
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
