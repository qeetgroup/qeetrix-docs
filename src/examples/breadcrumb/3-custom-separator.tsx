import { HouseIcon, SlashIcon } from "@qeetrix/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@qeetrix/ui";

/**
 * Children of `BreadcrumbSeparator` replace the chevron. An icon-only crumb, like the home link
 * here, needs an `aria-label`.
 */
export default function BreadcrumbCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" aria-label="Qeet People home">
            <HouseIcon aria-hidden className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon aria-hidden />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Payroll</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon aria-hidden />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>September 2026</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
