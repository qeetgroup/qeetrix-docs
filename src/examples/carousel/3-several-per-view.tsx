import { CheckIcon } from "@qeetrix/icons";
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@qeetrix/ui";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹0",
    per: "up to 100 users",
    features: ["Passkeys and TOTP", "Email + SMS OTP", "7-day audit log"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹49",
    per: "per user / month + GST",
    features: ["Everything in Starter", "OIDC + SAML SSO", "90-day audit log"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    per: "annual contract, billed in INR",
    features: [
      "SCIM provisioning",
      "Data residency in India",
      "400-day audit log",
    ],
  },
  {
    id: "public-sector",
    name: "Public sector",
    price: "Custom",
    per: "GeM procurement",
    features: [
      "MeitY-empanelled cloud",
      "On-site key ceremony",
      "Dedicated support",
    ],
  },
];

/**
 * Several slides per view: give `CarouselItem` a `basis` narrower than the full width, and pass
 * `opts={{ align: "start" }}` so the first card sits flush with the start edge.
 *
 * @layout wide
 */
export default function CarouselSeveralPerView() {
  return (
    <div className="px-12">
      <Carousel opts={{ align: "start" }} aria-label="Qeet ID plans">
        <CarouselContent>
          {plans.map((plan) => (
            <CarouselItem key={plan.id} className="basis-full sm:basis-1/2">
              <div className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading text-base font-semibold">
                    {plan.name}
                  </p>
                  {plan.id === "growth" && <Badge>Most popular</Badge>}
                </div>
                <div>
                  <span className="font-heading text-heading font-semibold">
                    {plan.price}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {plan.per}
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon
                        aria-hidden
                        className="size-4 text-success-text"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.id === "growth" ? "default" : "outline"}
                  size="sm"
                  className="mt-auto"
                >
                  Choose {plan.name}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
