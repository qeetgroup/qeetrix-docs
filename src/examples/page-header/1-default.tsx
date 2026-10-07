import { PlusIcon, UploadIcon } from "@qeetrix/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  PageHeader,
} from "@qeetrix/ui";

/**
 * A breadcrumb eyebrow, the title, a description and trailing actions. The title renders as the
 * page's `<h1>`.
 *
 * @layout wide
 */
export default function PageHeaderDefault() {
  return (
    <PageHeader
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Qeet ID</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Directory</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      title="Users"
      description="1,842 people in Northwind Retail. Invite people one at a time, or connect Okta to provision them over SCIM."
      actions={
        <>
          <Button variant="outline">
            <UploadIcon data-icon="inline-start" aria-hidden />
            Import CSV
          </Button>
          <Button>
            <PlusIcon data-icon="inline-start" aria-hidden />
            Invite user
          </Button>
        </>
      }
    />
  );
}
