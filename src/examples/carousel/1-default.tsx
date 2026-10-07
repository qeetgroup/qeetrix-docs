import {
  FingerprintPatternIcon,
  RefreshCwIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
} from "@qeetrix/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@qeetrix/ui";

const steps = [
  {
    id: "passkeys",
    icon: FingerprintPatternIcon,
    title: "Sign in with a passkey",
    body: "Touch ID, Windows Hello or a security key replaces the password: nothing to phish, nothing to reuse.",
  },
  {
    id: "sso",
    icon: ShieldCheckIcon,
    title: "Connect your identity provider",
    body: "Bring Okta, Azure AD or Google Workspace over OIDC or SAML 2.0.",
  },
  {
    id: "scim",
    icon: RefreshCwIcon,
    title: "Provision users automatically",
    body: "SCIM keeps Qeet ID in step with HR: joiners get access on day one, leavers lose it the same hour.",
  },
  {
    id: "audit",
    icon: ScrollTextIcon,
    title: "Every change, on the record",
    body: "The audit log keeps 400 days of admin activity, exportable to your SIEM.",
  },
];

/**
 * One slide at a time, with Previous and Next floating outside the slides' edges, so leave room
 * for them on either side. While focus is inside the carousel, the arrow keys move between
 * slides.
 */
export default function CarouselDefault() {
  return (
    <div className="w-md px-12">
      <Carousel aria-label="Getting started with Qeet ID">
        <CarouselContent>
          {steps.map((step, index) => (
            <CarouselItem key={step.id}>
              <div className="flex h-52 flex-col gap-2 rounded-lg border border-border bg-surface-subtle p-5">
                <span className="mb-1 flex size-10 items-center justify-center rounded-full bg-brand-subtle text-brand">
                  <step.icon aria-hidden className="size-5" />
                </span>
                <span className="text-caption text-muted-foreground">
                  Step {index + 1} of {steps.length}
                </span>
                <p className="font-heading text-base font-semibold">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.body}</p>
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
