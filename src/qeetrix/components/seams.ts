// A code name as HTML with break opportunities at its seams: before an inner capital, after a dot, a
// colon or a comma, before a parenthesis. A narrow column then breaks QeetrixSectionHeader at Section
// and com.qeetgroup.qeetrix.components.dialog at a dot, never mid-word.
const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const seams = (name: string) =>
  escapeHtml(name)
    .replace(/([a-z0-9])(?=[A-Z])/g, "$1<wbr>")
    .replace(/([.:,])(?=\S)/g, "$1<wbr>")
    .replace(/(?=\()/g, "<wbr>");
