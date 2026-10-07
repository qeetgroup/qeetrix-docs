import { Field, FieldLabel, RichTextEditor } from "@qeetrix/ui";

/**
 * A WYSIWYG editor on Tiptap with a formatting toolbar. It emits HTML through `onChange`, or
 * ProseMirror JSON through `onChangeJSON`.
 *
 * @layout wide
 */
export default function RichTextEditorDefault() {
  return (
    <Field>
      <FieldLabel>Release notes</FieldLabel>
      <RichTextEditor
        defaultValue="<h3>Passkeys for everyone</h3><p>Members can now sign in with a <strong>passkey</strong> on any device. Admins can require one from <em>Settings → Security</em>.</p><ul><li>Works with iCloud Keychain and Google Password Manager</li><li>Falls back to a one-time code</li></ul>"
        placeholder="Write the notes for this release…"
      />
    </Field>
  );
}
