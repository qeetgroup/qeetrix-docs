/**
 * How to install and set up Qeetrix, as the home page and the guides show it. @qeetrix/icons comes
 * with @qeetrix/react (it's a dependency), and package managers add the @base-ui/react peer.
 */
export const install = {
  packages: "@qeetrix/react @qeetrix/tokens",
  css: [
    '@import "@qeetrix/tokens/tokens.css";',
    '@import "@qeetrix/react/styles.css" layer(components);',
  ],
  usage: ['import { Button } from "@qeetrix/react";', "", "<Button>Get started</Button>"],
} as const;
