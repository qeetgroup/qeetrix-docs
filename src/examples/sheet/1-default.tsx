import {
  Button,
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@qeetrix/ui";

/**
 * A side panel built on Dialog, so focus stays inside it while it is open. It opens from the
 * right by default, and Escape, the close button or a click on the backdrop closes it.
 */
export default function SheetDefault() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit member
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit member</SheetTitle>
          <SheetDescription>
            Changes apply the next time Meera signs in to Qeet People.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <FieldGroup className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Full name</FieldLabel>
              <FieldControl render={<Input defaultValue="Meera Iyer" />} />
            </Field>
            <Field>
              <FieldLabel>Work email</FieldLabel>
              <FieldControl
                render={
                  <Input type="email" defaultValue="meera@northwind.in" />
                }
              />
            </Field>
            <Field>
              <FieldLabel>Employee ID</FieldLabel>
              <FieldControl render={<Input defaultValue="NW-0427" />} />
              <FieldDescription>
                Shown on payslips and Form 16.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button />}>Save changes</SheetClose>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
