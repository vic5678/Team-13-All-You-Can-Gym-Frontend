import React, { useState, useRef } from "react";
import { createSession } from "../api/sessions"; // make sure this exists
import { getGyms } from "../api/gyms";

const DEFAULT_GYM_ID = "6918bd9901dad2f5694d1d8a"; // paste real one from terminal

export default function CreateSession() {
  const [form, setForm] = useState({
    name: "",
    dateTime: "",
    description: "",
    type: "",
    capacity: "",
    trainer: "",
    gymId: DEFAULT_GYM_ID,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dateTimeRef = useRef(null);

  const goBack = () => {
    window.location.href = "/AdminHome";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // simple frontend validation
    if (!form.name || !form.dateTime || !form.capacity) {
      setError("Name, Date/Time and Capacity are required");
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      const res = await getGyms();
      const gyms = res.data;
      console.log("Fetched gyms:", gyms);
      if (gyms.data.length > 0) {
        form.gymId = gyms.data[0]._id; // assign first gym's ID
      } else {
        throw new Error("No gyms available to assign session to.");
      }
      const payload = {
        name: form.name,
        description: form.description,
        type: form.type,
        capacity: Number(form.capacity),
        trainerName: form.trainer,
        dateTime: new Date(form.dateTime).toISOString(),
        gymId: form.gymId,    // TODO: replace with real gymId
      };

      await createSession(payload);

      alert("Session created successfully!");
      window.location.href = "/admin/sessions";
    } catch (err) {
      console.error(err);
      setError("Failed to create session. Please try again.");
    } finally {
      setLoading(false);
    }
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
              onClick={() => setForm((prev) => ({ ...prev, name: "" }))}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* DATE & TIME with real picker */}
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
              onClick={() => setForm((prev) => ({ ...prev, description: "" }))}
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
              onClick={() => setForm((prev) => ({ ...prev, type: "" }))}
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
              onClick={() => setForm((prev) => ({ ...prev, capacity: "" }))}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* TRAINER */}
        <div style={{ marginBottom: 14 }}>
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
              onClick={() => setForm((prev) => ({ ...prev, trainer: "" }))}
            >
              ⓧ
            </span>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              fontSize: 12,
              color: "crimson",
              marginBottom: 10,
            }}
          >
            {error}
          </div>
        )}

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 0",
            background: loading ? "#d5f58a" : "#B8ED44",
            borderRadius: 999,
            border: "none",
            fontSize: 16,
            fontWeight: 700,
            color: "#42554F",
            cursor: loading ? "default" : "pointer",
            marginTop: 10,
          }}
        >
          {loading ? "Saving..." : "SAVE"}
        </button>
      </form>
    </div>
  );
}
