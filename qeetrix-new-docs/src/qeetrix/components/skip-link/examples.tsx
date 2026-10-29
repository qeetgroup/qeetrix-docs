// Components › Skip link: its examples. The link is fixed to the window's corner and hidden until
// focused, so its behaviour is a page of its own in a frame (frames.tsx); its look is drawn still.
// Nothing here reads token data.
import { FrameOf } from "../FrameOf";
import type { ExampleDoc } from "../types";

/** The link as it shows once focused, drawn still in the figure: the library's own class. */
export const FocusedSkipLink = ({ label = "Skip to main content" }) => (
  <span className="qc-skip-still">
    <a className="qx-skip-link" data-slot="skip-link" href="#main" tabIndex={-1}>
      {label}
    </a>
  </span>
);

export const examples: ExampleDoc[] = [
  {
    id: "the-first-stop",
    title: "The first stop",
    line: "The first focusable element on the page: hidden until focused, it jumps past the navigation to the main content. Click the frame, then press Tab.",
    code: `<body>
  <SkipLink />
  <TopBar … />
  <main id="main">…</main>
</body>`,
    render: () => (
      <FrameOf
        id="skip-link"
        height="12rem"
        title="Example: a page whose first Tab stop is the skip link"
      />
    ),
  },
  {
    id: "its-label",
    title: "Its label",
    line: 'messages.label, or QeetrixProvider\'s: "Skip to main content" in English, Hindi from the provider.',
    code: `<SkipLink messages={{ label: "मुख्य सामग्री पर जाएँ" }} />`,
    render: () => (
      <FrameOf id="skip-link" query="?hi" height="12rem" title="Example: the skip link in Hindi" />
    ),
  },
];
