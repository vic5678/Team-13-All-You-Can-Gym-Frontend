import React from "react";

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div
      style={{
        padding: "12px 16px",
        background: "#FFE5E5",
        borderRadius: 8,
        color: "#D32F2F",
        fontSize: 13,
        marginBottom: 16,
      }}
    >
      {error}
    </div>
  );
}
