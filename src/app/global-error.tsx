"use client";

// Replaces the root layout when the layout itself throws, so it cannot rely on
// globals.css / design tokens. Minimal, self-contained inline styles only.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#0a0a0a",
          color: "#fafafa",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f26d0e" }} />
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Something went wrong</h1>
        <p style={{ color: "#a1a1aa", margin: 0 }}>
          The application failed to load. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 8,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#f26d0e",
            color: "#0a0a0a",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
