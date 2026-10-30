// The Patterns pages' frames: whole pages built from the components, drawn at /frames/<id>/ and
// shown in iframes (frames.tsx). Nothing here reads token data.
import { QeetLogo } from "@qeetrix/icons";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LogInIcon } from "@qeetrix/icons/icons/log-in";
import { UserCogIcon } from "@qeetrix/icons/icons/user-cog";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Inline,
  Link,
  Separator,
  Stack,
  Switch,
  Text,
  TextField,
} from "@qeetrix/react";
import {
  AppShell,
  DescriptionItem,
  DescriptionList,
  PageContent,
  PageHeader,
  PageHeaderBack,
  Timeline,
  TimelineItem,
} from "@qeetrix/react/experimental";
import { ConsoleSidebar, ConsoleTopBar, routerLink } from "./console";

export const SignIn = () => (
  <main className="qc-pattern-sign-in">
    <Stack gap="xl" align="center">
      <QeetLogo height={32} />
      <Card>
        <Stack gap="lg">
          <Stack gap="xs">
            <Heading level={1} size="heading-sm">
              Sign in to Acme Pvt Ltd
            </Heading>
            <Text tone="subtle">With your work email.</Text>
          </Stack>
          <TextField
            label="Work email"
            type="email"
            autoComplete="username webauthn"
            defaultValue="priya@acme.in"
          />
          <Button icon={FingerprintPatternIcon} fullWidth>
            Continue with a passkey
          </Button>
          <Inline gap="sm" align="center" wrap={false}>
            <Separator decorative />
            <Text size="sm" tone="subtle">
              or
            </Text>
            <Separator decorative />
          </Inline>
          <Button variant="soft" icon={KeyRoundIcon} fullWidth>
            Use a password
          </Button>
        </Stack>
      </Card>
      <Text size="sm" tone="subtle">
        Can't sign in? <Link href="#help">Get help</Link>
      </Text>
    </Stack>
  </main>
);

export const UserDetail = () => (
  <AppShell topBar={<ConsoleTopBar search={false} />} sidebar={<ConsoleSidebar />}>
    <PageHeader
      back={
        <PageHeaderBack href="#users" render={routerLink}>
          Users
        </PageHeaderBack>
      }
      title="Priya Sharma"
      status={<Badge tone="success">Active</Badge>}
      description="priya@acme.in · Engineering"
      actions={
        <>
          <Button variant="soft">Reset MFA</Button>
          <Button>Edit profile</Button>
        </>
      }
    />
    <PageContent>
      <Grid columns={{ base: 1, large: 3 }} gap="xl">
        <GridItem span={{ large: 2 }}>
          <Stack gap="xl">
            <Card title="Profile" level={2}>
              <DescriptionList>
                <DescriptionItem term="Email">priya@acme.in</DescriptionItem>
                <DescriptionItem term="Department">Engineering</DescriptionItem>
                <DescriptionItem term="Manager">
                  <Inline gap="xs">
                    <Avatar name="Rahul Verma" size="sm" decorative />
                    Rahul Verma
                  </Inline>
                </DescriptionItem>
                <DescriptionItem term="Member since">14 March 2024</DescriptionItem>
              </DescriptionList>
            </Card>
            <Card title="Security" level={2}>
              <DescriptionList>
                <DescriptionItem term="Passkeys">2 · MacBook Pro, iPhone</DescriptionItem>
                <DescriptionItem term="Two-step sign-in">
                  <Badge tone="success">On</Badge>
                </DescriptionItem>
              </DescriptionList>
            </Card>
          </Stack>
        </GridItem>
        <Card title="Recent activity" level={2}>
          <Timeline aria-label="Recent activity">
            <TimelineItem
              icon={LogInIcon}
              title="Signed in with a passkey"
              description="Bengaluru"
              time="2 min ago"
            />
            <TimelineItem
              icon={UserCogIcon}
              title="Role changed to Admin"
              description="By Rahul Verma"
              time="Yesterday"
            />
          </Timeline>
        </Card>
      </Grid>
    </PageContent>
  </AppShell>
);

export const AccountSettings = () => (
  <AppShell topBar={<ConsoleTopBar search={false} />} sidebar={<ConsoleSidebar />}>
    <PageHeader title="Account settings" description="Your profile and how you sign in." />
    <PageContent width="narrow">
      <Stack gap="xl">
        <Card title="Profile" level={2} footer={<Button>Save changes</Button>}>
          <Stack gap="lg">
            <TextField label="Display name" defaultValue="Priya Sharma" />
            <TextField
              label="Work email"
              type="email"
              defaultValue="priya@acme.in"
              description="Changing it needs your admin's approval."
            />
          </Stack>
        </Card>
        <Card title="Sign-in" level={2}>
          <Stack gap="lg">
            <Switch label="Ask for a passkey on new devices" defaultChecked />
            <Switch label="Email me when someone signs in" />
          </Stack>
        </Card>
        <Card
          tone="danger"
          title="Delete account"
          level={2}
          footer={<Button tone="danger">Delete my account</Button>}
        >
          <Text>Your sessions end and your passkeys stop working. This can't be undone.</Text>
        </Card>
      </Stack>
    </PageContent>
  </AppShell>
);
