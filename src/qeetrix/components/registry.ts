// The components documented so far, in the navigation's order: each gets five pages, one per tab.
// Written by scripts/components.ts with the route ([component]/[...tab].astro), from one list.
import { accordion } from "./accordion/doc";
import { alert } from "./alert/doc";
import { appShell } from "./app-shell/doc";
import { avatar } from "./avatar/doc";
import { avatarGroup } from "./avatar-group/doc";
import { badge } from "./badge/doc";
import { box } from "./box/doc";
import { breadcrumb } from "./breadcrumb/doc";
import { button } from "./button/doc";
import { calendar } from "./calendar/doc";
import { card } from "./card/doc";
import { checkbox } from "./checkbox/doc";
import { codeBlock } from "./code-block/doc";
import { collapsible } from "./collapsible/doc";
import { combobox } from "./combobox/doc";
import { commandPalette } from "./command-palette/doc";
import { contextMenu } from "./context-menu/doc";
import { copyButton } from "./copy-button/doc";
import { datePicker } from "./date-picker/doc";
import { dateRangePicker } from "./date-range-picker/doc";
import { descriptionList } from "./description-list/doc";
import { dialog } from "./dialog/doc";
import { drawer } from "./drawer/doc";
import { emptyState } from "./empty-state/doc";
import { fileUpload } from "./file-upload/doc";
import { form } from "./form/doc";
import { grid } from "./grid/doc";
import { heading } from "./heading/doc";
import { iconButton } from "./icon-button/doc";
import { inline } from "./inline/doc";
import { input } from "./input/doc";
import { link } from "./link/doc";
import { menu } from "./menu/doc";
import { meter } from "./meter/doc";
import { numberField } from "./number-field/doc";
import { otpInput } from "./otp-input/doc";
import { pageHeader } from "./page-header/doc";
import { pagination } from "./pagination/doc";
import { passwordInput } from "./password-input/doc";
import { popover } from "./popover/doc";
import { progress } from "./progress/doc";
import { radio } from "./radio/doc";
import { rangeCalendar } from "./range-calendar/doc";
import { scrollArea } from "./scroll-area/doc";
import { select } from "./select/doc";
import { separator } from "./separator/doc";
import { sidebar } from "./sidebar/doc";
import { skeleton } from "./skeleton/doc";
import { skipLink } from "./skip-link/doc";
import { slider } from "./slider/doc";
import { spinner } from "./spinner/doc";
import { stack } from "./stack/doc";
import { stat } from "./stat/doc";
import { steps } from "./steps/doc";
import { switchDoc } from "./switch/doc";
import { table } from "./table/doc";
import { tabs } from "./tabs/doc";
import { text } from "./text/doc";
import { textField } from "./text-field/doc";
import { textarea } from "./textarea/doc";
import { timeline } from "./timeline/doc";
import { toast } from "./toast/doc";
import { toggle } from "./toggle/doc";
import { toggleGroup } from "./toggle-group/doc";
import { tooltip } from "./tooltip/doc";
import { topBar } from "./top-bar/doc";
import { treeView } from "./tree-view/doc";
import type { ComponentDoc } from "./types";
import { visuallyHidden } from "./visually-hidden/doc";

export const DOCS: ComponentDoc[] = [
  button,
  iconButton,
  toggle,
  toggleGroup,
  copyButton,
  commandPalette,
  textField,
  input,
  textarea,
  select,
  combobox,
  checkbox,
  radio,
  switchDoc,
  slider,
  numberField,
  passwordInput,
  otpInput,
  fileUpload,
  form,
  calendar,
  rangeCalendar,
  datePicker,
  dateRangePicker,
  dialog,
  drawer,
  popover,
  tooltip,
  menu,
  contextMenu,
  toast,
  tabs,
  accordion,
  collapsible,
  breadcrumb,
  pagination,
  steps,
  table,
  badge,
  avatar,
  avatarGroup,
  stat,
  descriptionList,
  timeline,
  treeView,
  codeBlock,
  alert,
  progress,
  meter,
  spinner,
  skeleton,
  emptyState,
  appShell,
  topBar,
  sidebar,
  pageHeader,
  box,
  stack,
  inline,
  grid,
  card,
  separator,
  scrollArea,
  heading,
  text,
  link,
  skipLink,
  visuallyHidden,
];

/** The components whose Examples tab opens with a playground (the route names each island). */
export const PLAYGROUNDS = new Set([
  "button",
  "icon-button",
  "toggle",
  "toggle-group",
  "copy-button",
  "text-field",
  "input",
  "textarea",
  "select",
  "combobox",
  "checkbox",
  "radio",
  "switch",
  "slider",
  "number-field",
  "password-input",
  "otp-input",
  "calendar",
  "range-calendar",
  "date-picker",
  "date-range-picker",
  "dialog",
  "drawer",
  "popover",
  "tooltip",
  "menu",
  "toast",
  "tabs",
  "accordion",
  "collapsible",
  "breadcrumb",
  "pagination",
  "steps",
  "table",
  "badge",
  "avatar",
  "description-list",
  "timeline",
  "tree-view",
  "code-block",
  "alert",
  "progress",
  "meter",
  "spinner",
  "empty-state",
  "box",
  "stack",
  "inline",
  "grid",
  "card",
  "separator",
]);

/** The components whose examples run live (tooltips, presses, copies): the route names each island. */
export const LIVE = new Set([
  "icon-button",
  "toggle",
  "toggle-group",
  "copy-button",
  "command-palette",
  "text-field",
  "input",
  "textarea",
  "select",
  "combobox",
  "checkbox",
  "radio",
  "switch",
  "slider",
  "number-field",
  "password-input",
  "otp-input",
  "file-upload",
  "form",
  "calendar",
  "range-calendar",
  "date-picker",
  "date-range-picker",
  "dialog",
  "drawer",
  "popover",
  "tooltip",
  "menu",
  "context-menu",
  "toast",
  "tabs",
  "accordion",
  "collapsible",
  "pagination",
  "steps",
  "table",
  "avatar",
  "avatar-group",
  "description-list",
  "tree-view",
  "code-block",
  "alert",
  "progress",
  "empty-state",
  "app-shell",
  "sidebar",
  "page-header",
  "scroll-area",
]);
