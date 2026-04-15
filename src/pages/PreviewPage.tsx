import { Link } from "react-router-dom";

export default function PreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        color: "#F5F5F5",
      }}
    >
      <p style={{ color: "#A0A0A0", fontSize: "1rem" }}>Preview coming soon</p>
      <Link
        to="/"
        style={{
          marginTop: "1.5rem",
          color: "#6366F1",
          textDecoration: "none",
          fontSize: "0.875rem",
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
