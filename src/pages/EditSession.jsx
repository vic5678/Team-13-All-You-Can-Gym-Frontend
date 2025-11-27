// src/pages/EditSession.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import * as sessionApi from "../api/sessions";

export default function EditSession() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    dateTime: "",
    description: "",
    type: "",
    capacity: "",
    trainer: "",
    gymId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const dateTimeRef = useRef(null);

  // Get session ID from URL and fetch session data
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("sessionId");
        
        if (!id) {
          setError("No session ID provided");
          setLoading(false);
          return;
        }

        setSessionId(id);
        console.log("Fetching session:", id);

        const response = await sessionApi.getSessionById(id);
        console.log("Session data:", response.data);
        
        const sessionData = response.data?.data || response.data;
        
        // Convert dateTime to input format
        const dateTime = sessionData.dateTime 
          ? new Date(sessionData.dateTime).toISOString().slice(0, 16)
          : "";

        setForm({
          name: sessionData.name || "",
          dateTime: dateTime,
          description: sessionData.description || "",
          type: sessionData.type || "",
          capacity: sessionData.capacity?.toString() || "",
          trainer: sessionData.trainerName || "",
          gymId: sessionData.gymId?._id || sessionData.gymId || "",
        });

        setError("");
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to load session. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!sessionId) {
      setError("No session ID available");
      return;
    }

    // Validate required fields
    if (!form.name || !form.dateTime || !form.capacity) {
      setError("Name, Date/Time, and Capacity are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        description: form.description,
        type: form.type,
        capacity: Number(form.capacity),
        trainerName: form.trainer,
        dateTime: new Date(form.dateTime).toISOString(),
        gymId: form.gymId,
      };

      console.log("Updating session with payload:", payload);
      const response = await sessionApi.updateSession(sessionId, payload);
      console.log("Session updated successfully:", response.data);

      alert("Session updated successfully!");
      navigate("/admin/sessions");
    } catch (err) {
      console.error("Error updating session:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update session. Please try again.";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionId) {
      setError("No session ID available");
      return;
    }

    const ok = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!ok) return;

    try {
      console.log("Deleting session:", sessionId);
      await sessionApi.deleteSession(sessionId);
      
      alert("Session deleted successfully!");
      navigate("/admin/sessions");
    } catch (err) {
      console.error("Error deleting session:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete session. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <Header
        title="Edit Session"
        subtitle={<>Update session details<br />Modify or delete sessions<br />&nbsp;</>}
      />
      <NavBar />

      {/* ===== CONTENT ===== */}
      <form
        onSubmit={handleSave}
        style={{
          padding: "18px 22px 40px",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* Loading state */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
              fontSize: 14,
            }}
          >
            Loading session...
          </div>
        )}

        {/* Error message */}
        {error && (
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
        )}

        {!loading && (
          <>
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
                cursor: "pointer",
              }}
              onClick={() => setForm((prev) => ({ ...prev, name: "" }))}
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
              placeholder="dd/mm/yyyy, hh:mm"
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
                cursor: "pointer",
              }}
              onClick={() =>
                setForm((prev) => ({ ...prev, description: "" }))
              }
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
                cursor: "pointer",
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
                cursor: "pointer",
              }}
              onClick={() => setForm((prev) => ({ ...prev, capacity: "" }))}
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
                cursor: "pointer",
              }}
              onClick={() => setForm((prev) => ({ ...prev, trainer: "" }))}
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
            disabled={saving || loading}
            style={{
              flex: 1,
              padding: "14px 0",
              background: saving ? "#d5f58a" : "#B8ED44",
              borderRadius: 999,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              color: "#42554F",
              cursor: saving || loading ? "default" : "pointer",
            }}
          >
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "#FFFFFF",
              borderRadius: 999,
              border: "2px solid #D9534F",
              fontSize: 14,
              fontWeight: 700,
              color: "#D9534F",
              cursor: loading ? "default" : "pointer",
            }}
          >
            DELETE
          </button>
        </div>
          </>
        )}
      </form>
    </div>
  );
}
