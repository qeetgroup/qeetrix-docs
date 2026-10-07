import { RadioCard, RadioCardGroup } from "@qeetrix/ui";

const plans = [
  {
    value: "starter",
    name: "Starter",
    price: "Free",
    body: "Up to 1,000 monthly active users.",
  },
  {
    value: "growth",
    name: "Growth",
    price: "₹9,999 / mo",
    body: "50,000 MAU, SSO and audit logs.",
  },
  {
    value: "enterprise",
    name: "Enterprise",
    price: "Custom",
    body: "Unlimited MAU, SCIM and a 99.99% SLA.",
  },
];

/** One choice that needs explaining. The whole card selects; the arrow keys move between cards. */
export default function RadioCardDefault() {
  return (
    <RadioCardGroup
      aria-label="Plan"
      defaultValue="growth"
      className="grid w-full max-w-2xl gap-3 sm:grid-cols-3"
    >
      {plans.map((plan) => (
        <RadioCard key={plan.value} value={plan.value}>
          <span className="flex flex-col gap-1">
            <span className="font-medium">{plan.name}</span>
            <span className="text-heading font-semibold">{plan.price}</span>
            <span className="text-caption text-muted-foreground">
              {plan.body}
            </span>
          </span>
        </RadioCard>
      ))}
    </RadioCardGroup>
  );
}
