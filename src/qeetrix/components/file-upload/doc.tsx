// Components › File upload: its documentation, from @qeetrix/react 0.2.0 (experimental/file-upload)
// and the changelog. Its examples run live (Live.tsx), with a timer for the network.
import { Field } from "@qeetrix/react";
import { FileUpload } from "@qeetrix/react/experimental";
import { FORM_TESTED } from "../forms";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const fileUpload: ComponentDoc = {
  name: "File upload",
  slug: "file-upload",
  category: "forms",
  status: "experimental",
  since: "0.0.6",
  lede: "Choose or drop files: a drop zone over the browser's own file input, each upload with its status.",
  exports: ["FileUpload"],
  renders: '<input type="file">',
  source: "experimental/file-upload",
  story: "components/data-entry/file-upload.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A file the setup needs: SAML metadata, a certificate, a logo.",
      "Importing a list: a CSV of users.",
      "Several files, each uploaded and reported on its own.",
    ],
    notFor: [
      { text: "Pasting text, such as a certificate's PEM", use: "Textarea" },
      { text: "A link to a file", use: "Text field" },
    ],
    anatomyFigure: (
      <div className="qc-anat-wide">
        <Field label="SAML metadata">
          <FileUpload
            accept=".xml"
            maxSize={1_000_000}
            items={[{ id: "1", name: "acme-idp.xml", size: 8_400, status: "done" }]}
            onRemove={() => {}}
          />
        </Field>
      </div>
    ),
    anatomy: [
      {
        slot: "file-upload-zone",
        element: "<label>",
        note: "The dashed zone, a label for the input, Ember while a file is dragged over it; the hint is written from accept and maxSize.",
      },
      {
        slot: "file-upload-input",
        element: '<input type="file">',
        note: "The browser's own file input: the keyboard and screen readers use it.",
      },
      {
        slot: "file-upload-item",
        element: "<li>",
        note: "A file: its name, size and status, and remove.",
      },
    ],
    rules: [
      {
        title: "Say what's accepted",
        doLine: 'accept and maxSize: the hint says "XML, up to 1 MB".',
        dontLine: "Any file, then a rejection after the upload.",
        doIt: (
          <div className="qc-narrow">
            <Field label="SAML metadata">
              <FileUpload accept=".xml" maxSize={1_000_000} />
            </Field>
          </div>
        ),
        dontIt: (
          <div className="qc-narrow">
            <Field label="SAML metadata">
              <FileUpload />
            </Field>
          </div>
        ),
      },
    ],
    content: [
      'The label names what\'s wanted: "SAML metadata", not "Upload".',
      'Say why a file failed, as a fix: "Row 214: the email is missing."',
    ],
  },

  api: {
    props: [
      {
        name: "onSelect",
        type: "(files: File[]) => void",
        default: "—",
        note: "The files that pass accept, maxSize and multiple: upload them here.",
      },
      {
        name: "items",
        type: "FileUploadItem[]",
        default: "—",
        note: "The files you're handling: { id, name, size, status, progress, error }.",
      },
      {
        name: "onRemove",
        type: "(id: string) => void",
        default: "—",
        note: "A row's remove; without it, rows have none.",
      },
      {
        name: "accept",
        type: "string",
        default: "—",
        note: 'The types allowed: ".xml,.json" or "image/*".',
      },
      { name: "maxSize", type: "number", default: "—", note: "The largest file, in bytes." },
      { name: "multiple", type: "boolean", default: "false", note: "Several at once." },
      {
        name: "hint",
        type: "ReactNode",
        default: "from accept and maxSize",
        note: "The line under the prompt.",
      },
      {
        name: "locale · messages",
        type: "…",
        default: "the provider's",
        note: "Sizes and type lists in the locale; its words.",
      },
    ],
    parts: [
      { slot: "file-upload", element: "<div>", note: "The root." },
      { slot: "file-upload-zone", element: "<label>", note: "The drop zone." },
      {
        slot: "file-upload-input",
        element: '<input type="file">',
        note: "The input; a Field labels it.",
      },
      { slot: "file-upload-list", element: "<ul>", note: "The files." },
      { slot: "file-upload-item", element: "<li>", note: "A file and its status." },
    ],
    recipes: [
      {
        title: "Report each upload",
        line: "Add the file as uploading, update its progress, then done or error.",
        file: "metadata.tsx",
        code: `const [items, setItems] = useState<FileUploadItem[]>([]);

const upload = (files: File[]) =>
  files.forEach(async (file) => {
    const id = crypto.randomUUID();
    setItems((all) => [...all, { id, name: file.name, size: file.size, status: "uploading" }]);
    const result = await uploadMetadata(file);
    setItems((all) => all.map((item) => (item.id === id ? { ...item, ...result } : item)));
  });`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the file input, then to each file's remove." },
      { keys: ["Enter", "Space"], action: "Opens the system's file chooser." },
    ],
    checks: [
      {
        check: "A real input",
        result: "The browser's own file control: keyboard and screen readers get it as it is.",
      },
      { check: "Name", result: "Its Field's label, description and error link to the input." },
      {
        check: "Rejections",
        result: "Files that don't pass are listed with the reason, in words.",
      },
    ],
    tested: FORM_TESTED,
  },

  changelog: [
    {
      version: "0.0.6",
      items: [
        "FileUpload: a dashed drop zone over a real file input, Ember while a file is dragged over it; files that pass accept, maxSize and multiple go to onSelect, the rest are listed with the reason; items report uploading, uploaded or failed, each with remove. The hint and sizes are written for the locale; English and Hindi.",
      ],
    },
  ],

  related: [
    { name: "Form", when: "Validation and summary" },
    { name: "Progress", when: "Work under way" },
    { name: "Textarea", when: "Pasted text" },
  ],
};
