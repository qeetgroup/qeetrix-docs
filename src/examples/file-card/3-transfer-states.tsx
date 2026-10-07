import { FileCard } from "@qeetrix/ui";

/**
 * `status` shows a transfer: `uploading` or `downloading` adds a progress bar named for the
 * file (indeterminate without `progress`), and `error` shows and announces the `error` text with
 * a danger outline.
 */
export default function FileCardTransferStates() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <FileCard
        layout="row"
        name="Employee handbook 2026.pdf"
        size="4.8 MB"
        status="uploading"
        progress={64}
      />
      <FileCard
        layout="row"
        name="Audit export, Sep 2026.zip"
        size="18 MB"
        status="downloading"
      />
      <FileCard
        layout="row"
        name="Aadhaar scan.heic"
        status="error"
        error="HEIC isn't supported. Upload a JPG or PDF."
      />
    </div>
  );
}
