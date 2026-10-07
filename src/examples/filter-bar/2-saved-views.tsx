"use client";

import { DownloadIcon } from "@qeetrix/icons";
import {
  type ActiveFilter,
  Button,
  FilterBar,
  type FilterBarView,
  type FilterField,
} from "@qeetrix/ui";
import { useState } from "react";

const fields: FilterField[] = [
  {
    key: "role",
    label: "Role",
    options: [
      { label: "Owner", value: "owner" },
      { label: "Admin", value: "admin" },
      { label: "Member", value: "member" },
    ],
  },
  {
    key: "mfa",
    label: "MFA",
    operators: ["is"],
    options: [
      { label: "Enabled", value: "enabled" },
      { label: "Not set up", value: "none" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Invited", value: "invited" },
      { label: "Suspended", value: "suspended" },
    ],
  },
];

const initialViews: FilterBarView[] = [
  {
    id: "suspended",
    label: "Suspended",
    filters: [{ field: "status", operator: "is", value: "suspended" }],
  },
  {
    id: "no-mfa",
    label: "Admins without MFA",
    filters: [
      { field: "role", operator: "is", value: "admin" },
      { field: "mfa", operator: "is", value: "none" },
    ],
  },
];

/**
 * `views` adds a saved-views menu; choosing one applies its filters, and the view's name is
 * marked modified once the filters drift from it. `onSaveView` adds "Save current view…" to the
 * menu; you name and store the view (here straight into the list, in an app usually through a
 * dialog). `actions` holds trailing table controls.
 *
 * @layout wide
 */
export default function FilterBarSavedViews() {
  const [views, setViews] = useState(initialViews);
  const [viewId, setViewId] = useState<string | null>("suspended");
  const [filters, setFilters] = useState<ActiveFilter[]>(
    initialViews[0].filters,
  );

  return (
    <FilterBar
      fields={fields}
      value={filters}
      onValueChange={setFilters}
      views={views}
      viewId={viewId}
      onViewChange={(view) => setViewId(view?.id ?? null)}
      onSaveView={({ filters: current, search }) => {
        const id = `view-${views.length + 1}`;
        setViews([
          ...views,
          {
            id,
            label: `My view ${views.length - 1}`,
            filters: current,
            search,
          },
        ]);
        setViewId(id);
      }}
      actions={
        <Button variant="outline">
          <DownloadIcon data-icon="inline-start" aria-hidden />
          Export
        </Button>
      }
    />
  );
}
