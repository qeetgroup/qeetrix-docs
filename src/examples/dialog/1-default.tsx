import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldControl,
  FieldLabel,
  Input,
} from "@qeetrix/ui";

/** A trigger, a titled panel, and a footer whose actions close it. Escape closes it too. */
export default function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Rename tenant
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename tenant</DialogTitle>
          <DialogDescription>
            The new name shows on sign-in pages and invoices.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel>Tenant name</FieldLabel>
          <FieldControl render={<Input defaultValue="Acme India" />} />
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
