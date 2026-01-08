import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as sessionApi from "../api/sessions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ErrorMessage from "../components/ErrorMessage";

export default function AdminSessions() {
  const { userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        
        // Get the gym IDs stored during admin login
        const adminGymIds = JSON.parse(localStorage.getItem("adminGymIds") || "[]");
        console.log("Admin gym IDs:", adminGymIds);
        
        if (adminGymIds.length === 0) {
          console.warn("No gyms found for this admin");
          setSessions([]);
          setError("");
          setLoading(false);
          return;
        }

        // Fetch all sessions and filter by admin's gyms
        const response = await sessionApi.getAllSessions();
        console.log("All sessions response:", response);
        
        const allSessions = response.data?.data || response.data || [];
        console.log("All sessions before filtering:", allSessions);
        
        // Filter sessions that belong to admin's gyms
        const adminSessions = allSessions.filter(session => {
          const sessionGymId = session.gymId?._id || session.gymId;
          const belongsToAdmin = adminGymIds.includes(sessionGymId);
          console.log(`Session ${session.name} (gym: ${sessionGymId}): belongs to admin = ${belongsToAdmin}`);
          return belongsToAdmin;
        });
        
        console.log("Filtered admin sessions:", adminSessions);
        setSessions(adminSessions);
        setError("");
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Failed to load sessions. Please try again.");
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  const handleEditSession = (sessionId) => {
    // Store session ID and navigate to edit page
    window.location.href = `/admin/edit-session?sessionId=${encodeURIComponent(sessionId)}`;
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) {
      return;
    }

    try {
      console.log("Deleting session:", sessionId);
      await sessionApi.deleteSession(sessionId);
      setSessions(sessions.filter((s) => (s._id || s.id) !== sessionId));
      alert("Session deleted successfully!");
    } catch (err) {
      console.error("Error deleting session:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete session. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: "0 auto",
        position: "relative",
        background: "#FAFAFA",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <Header
        title="My Sessions"
        subtitle={<>Manage your training sessions<br />Edit or delete sessions<br />&nbsp;</>}
      />
      <NavBar />

      {/* ===== CONTENT ===== */}
      <div
        style={{
          padding: "18px 22px 30px",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
          minHeight: "calc(100vh - 240px)",
          boxSizing: "border-box",
        }}
      >
        {/* session count */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#42554F",
            }}
          >
            {sessions.length} Sessions
          </span>
        </div>

        {/* error message */}
        <ErrorMessage error={error} />

        {/* loading state */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
              fontSize: 14,
            }}
          >
            Loading sessions...
          </div>
        )}

        {/* empty state */}
        {!loading && sessions.length === 0 && !error && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
            No sessions found. Create a new session to get started!
          </div>
        )}

        {/* sessions list */}
        {!loading && sessions.length > 0 && (
          <div>
            {sessions.map((session) => (
              <div
                key={session._id || session.id}
                style={{
                  padding: "16px",
                  background: "#FFFFFF",
                  borderRadius: 12,
                  border: "1px solid #E0E0E0",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#42554F",
                        marginBottom: 4,
                      }}
                    >
                      {session.name || "Untitled Session"}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#999",
                      }}
                    >
                      {session.type && `${session.type} • `}
                      {session.trainerName && `Trainer: ${session.trainerName}`}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 18,
                      padding: "4px 8px",
                      background: "#C1E973",
                      borderRadius: 6,
                    }}
                  >
                    ✓
                  </span>
                </div>

                {/* Session details */}
                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    marginBottom: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {session.description && (
                    <div style={{ marginBottom: 8 }}>
                      {session.description}
                    </div>
                  )}
                  {session.dateTime && (
                    <div>
                      <strong>Date & Time:</strong>{" "}
                      {new Date(session.dateTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                  {session.capacity && (
                    <div>
                      <strong>Capacity:</strong> {session.capacity} spots
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => handleEditSession(session._id || session.id)}
                    style={{
                      padding: "8px 16px",
                      background: "#B8ED44",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#42554F",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSession(session._id || session.id)}
                    style={{
                      padding: "8px 16px",
                      background: "#FFE5E5",
                      border: "1px solid #D32F2F",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#D32F2F",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
