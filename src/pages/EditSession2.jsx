// src/pages/EditSession.jsx
import React, { useState, useRef } from "react";

export default function EditSession2() {
  // TODO: later you can load real data by ID (from URL or API)
  const [form, setForm] = useState({
    name: "Morning HIIT",
    dateTime: "2025-01-15T09:00",
    description: "High-intensity interval training for all levels.",
    type: "HIIT",
    capacity: "15",
    trainer: "Alex Johnson",
  });

  const dateTimeRef = useRef(null);

  const goBack = () => {
    window.location.href = "/AdminHome"; // back to admin home
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Edit session (save):", form);
    alert("Session updated (demo).");
    // TODO: call your API here
  };

  const handleDelete = () => {
    const ok = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!ok) return;

    console.log("Delete session (demo)");
    alert("Session deleted (demo).");
    // TODO: call your API, then redirect
    window.location.href = "/AdminHome";
  };

  return (
    <div
      style={{
        width: 402,
        height: 874,
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* ===== TOP HERO ===== */}
      <div
        style={{
          width: "100%",
          height: 230,
          background: "#C1E973",
          position: "relative",
        }}
      >
        {/* dark curved panel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 270,
            height: 155,
            background: "#42554F",
            borderTopRightRadius: 40,
            padding: "22px 20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Edit
            <br />
            Session
          </div>
        </div>

        {/* runner icon top-right */}
        <div
          style={{
            position: "absolute",
            right: 24,
            top: 24,
            width: 80,
            height: 80,
            borderRadius: 24,
            background: "#42554F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C1E973",
            fontSize: 32,
          }}
        >
          🏃‍♀️
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <form
        onSubmit={handleSave}
        style={{
          padding: "18px 22px 40px",
          height: 874 - 230,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* back + menu */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <button
            type="button"
            onClick={goBack}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 26,
              color: "#42554F",
            }}
          >
            ←
          </button>

          <div
            style={{
              width: 26,
              height: 26,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 20,
                height: 3,
                background: "#42554F",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 20,
                height: 3,
                background: "#42554F",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 20,
                height: 3,
                background: "#42554F",
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#333",
            marginBottom: 18,
          }}
        >
          Edit Session details
        </div>

        {/* NAME */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Name
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
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
              }}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* DATE & TIME with picker */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Date &amp; Time
          </div>
          <div style={{ position: "relative" }}>
            <input
              ref={dateTimeRef}
              type="datetime-local"
              name="dateTime"
              value={form.dateTime}
              onChange={handleChange}
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

        {/* DESCRIPTION */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Description
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
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
              }}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* TYPE */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Type
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={form.type}
              onChange={handleChange}
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
              }}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* CAPACITY */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Capacity
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
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
              }}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* TRAINER */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Trainer&apos;s Name
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="trainer"
              placeholder="Trainer's Name"
              value={form.trainer}
              onChange={handleChange}
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
              }}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* SAVE + DELETE BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "14px 0",
              background: "#B8ED44",
              borderRadius: 999,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              color: "#42554F",
              cursor: "pointer",
            }}
          >
            SAVE CHANGES
          </button>

          <button
            type="button"
            onClick={handleDelete}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "#FFFFFF",
              borderRadius: 999,
              border: "2px solid #D9534F",
              fontSize: 14,
              fontWeight: 700,
              color: "#D9534F",
              cursor: "pointer",
            }}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
}
