import React from "react";

export default function FeatureItem({ icon, title, description }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "var(--global-accent-color-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#263B06",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#42554F",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#555",
          lineHeight: "18px",
        }}
      >
        {description}
      </div>
    </div>
  );
}
