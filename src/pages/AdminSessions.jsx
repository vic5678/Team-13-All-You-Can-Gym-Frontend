import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as sessionApi from "../api/sessions";

export default function AdminSessions() {
  const { userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        
        // Mock data for development
        const mockSessions = [
          {
            id: "session-001",
            title: "Morning Yoga",
            description: "Relaxing yoga session for beginners and intermediate practitioners",
            startTime: "08:00 AM - 09:00 AM",
            maxCapacity: 15,
          },
          {
            id: "session-002",
            title: "HIIT Training",
            description: "High-intensity interval training to boost your cardio fitness",
            startTime: "10:00 AM - 10:45 AM",
            maxCapacity: 20,
          },
          {
            id: "session-003",
            title: "Strength & Conditioning",
            description: "Build muscle and increase your strength with weights",
            startTime: "05:00 PM - 06:00 PM",
            maxCapacity: 12,
          },
          {
            id: "session-004",
            title: "Pilates Core Workout",
            description: "Focus on core stability and flexibility",
            startTime: "06:30 PM - 07:30 PM",
            maxCapacity: 18,
          },
          {
            id: "session-005",
            title: "Zumba Dance Fitness",
            description: "Fun dance-based fitness class for all levels",
            startTime: "07:00 PM - 08:00 PM",
            maxCapacity: 25,
          },
        ];

        // Uncomment the code below to fetch from backend instead of using mock data
        // const response = await sessionApi.getAllSessions();
        // setSessions(response.data || []);
        
        setSessions(mockSessions);
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

  const goBack = () => {
    window.location.href = "/admin/edit-session";
  };

  const handleEditSession = (sessionId) => {
    // Store session ID and navigate to edit page
    window.location.href = `/admin/edit-session2?sessionId=${encodeURIComponent(sessionId)}`;
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) {
      return;
    }

    try {
      await sessionApi.deleteSession(sessionId);
      setSessions(sessions.filter((s) => s.id !== sessionId));
    } catch (err) {
      console.error("Error deleting session:", err);
      setError("Failed to delete session. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: 402,
        minHeight: "100vh",
        margin: "0 auto",
        position: "relative",
        background: "#FAFAFA",
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
            My Sessions
          </div>
        </div>

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
          📋
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div
        style={{
          padding: "18px 22px 30px",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
          minHeight: "calc(100vh - 230px)",
          boxSizing: "border-box",
        }}
      >
        {/* back button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
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
                key={session.id}
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
                      {session.title || "Untitled Session"}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#999",
                      }}
                    >
                      ID: {session.id}
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
                  {session.startTime && (
                    <div>
                      <strong>Time:</strong> {session.startTime}
                    </div>
                  )}
                  {session.maxCapacity && (
                    <div>
                      <strong>Capacity:</strong> {session.maxCapacity} spots
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
                    onClick={() => handleEditSession(session.id)}
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
                    onClick={() => handleDeleteSession(session.id)}
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
