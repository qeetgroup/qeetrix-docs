import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@qeetrix/ui";

/**
 * `multiple` lets several panels stay open side by side, for a reviewer comparing policy
 * sections. An item can also be `disabled` on its own, such as a feature the plan doesn't include.
 */
export default function AccordionMultiple() {
  return (
    <Accordion
      multiple
      defaultValue={["passkeys", "sessions"]}
      className="w-md"
    >
      <AccordionItem value="passkeys">
        <AccordionTrigger>Passkeys</AccordionTrigger>
        <AccordionContent>
          Required for Owners, Admins and Billing. 1,642 of 1,842 users at
          Northwind Retail have one enrolled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sessions">
        <AccordionTrigger>Session lifetime</AccordionTrigger>
        <AccordionContent>
          Idle sessions end after 30 minutes; every session ends after 12 hours.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="scim" disabled>
        <AccordionTrigger>SCIM provisioning · Enterprise plan</AccordionTrigger>
        <AccordionContent>
          Upgrade to provision users from your HR system automatically.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
