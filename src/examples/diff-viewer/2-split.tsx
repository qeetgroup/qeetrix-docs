"use client";

import { DiffViewer } from "@qeetrix/ui";

const before = `session:
  idle_timeout: 30m
  absolute_timeout: 12h
  remember_device: true
sign_in:
  methods: [password, otp]`;

const after = `session:
  idle_timeout: 15m
  absolute_timeout: 12h
  remember_device: false
sign_in:
  methods: [passkey, otp]`;

/**
 * `mode="split"` shows the old and new versions side by side, each pane headed by its label.
 *
 * @layout wide
 */
export default function DiffViewerSplit() {
  return (
    <DiffViewer
      mode="split"
      before={before}
      after={after}
      beforeLabel="policy.yaml (live)"
      afterLabel="policy.yaml (draft)"
    />
  );
}
