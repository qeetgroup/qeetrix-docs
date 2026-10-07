import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  StatusPill,
} from "@qeetrix/ui";

/**
 * Term and value pairs for a detail page, as direct children. They stack on a narrow screen and
 * line up in two columns from the `sm` breakpoint.
 *
 * @layout wide
 */
export default function DescriptionListDefault() {
  return (
    <DescriptionList className="max-w-xl">
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetails>Meera Iyer</DescriptionDetails>
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>meera@northwind.in</DescriptionDetails>
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Billing admin</DescriptionDetails>
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>
        <StatusPill status="active" />
      </DescriptionDetails>
      <DescriptionTerm>User ID</DescriptionTerm>
      <DescriptionDetails className="font-mono">
        usr_01J9ZQ4M7TK3N8W2
      </DescriptionDetails>
    </DescriptionList>
  );
}
