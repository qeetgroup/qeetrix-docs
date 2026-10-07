import { ChevronRightIcon } from "@qeetrix/icons";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Input,
  Switch,
} from "@qeetrix/ui";

/**
 * Rarely changed fields fold away under a text trigger, below the fields everyone needs. The
 * panel starts closed; pass `defaultOpen` to start it open.
 */
export default function CollapsibleAdvancedOptions() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Field>
        <FieldLabel>Webhook endpoint</FieldLabel>
        <FieldControl
          render={
            <Input
              type="url"
              defaultValue="https://api.northwind.in/hooks/qeet-pay"
            />
          }
        />
      </Field>
      <Collapsible className="flex flex-col gap-4">
        <CollapsibleTrigger className="group/advanced flex items-center gap-1 self-start rounded-sm text-sm font-medium text-link outline-none hover:text-link-hover focus-visible:focus-ring">
          <ChevronRightIcon
            aria-hidden
            className="size-4 transition-transform group-data-panel-open/advanced:rotate-90"
          />
          Advanced delivery options
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Timeout (seconds)</FieldLabel>
            <FieldControl
              render={
                <Input type="number" defaultValue={10} className="w-28" />
              }
            />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel>Retry failed deliveries</FieldLabel>
              <FieldDescription>
                Up to 8 attempts over 24 hours, with exponential backoff.
              </FieldDescription>
            </FieldContent>
            <FieldControl render={<Switch defaultChecked />} />
          </Field>
        </CollapsibleContent>
      </Collapsible>
      <Button className="self-start">Save endpoint</Button>
    </div>
  );
}
