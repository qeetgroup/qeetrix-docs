// The token filter at the top of a Foundations page: Qeetrix's SearchField rendered to HTML, the
// count of matching tokens, and what the Tenant mark means. filter.ts does the filtering.
import { XIcon } from "@qeetrix/icons/icons/x";
import { Badge, IconButton } from "@qeetrix/react";
import { SearchField } from "@qeetrix/react/experimental";

export default function TokenFilter({ total }: { total: number }) {
  return (
    <div className="qf-toolbar qf-filter" data-qf-filter>
      <SearchField
        className="qf-filter-field"
        aria-label="Filter tokens"
        placeholder="Filter tokens"
        endAdornment={
          <IconButton
            icon={XIcon}
            aria-label="Clear search"
            size="sm"
            tone="neutral"
            tooltip={false}
            className="qx-search-field-clear"
            hidden
            data-qf-filter-clear
          />
        }
      />
      <span className="qf-filter-count" role="status" data-qf-filter-count>
        {total} tokens
      </span>
      <span className="qf-filter-legend">
        <Badge tone="brand" size="sm">
          Tenant
        </Badge>
        Themeable per tenant with <code>brandTheme()</code>
      </span>
    </div>
  );
}
