"use client";

import { FileClockIcon } from "@qeetrix/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@qeetrix/ui";

const sections = [
  {
    label: "Security",
    links: [
      { name: "Policies", description: "MFA, session length and IP rules" },
      { name: "Passkeys", description: "Registered authenticators per user" },
      { name: "Sessions", description: "Active sign-ins across devices" },
    ],
  },
  {
    label: "Integrations",
    links: [
      { name: "Single sign-on", description: "SAML and OIDC with your IdP" },
      { name: "SCIM provisioning", description: "Create and remove users" },
      { name: "Webhooks", description: "user.created, session.revoked…" },
    ],
  },
];

/**
 * Navigation inside an app. `active` on a `NavigationMenuLink` marks the current page: it sets
 * `aria-current="page"` and takes the same Qeet tint as the selected item in a sidebar.
 */
export default function NavigationMenuCurrentPage() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            active
            className={navigationMenuTriggerStyle()}
          >
            Users
          </NavigationMenuLink>
        </NavigationMenuItem>
        {sections.map((section) => (
          <NavigationMenuItem key={section.label}>
            <NavigationMenuTrigger>{section.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-72 flex-col gap-1">
                {section.links.map((link) => (
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
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <FileClockIcon aria-hidden />
            Audit log
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
