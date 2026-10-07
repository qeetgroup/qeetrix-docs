import { Dropzone } from "@qeetrix/ui";

/** Drop files or browse. `accept`, `maxSize` and `maxFiles` are checked before `onDrop` hands you the files. */
export default function FileUploadDropzone() {
  return (
    <Dropzone
      className="w-full max-w-md"
      accept="image/png,image/jpeg,application/pdf"
      maxSize={10 * 1024 * 1024}
      multiple
      hint="PNG, JPG or PDF, up to 10 MB each"
    />
  );
}
