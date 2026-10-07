"use client";

import {
  Button,
  Field,
  FieldControl,
  FieldLabel,
  Form,
  FormActions,
  Input,
  NativeSelect,
} from "@qeetrix/ui";

/** A styled `<form>` with steady vertical rhythm. With `focusInvalidOnSubmit` it moves focus to the first invalid field on submit; `FormActions` is the button row. */
export default function FormDefault() {
  return (
    <Form
      className="w-full max-w-sm"
      focusInvalidOnSubmit
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <FieldControl
          render={<Input name="name" required placeholder="Meera Iyer" />}
        />
      </Field>
      <Field>
        <FieldLabel>Work email</FieldLabel>
        <FieldControl
          render={
            <Input
              name="email"
              type="email"
              required
              placeholder="meera@northwind.in"
            />
          }
        />
      </Field>
      <Field>
        <FieldLabel>Role</FieldLabel>
        <FieldControl
          render={
            <NativeSelect name="role" defaultValue="member">
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </NativeSelect>
          }
        />
      </Field>
      <FormActions>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Send invite</Button>
      </FormActions>
    </Form>
  );
}
