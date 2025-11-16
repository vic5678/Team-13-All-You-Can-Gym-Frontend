import React, { useEffect, useState } from "react";
import { getGymById } from "../api/gyms";
import { getSessionById } from "../api/sessions";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const adminGymId = localStorage.getItem("adminGymId");

    if (!adminGymId) {
      setError("No gym assigned to this admin.");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        // 1) get this admin's gym
        const res = await getGymById(adminGymId);
        const gym = res.data?.data; // successResponse: { success, message, data }

        if (!gym) {
          setError("Could not find gym for this admin.");
          return;
        }

        const rawSessions = gym.sessions || [];

        // 2) if sessions are already full objects, just use them
        if (
          rawSessions.length > 0 &&
          typeof rawSessions[0] === "object" &&
          rawSessions[0].name
        ) {
          setSessions(rawSessions);
          return;
        }

        // 3) otherwise they’re IDs – fetch each session
        const fetchedSessions = await Promise.all(
          rawSessions.map(async (id) => {
            const sRes = await getSessionById(id);
            return sRes.data?.data;
          })
        );

        setSessions(fetchedSessions.filter(Boolean));
      } catch (err) {
        console.error(err);
        setError("Failed to load sessions for this gym.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Sessions</h1>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Sessions</h1>
        <p style={{ color: "crimson" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Sessions</h1>
      {sessions.length === 0 ? (
        <p>No sessions yet for this gym.</p>
      ) : (
        <div className="grid">
          {sessions.map((s) => (
            <article className="card" key={s._id}>
              <h2>{s.name}</h2>
              <p>Trainer: {s.trainerName}</p>
              <p>
                Time:{" "}
                {new Date(s.dateTime).toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <p>Capacity: {s.capacity}</p>
              <button
                className="btn"
                onClick={() => alert(`Pretend book ${s.name}`)}
              >
                Book
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
