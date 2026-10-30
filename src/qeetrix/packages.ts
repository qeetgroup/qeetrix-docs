// The packages the docs describe, read from what's installed, so a release changes every mention at
// once. Server-side only: islands import from install.ts instead, which carries no package data.
import icons from "@qeetrix/icons/package.json" with { type: "json" };
import react from "@qeetrix/react/package.json" with { type: "json" };
import tokens from "@qeetrix/tokens/package.json" with { type: "json" };

export const packages = {
  react: { name: react.name, version: react.version },
  tokens: { name: tokens.name, version: tokens.version },
  icons: { name: icons.name, version: icons.version },
} as const;
