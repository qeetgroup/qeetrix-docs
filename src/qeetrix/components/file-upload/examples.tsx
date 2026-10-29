// Components › File upload: its examples, the real FileUpload with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. The
// uploads are pretend: a timer stands in for the network.
import { Field } from "@qeetrix/react";
import { FileUpload, type FileUploadItem } from "@qeetrix/react/experimental";
import { useRef, useState } from "react";
import type { ExampleDoc } from "../types";

/** Files chosen, then "uploaded" by a timer, each with its progress. */
function Uploads({
  accept,
  maxSize,
  multiple,
  label,
}: {
  accept: string;
  maxSize: number;
  multiple?: boolean;
  label: string;
}) {
  const [items, setItems] = useState<FileUploadItem[]>([]);
  const next = useRef(0);
  const upload = (files: File[]) => {
    for (const file of files) {
      const id = `f${next.current++}`;
      setItems((current) => [
        ...current,
        { id, name: file.name, size: file.size, status: "uploading", progress: 0 },
      ]);
      let progress = 0;
      const timer = window.setInterval(() => {
        progress += 20;
        setItems((current) =>
          current.map((item) =>
            item.id === id
              ? progress >= 100
                ? { ...item, status: "done", progress: undefined }
                : { ...item, progress }
              : item,
          ),
        );
        if (progress >= 100) window.clearInterval(timer);
      }, 300);
    }
  };
  return (
    <Field label={label}>
      <FileUpload
        accept={accept}
        maxSize={maxSize}
        multiple={multiple}
        items={items}
        onSelect={upload}
        onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))}
      />
    </Field>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "drop-or-choose",
    title: "Drop or choose",
    line: "A drop zone over a real file input. Files that pass go to onSelect; the rest are listed with the reason.",
    code: `<Field label="SAML metadata">
  <FileUpload accept=".xml" maxSize={1_000_000} items={items} onSelect={upload} onRemove={remove} />
</Field>`,
    render: () => (
      <div className="qc-wide">
        <Uploads label="SAML metadata" accept=".xml" maxSize={1_000_000} />
      </div>
    ),
  },
  {
    id: "several-files",
    title: "Several files",
    line: 'multiple, and the hint written from accept and maxSize: "PNG, JPEG, up to 5 MB".',
    code: `<Field label="Logos">
  <FileUpload accept="image/png,image/jpeg" maxSize={5_000_000} multiple items={items} onSelect={upload} onRemove={remove} />
</Field>`,
    render: () => (
      <div className="qc-wide">
        <Uploads label="Logos" accept="image/png,image/jpeg" maxSize={5_000_000} multiple />
      </div>
    ),
  },
  {
    id: "every-status",
    title: "Every status",
    line: "The app reports each file in items: uploading with its progress, done, or failed with why.",
    code: `<FileUpload
  accept=".csv"
  items={[
    { id: "1", name: "users-march.csv", size: 482_000, status: "uploading", progress: 45 },
    { id: "2", name: "users-feb.csv", size: 391_000, status: "done" },
    { id: "3", name: "users-jan.csv", size: 2_400_000, status: "error", error: "Row 214: the email is missing." },
  ]}
  onSelect={upload}
  onRemove={remove}
/>`,
    render: () => (
      <div className="qc-wide">
        <Field label="Import users">
          <FileUpload
            accept=".csv"
            items={[
              {
                id: "1",
                name: "users-march.csv",
                size: 482_000,
                status: "uploading",
                progress: 45,
              },
              { id: "2", name: "users-feb.csv", size: 391_000, status: "done" },
              {
                id: "3",
                name: "users-jan.csv",
                size: 2_400_000,
                status: "error",
                error: "Row 214: the email is missing.",
              },
            ]}
            onSelect={() => {}}
            onRemove={() => {}}
          />
        </Field>
      </div>
    ),
  },
];
