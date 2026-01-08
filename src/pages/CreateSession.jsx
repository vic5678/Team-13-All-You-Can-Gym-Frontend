import React, { useState, useRef, useEffect } from "react";
import { createSession } from "../api/sessions";
import { getGyms } from "../api/gyms";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ClearableInput from "../components/ClearableInput";
import SessionFormFields from "../components/SessionFormFields";

export default function CreateSession() {
  const [form, setForm] = useState({
    name: "",
    dateTime: "",
    description: "",
    type: "",
    capacity: "",
    trainer: "",
    gymId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [showGymDropdown, setShowGymDropdown] = useState(false);

  const dateTimeRef = useRef(null);

  // Fetch admin's gyms
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        // Get the gym IDs stored during admin login
        const adminGymIds = JSON.parse(localStorage.getItem("adminGymIds") || "[]");
        console.log("Admin gym IDs from login:", adminGymIds);
        
        if (adminGymIds.length === 0) {
          console.warn("No gym IDs found for this admin");
          setGyms([]);
          return;
        }

        // Fetch all gyms
        const response = await getGyms();
        console.log("All gyms response:", response.data);
        const allGyms = response.data?.data || [];
        console.log("All gyms:", allGyms);
        
        // Filter gyms that belong to this admin
        const adminGyms = allGyms.filter(gym => {
          const gymId = gym._id || gym.id;
          const isAdminGym = adminGymIds.includes(gymId);
          console.log(`Gym ${gym.name} (${gymId}): isAdminGym = ${isAdminGym}`);
          return isAdminGym;
        });
        
        console.log("Filtered admin gyms:", adminGyms);
        setGyms(adminGyms);
      } catch (err) {
        console.error("Failed to fetch gyms:", err);
      }
    };
    fetchGyms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // simple frontend validation
    if (!form.name || !form.dateTime || !form.capacity || !form.gymId) {
      setError("Name, Date/Time, Capacity, and Gym are required");
      return;
    }

    setError("");
    setLoading(true);

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

      console.log("Creating session with payload:", payload);
      const response = await createSession(payload);
      console.log("Session created successfully:", response.data);

      alert("Session created successfully!");
      window.location.href = "/admin/sessions";
    } catch (err) {
      console.error("Failed to create session:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to create session. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
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
        title="Create Session"
        subtitle={<>Set up new training sessions<br />for your gym<br />&nbsp;</>}
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
        <ClearableInput
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          onClear={() => setForm((prev) => ({ ...prev, name: "" }))}
        />

        {/* DATE & TIME */}
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

        {/* GYM */}
        <div style={{ marginBottom: 14, position: "relative" }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>
            Gym * {gyms.length > 0 && `(${gyms.length} available)`}
          </div>
          <div
            onClick={() => {
              console.log("Gym field clicked. Current gyms:", gyms);
              console.log("Dropdown state:", showGymDropdown);
              setShowGymDropdown(!showGymDropdown);
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #42554F",
              fontSize: 13,
              background: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: form.gymId ? "#333" : "#999" }}>
              {form.gymId
                ? gyms.find((g) => g._id === form.gymId)?.name || "Select Gym"
                : "Select Gym"}
            </span>
            <span style={{ fontSize: 10 }}>▼</span>
          </div>
          {showGymDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#FFFFFF",
                border: "1px solid #42554F",
                borderRadius: 8,
                marginTop: 4,
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 10,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {gyms.length === 0 ? (
                <div
                  style={{
                    padding: "10px",
                    fontSize: 13,
                    color: "#999",
                    textAlign: "center",
                  }}
                >
                  No gyms found. Check console for details.
                </div>
              ) : (
                gyms.map((gym) => (
                  <div
                    key={gym._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Selected gym:", gym);
                      setForm((prev) => ({ ...prev, gymId: gym._id }));
                      setShowGymDropdown(false);
                      if (error) setError("");
                    }}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: 13,
                      borderBottom: "1px solid #f0f0f0",
                      background:
                        form.gymId === gym._id ? "#f0f0f0" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f9f9f9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        form.gymId === gym._id ? "#f0f0f0" : "transparent";
                    }}
                  >
                    {gym.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <SessionFormFields
          form={form}
          handleChange={handleChange}
          setForm={setForm}
          trainerMarginBottom={14}
        />

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
