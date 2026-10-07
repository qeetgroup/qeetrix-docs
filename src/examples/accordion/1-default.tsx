import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@qeetrix/ui";

const faqs = [
  {
    value: "settlement",
    question: "When are UPI payments settled to my bank account?",
    answer:
      "Captured UPI payments settle T+1 on banking days, into the current account verified for your Qeet Pay merchant ID. Payments captured after 11:00 pm IST roll into the next cycle.",
  },
  {
    value: "gst",
    question: "Is GST charged on Qeet Pay fees?",
    answer:
      "Yes. Platform fees attract 18% GST, shown separately on each settlement report and on the monthly tax invoice issued to your GSTIN.",
  },
  {
    value: "refunds",
    question: "How long do refunds take to reach the customer?",
    answer:
      "UPI refunds usually land within minutes. Card refunds take 5–7 working days, depending on the issuing bank.",
  },
];

/**
 * One panel open at a time: opening another question closes the first. `defaultValue` takes an
 * array of item values, here opening the first answer on load.
 */
export default function AccordionDefault() {
  return (
    <Accordion defaultValue={["settlement"]} className="w-md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
