import { Listbox } from "@qeetrix/ui";

const regions = [
  { value: "ap-south-1", label: "Mumbai (ap-south-1)" },
  { value: "ap-southeast-1", label: "Singapore (ap-southeast-1)" },
  { value: "eu-west-1", label: "Ireland (eu-west-1)" },
  { value: "us-east-1", label: "N. Virginia (us-east-1)", disabled: true },
];

/** An always-open list to choose from, for when the options should stay in view. Disabled options are skipped. */
export default function ListboxDefault() {
  return (
    <Listbox
      aria-label="Data region"
      options={regions}
      defaultValue="ap-south-1"
      className="w-72"
    />
  );
}
