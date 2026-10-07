import { DownloadIcon } from "@qeetrix/icons";
import { Button, FileCard } from "@qeetrix/ui";

const attachments = [
  { name: "QP-INV-2026-00412.pdf", size: "182 KB" },
  { name: "GSTR-1 working, Q2.xlsx", size: "96 KB" },
  { name: "settlement-2026-10-07.csv", size: "41 KB" },
];

/**
 * `layout="row"` is a compact row for attachment lists and narrow panels, with the extension in
 * the metadata line. `actions` are always visible, never revealed only on hover.
 */
export default function FileCardRow() {
  return (
    <div className="flex w-80 flex-col gap-2">
      {attachments.map((file) => (
        <FileCard
          key={file.name}
          layout="row"
          name={file.name}
          size={file.size}
          actions={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Download ${file.name}`}
            >
              <DownloadIcon aria-hidden />
            </Button>
          }
        />
      ))}
    </div>
  );
}
