import React, { useEffect, useState } from "react";
import { getSubscriptionPackages } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SubscriptionPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePackageClick = (pkg) => {
    navigate(`/plan/${pkg._id}`);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSubscriptionPackages();
        // backend uses successResponse: { success, message, data }
        const data = res.data?.data || [];
        setPackages(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load subscription packages.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <Header
        title="Subscription Packages"
        subtitle="Choose the plan that fits your training style and schedule."
      />
      <NavBar />
      {/* ===== MAIN CONTENT ===== */}
      <div
        style={{
          padding: "20px 20px 40px",
        }}
      >
        {loading && <p>Loading packages…</p>}
        {error && (
          <p style={{ color: "crimson", marginBottom: 16 }}>{error}</p>
        )}

        {!loading && !error && packages.length === 0 && (
          <p>No subscription packages available.</p>
        )}

        {/* Render each package as a card */}
        {!loading &&
          !error &&
          packages.map((pkg) => (
            <div
              key={pkg._id || pkg.id}
              onClick={() => handlePackageClick(pkg)}
              style={{
                background:
                  pkg.name.toLowerCase().includes("premium") ||
                  pkg.id?.toLowerCase().includes("premium")
                    ? "var(--global-accent-color-secondary)" // Highlight premium packages
                    : "#d0d3d4ff",
                borderRadius: 20,
                padding: "22px 20px 18px",
                boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                marginBottom: 24,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  top: 22,
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  border: "3px solid #42554F",
                }}
              />

              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "var(--global-accent-color)",
                  marginBottom: 4,
                }}
              >
                {pkg.name}
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--global-text-color)",
                  marginBottom: 8,
                }}
              >
                {pkg.price.toFixed(2)}$/month
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: "var(--global-text-color)",
                  marginBottom: 8,
                }}
              >
                {pkg.description}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "var(--global-text-color-muted)",
                }}
              >
                Duration: {pkg.durationDays} days ·{" "}
                {pkg.sessionLimit} sessions
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
