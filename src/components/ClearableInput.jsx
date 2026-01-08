import React from "react";

export default function ClearableInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onClear,
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
          {label}
        </div>
      )}
      <div style={{ position: "relative" }}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px 36px 10px 10px",
            borderRadius: 8,
            border: "1px solid #42554F",
            fontSize: 13,
            outline: "none",
            background: "#FFFFFF",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 9,
            fontSize: 16,
            color: "#999",
            cursor: "pointer",
          }}
          onClick={onClear}
        >
          ⓧ
        </span>
      </div>
    </div>
  );
}
