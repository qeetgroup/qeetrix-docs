// The theme, chosen from a menu at the foot of the page, the docs navigation or the mobile menu: a
// quiet icon button showing the current choice, opening Light, Dark and System with an Ember check
// on the current one, never in the header. It draws Qeetrix's ThemeSwitcher (menu variant), which
// needs React to run, and the docs chrome runs none. Rendered to HTML: menu.ts opens it and
// theme-menu.ts applies the choice; System follows the device (colorSchemeScript's followSystem).
import type { IconProps } from "@qeetrix/icons";
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { MonitorIcon } from "@qeetrix/icons/icons/monitor";
import { MoonIcon } from "@qeetrix/icons/icons/moon";
import { SunIcon } from "@qeetrix/icons/icons/sun";
import { IconButton } from "@qeetrix/react";
import { MenuPopup } from "../components/StaticMenu";

const options = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "system", label: "System", icon: MonitorIcon },
] as const;

/** All three icons in the trigger; the stylesheet shows the one for the choice on <html>. */
function ChoiceIcons(props: IconProps<"outline">) {
  return (
    <>
      {options.map((o) => (
        <o.icon key={o.id} {...props} data-scheme-icon={o.id} />
      ))}
    </>
  );
}

export function ThemeMenu({ id, side = "top" }: { id: string; side?: "top" | "bottom" }) {
  return (
    <>
      <IconButton
        icon={ChoiceIcons}
        aria-label="Theme"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls={id}
        variant="ghost"
        tone="neutral"
        tooltip={false}
        data-site-menu
        data-theme-trigger
      />
      <MenuPopup id={id} label="Theme" side={side} align="end" className="site-theme-menu">
        {/* biome-ignore lint/a11y/useSemanticElements: a menu's radio group (the ARIA menu pattern); a fieldset can't sit in a menu. */}
        <div role="group">
          {options.map((o) => (
            <div
              key={o.id}
              role="menuitemradio"
              aria-checked={o.id === "system"}
              className="qx-menu-item"
              tabIndex={-1}
              data-theme-choice={o.id}
            >
              <span className="qx-menu-item-label">
                <span className="site-theme-item">
                  <o.icon size={16} aria-hidden />
                  {o.label}
                  <CheckIcon size={16} aria-hidden className="site-theme-check" />
                </span>
              </span>
            </div>
          ))}
        </div>
      </MenuPopup>
    </>
  );
}
