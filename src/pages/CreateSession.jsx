import React, { useState } from "react";

export default function CreateSession() {
  const [form, setForm] = useState({
    name: "",
    dateTime: "",
    description: "",
    type: "",
    capacity: "",
    trainer: "",
  });

  const goBack = () => {
    window.location.href = "/admin"; // back to admin home
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // demo behaviour – replace with API call later
    console.log("Create session:", form);
    alert("Session saved (demo).");
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
            Create
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
          Enter Session details
        </div>

        {/* helper to reuse styles */}
        {[
          { label: "Name", name: "name", placeholder: "Name" },
          { label: "Date & Time", name: "dateTime", placeholder: "Date & Time", isDate: true },
          { label: "Description", name: "description", placeholder: "Description" },
          { label: "Type", name: "type", placeholder: "Type" },
          { label: "Capacity", name: "capacity", placeholder: "Capacity" },
          { label: "Trainer's Name", name: "trainer", placeholder: "Trainer's Name" },
        ].map((field, idx) => (
          <div key={field.name} style={{ marginBottom: idx === 5 ? 26 : 14 }}>
            <div
              style={{
                fontSize: 11,
                color: "#999",
                marginBottom: 3,
              }}
            >
              {field.label}
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
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
                {field.isDate ? "📅" : "ⓧ"}
              </span>
            </div>
          </div>
        ))}

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 0",
            background: "#B8ED44",
            borderRadius: 999,
            border: "none",
            fontSize: 16,
            fontWeight: 700,
            color: "#42554F",
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          SAVE
        </button>
      </form>
    </div>
  );
}
