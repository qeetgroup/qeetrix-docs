// Step 4's result, live: the code's components rendered beside it, in either scheme. The same
// components the reader just imported, not a picture of them.
import { MoonIcon } from "@qeetrix/icons/icons/moon";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { SunIcon } from "@qeetrix/icons/icons/sun";
import {
  Button,
  QeetrixProvider,
  Stack,
  TextField,
  ToastProvider,
  Toggle,
  ToggleGroup,
  useToast,
} from "@qeetrix/react";
import { useState } from "react";

function Screen() {
  const toast = useToast();
  return (
    <Stack gap="lg">
      <TextField
        label="Work email"
        name="email"
        type="email"
        defaultValue="priya@acme.in"
        required
      />
      <Button
        icon={PlusIcon}
        onClick={() =>
          toast.add({
            title: "Invitation sent",
            description: "Priya will get an email to join Acme.",
            tone: "success",
          })
        }
      >
        Invite users
      </Button>
    </Stack>
  );
}

export default function FirstScreen() {
  const [scheme, setScheme] = useState("light");
  return (
    <div className="qd-live" data-copy-skip>
      <div className="qd-live-bar">
        <span>Result</span>
        <ToggleGroup
          variant="segmented"
          size="sm"
          aria-label="Preview scheme"
          value={[scheme]}
          onValueChange={(v) => v[0] && setScheme(v[0])}
        >
          <Toggle value="light" icon={SunIcon} aria-label="Light" />
          <Toggle value="dark" icon={MoonIcon} aria-label="Dark" />
        </ToggleGroup>
      </div>
      <div className="qd-live-stage" data-qx-color-scheme={scheme} data-qx-density="default">
        <QeetrixProvider locale="en-IN">
          <ToastProvider>
            <Screen />
          </ToastProvider>
        </QeetrixProvider>
      </div>
    </div>
  );
}
