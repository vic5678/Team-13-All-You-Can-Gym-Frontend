import React from "react";

export default function DateTimeInput({ dateTimeRef, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
        Date &amp; Time
      </div>
      <div style={{ position: "relative" }}>
        <input
          ref={dateTimeRef}
          type="datetime-local"
          name="dateTime"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
        <button
          type="button"
          onClick={() => {
            if (dateTimeRef.current) dateTimeRef.current.showPicker?.();
            if (dateTimeRef.current) dateTimeRef.current.focus();
          }}
          style={{
            position: "absolute",
            right: 6,
            top: 5,
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          📅
        </button>
      </div>
    </div>
  );
}
