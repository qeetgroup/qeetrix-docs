"use client";

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  Form,
  FormErrorSummary,
  Input,
} from "@qeetrix/ui";

/**
 * After a failed submit, `FormErrorSummary` lists every problem at the top; each entry moves focus
 * to its field. It uses client hooks, so render it from a client component.
 */
export default function FormErrorSummaryExample() {
  return (
    <Form className="w-full max-w-sm">
      <FormErrorSummary
        errors={[
          { controlId: "org-name", message: "Enter your organisation's name" },
          {
            controlId: "org-domain",
            message: "Enter a domain, such as northwind.in",
          },
        ]}
      />
      <Field controlId="org-name">
        <FieldLabel>Organisation name</FieldLabel>
        <FieldControl render={<Input />} />
        <FieldError>Enter your organisation's name</FieldError>
      </Field>
      <Field controlId="org-domain">
        <FieldLabel>Domain</FieldLabel>
        <FieldControl render={<Input defaultValue="northwind" />} />
        <FieldError>Enter a domain, such as northwind.in</FieldError>
      </Field>
    </Form>
  );
}
