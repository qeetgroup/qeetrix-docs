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

// Qeetrix for iOS and Android aren't on npm, so there's nothing installed to read: raise a version here
// when that library releases (qeetrix-ios's VERSION, qeetrix-android's qeetrix.version in gradle.properties).
export const nativeLibraries = {
  ios: { name: "Qeetrix for iOS", version: "0.3.0" },
  android: { name: "Qeetrix for Android", version: "0.3.0" },
} as const;
