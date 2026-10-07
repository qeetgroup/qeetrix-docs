import { FileTypeIcon } from "@qeetrix/ui";

const types = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/webp",
  "text/csv",
  "application/zip",
  "application/x-pem-file",
];

/**
 * `type` also takes a MIME type, including Office types whose subtype spells no extension. The
 * category it resolves to is on `data-file-type`, for styling one kind differently.
 */
export default function FileTypeIconMimeTypes() {
  return (
    <ul className="flex w-full max-w-md flex-col gap-2.5">
      {types.map((type) => (
        <li key={type} className="flex min-w-0 items-center gap-2">
          <FileTypeIcon type={type} />
          <span className="truncate font-mono text-caption text-muted-foreground">
            {type}
          </span>
        </li>
      ))}
    </ul>
  );
}
