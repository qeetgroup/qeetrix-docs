// Each component category's page, beyond its cards (components.ts): a headline for the cards, and
// "Which one" — what you need, and the component for it.
export const categoryPages: Record<
  string,
  { headline: string; which: Array<[need: string, use: string]> }
> = {
  layout: {
    headline: "Seven ways to lay out a screen.",
    which: [
      ["Items in a column, evenly spaced", "Stack"],
      ["Items in a row that wraps", "Inline"],
      ["Columns that change with the screen", "Grid"],
      ["A titled, ruled surface", "Card"],
      ["Padding and a surface, nothing else", "Box"],
      ["A rule between two parts", "Separator"],
      ["A list taller than its space", "Scroll area"],
    ],
  },
  type: {
    headline: "Words, at every level.",
    which: [
      ["A page or section title", "Heading"],
      ["Running text, labels and captions", "Text"],
      ["Words that go somewhere", "Link"],
      ["A way past the navigation, for the keyboard", "Skip link"],
      ["Words only a screen reader hears", "Visually hidden"],
    ],
  },
  actions: {
    headline: "Six ways to act.",
    which: [
      ["The main action of a region", "Button"],
      ["An action as an icon, in a toolbar", "Icon button"],
      ["A tool that's pressed or not", "Toggle"],
      ["One or several of a few options", "Toggle group"],
      ["Copying a key, an id or a command", "Copy button"],
      ["Finding any action by its name", "Command palette"],
    ],
  },
  forms: {
    headline: "Every way to ask.",
    which: [
      ["A labelled text answer", "Text field"],
      ["An input inside your own field", "Input"],
      ["Several lines of text", "Textarea"],
      ["One option from a long list", "Select"],
      ["One option, found by typing", "Combobox"],
      ["Yes or no, or several of a list", "Checkbox"],
      ["One of a few, all in view", "Radio"],
      ["A setting that takes effect at once", "Switch"],
      ["A value in a range", "Slider"],
      ["A number, with steps", "Number field"],
      ["A password, with show", "Password input"],
      ["A one-time code", "OTP input"],
      ["Files", "File upload"],
      ["Validation and an error summary", "Form"],
    ],
  },
  dates: {
    headline: "Days and ranges.",
    which: [
      ["A date, always in view", "Calendar"],
      ["A range, always in view", "Range calendar"],
      ["A date in a form", "Date picker"],
      ["A range in a form", "Date range picker"],
    ],
  },
  overlays: {
    headline: "Above the page, briefly.",
    which: [
      ["A decision that stops the page", "Dialog"],
      ["A task beside the page", "Drawer"],
      ["Rich content from a trigger", "Popover"],
      ["A short label on hover or focus", "Tooltip"],
      ["Actions from a button", "Menu"],
      ["Actions on right-click", "Context menu"],
      ["Saying something happened", "Toast"],
    ],
  },
  navigation: {
    headline: "Between views.",
    which: [
      ["Views of the same thing", "Tabs"],
      ["Several sections that fold", "Accordion"],
      ["One section that folds", "Collapsible"],
      ["Where you are in a hierarchy", "Breadcrumb"],
      ["Pages of a long list", "Pagination"],
      ["A flow, step by step", "Steps"],
    ],
  },
  "data-display": {
    headline: "Information, shown.",
    which: [
      ["Rows to scan, sort and select", "Table"],
      ["A status in a word", "Badge"],
      ["A person or a tenant", "Avatar"],
      ["Several people at once", "Avatar group"],
      ["A key figure", "Stat"],
      ["Terms and their values", "Description list"],
      ["Events in order", "Timeline"],
      ["Nested items", "Tree view"],
      ["Code to read and copy", "Code block"],
    ],
  },
  feedback: {
    headline: "What's happening.",
    which: [
      ["A message about the page", "Alert"],
      ["Work with a known end", "Progress"],
      ["A measured value, not progress", "Meter"],
      ["A short wait", "Spinner"],
      ["Content still on its way", "Skeleton"],
      ["Nothing to show yet", "Empty state"],
    ],
  },
  "console-frame": {
    headline: "A Qeet console's frame.",
    which: [
      ["The whole console frame", "App shell"],
      ["The tenant and search bar", "Top bar"],
      ["The console's navigation", "Sidebar"],
      ["A page's title, actions and tabs", "Page header"],
    ],
  },
};
