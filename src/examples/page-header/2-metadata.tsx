import { DownloadIcon, EllipsisIcon } from "@qeetrix/icons";
import { Button, IconButton, PageHeader, StatusPill } from "@qeetrix/ui";

/**
 * `metadata` lays facts about the page's subject (a status, dates, an amount) out as a wrapping
 * row beneath the description.
 *
 * @layout wide
 */
export default function PageHeaderMetadata() {
  return (
    <PageHeader
      title={<span className="font-mono">QP-INV-2026-00412</span>}
      description="Northwind Retail Pvt Ltd · GSTIN 29ABCDE1234F1Z5"
      metadata={
        <>
          <StatusPill kind="info">Sent</StatusPill>
          <span>Issued 1 Oct 2026</span>
          <span>Due 15 Oct 2026</span>
          <span className="font-medium text-foreground tabular-nums">
            ₹1,41,600
          </span>
        </>
      }
      actions={
        <>
          <Button variant="outline">
            <DownloadIcon data-icon="inline-start" aria-hidden />
            Download PDF
          </Button>
          <Button>Record payment</Button>
          <IconButton
            icon={EllipsisIcon}
            variant="ghost"
            aria-label="More actions"
          />
        </>
      }
    />
  );
}
