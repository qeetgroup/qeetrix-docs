"use client";

import { FileList, FileUploadItem } from "@qeetrix/ui";
import { useState } from "react";

const initial = [
  {
    id: 1,
    file: {
      name: "gst-certificate.pdf",
      size: 482_000,
      type: "application/pdf",
    },
    status: "success" as const,
  },
  {
    id: 2,
    file: {
      name: "incorporation-deed.pdf",
      size: 2_400_000,
      type: "application/pdf",
    },
    status: "uploading" as const,
    progress: 64,
  },
  {
    id: 3,
    file: { name: "director-pan.jpg", size: 13_100_000, type: "image/jpeg" },
    status: "error" as const,
    error: "Larger than 10 MB",
  },
];

/** Each file shows its progress and state, with remove, cancel and retry where they apply. */
export default function FileUploadFileList() {
  const [files, setFiles] = useState(initial);
  const remove = (id: number) =>
    setFiles((current) => current.filter((entry) => entry.id !== id));
  return (
    <FileList className="w-full max-w-md">
      {files.map((entry) => (
        <FileUploadItem
          key={entry.id}
          file={entry.file}
          status={entry.status}
          progress={"progress" in entry ? entry.progress : undefined}
          error={"error" in entry ? entry.error : undefined}
          onRemove={() => remove(entry.id)}
          onCancel={() => remove(entry.id)}
          onRetry={() => remove(entry.id)}
        />
      ))}
    </FileList>
  );
}
