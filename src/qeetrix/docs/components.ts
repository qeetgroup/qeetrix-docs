// The components, by category, as the Components page and the navigation list them: a name, a few
// words, and whether it is still experimental. Each category is a page, and so is each component.
export interface Entry {
  name: string;
  line: string;
  exp?: true;
}

export const categories: { id: string; name: string; line: string; items: Entry[] }[] = [
  {
    id: "layout",
    name: "Layout",
    line: "Space, structure and surfaces.",
    items: [
      { name: "Box", line: "A styled container" },
      { name: "Stack", line: "Items in a column" },
      { name: "Inline", line: "Items in a row that wraps" },
      { name: "Grid", line: "Columns that respond" },
      { name: "Card", line: "A ruled surface" },
      { name: "Separator", line: "A rule between content" },
      { name: "Scroll area", line: "Scrolls with styled bars" },
    ],
  },
  {
    id: "type",
    name: "Type",
    line: "Headings, text and links.",
    items: [
      { name: "Heading", line: "Titles at every size" },
      { name: "Text", line: "Running text and labels" },
      { name: "Link", line: "Inline and standalone" },
      { name: "Skip link", line: "Jump to the content" },
      { name: "Visually hidden", line: "For screen readers" },
    ],
  },
  {
    id: "actions",
    name: "Actions",
    line: "Do something.",
    items: [
      { name: "Button", line: "The main action" },
      { name: "Icon button", line: "An action as an icon" },
      { name: "Toggle", line: "Pressed or not" },
      { name: "Toggle group", line: "One or many of a set" },
      { name: "Copy button", line: "Copies a value", exp: true },
      { name: "Command palette", line: "Search and run", exp: true },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    line: "Ask for input.",
    items: [
      { name: "Text field", line: "A labelled input" },
      { name: "Input", line: "The bare input" },
      { name: "Textarea", line: "Several lines" },
      { name: "Select", line: "One from a list" },
      { name: "Combobox", line: "Type to choose", exp: true },
      { name: "Checkbox", line: "Yes or no" },
      { name: "Radio", line: "One of a few" },
      { name: "Switch", line: "A setting on or off" },
      { name: "Slider", line: "A value in a range" },
      { name: "Number field", line: "Numbers with steps", exp: true },
      { name: "Password input", line: "Hidden, with show", exp: true },
      { name: "OTP input", line: "One-time codes", exp: true },
      { name: "File upload", line: "Drop or choose files", exp: true },
      { name: "Form", line: "Validation and summary", exp: true },
    ],
  },
  {
    id: "dates",
    name: "Dates",
    line: "Pick a day or a range.",
    items: [
      { name: "Calendar", line: "Pick a date", exp: true },
      { name: "Range calendar", line: "Pick a range", exp: true },
      { name: "Date picker", line: "A date in a field", exp: true },
      { name: "Date range picker", line: "A range in a field", exp: true },
    ],
  },
  {
    id: "overlays",
    name: "Overlays",
    line: "Above the page.",
    items: [
      { name: "Dialog", line: "A focused decision" },
      { name: "Drawer", line: "A panel from the edge" },
      { name: "Popover", line: "Content on demand" },
      { name: "Tooltip", line: "A short hint" },
      { name: "Menu", line: "Actions in a list" },
      { name: "Context menu", line: "Right-click actions" },
      { name: "Toast", line: "A brief confirmation" },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    line: "Move between views.",
    items: [
      { name: "Tabs", line: "Views of one thing" },
      { name: "Accordion", line: "Sections that fold" },
      { name: "Collapsible", line: "One section that folds" },
      { name: "Breadcrumb", line: "Where you are", exp: true },
      { name: "Pagination", line: "Pages of a list", exp: true },
      { name: "Steps", line: "Progress through a flow", exp: true },
    ],
  },
  {
    id: "data-display",
    name: "Data display",
    line: "Show information.",
    items: [
      { name: "Table", line: "Rows, sorting, selection" },
      { name: "Badge", line: "Status in a word" },
      { name: "Avatar", line: "A person or a tenant" },
      { name: "Avatar group", line: "Several people", exp: true },
      { name: "Stat", line: "A key figure", exp: true },
      { name: "Description list", line: "Terms and values", exp: true },
      { name: "Timeline", line: "Events in order", exp: true },
      { name: "Tree view", line: "Nested items", exp: true },
      { name: "Code block", line: "Highlighted code", exp: true },
    ],
  },
  {
    id: "feedback",
    name: "Feedback",
    line: "Say what's happening.",
    items: [
      { name: "Alert", line: "A message in the page", exp: true },
      { name: "Progress", line: "Work under way" },
      { name: "Meter", line: "A measured value" },
      { name: "Spinner", line: "Loading, briefly" },
      { name: "Skeleton", line: "Content on its way" },
      { name: "Empty state", line: "Nothing here yet", exp: true },
    ],
  },
  {
    id: "console-frame",
    name: "Console frame",
    line: "The frame of a Qeet console.",
    items: [
      { name: "App shell", line: "The console frame", exp: true },
      { name: "Top bar", line: "The scope bar", exp: true },
      { name: "Sidebar", line: "Console navigation", exp: true },
      { name: "Page header", line: "Title, actions, tabs", exp: true },
    ],
  },
];

/** A name's route segment: "Scroll area" → "scroll-area". */
export const slug = (name: string) => name.toLowerCase().replaceAll(" ", "-");

/** A category's page, and a component's. */
export const categoryHref = (id: string) => `/components/${id}`;
export const componentHref = (name: string) => `/components/${slug(name)}`;
