import React, { useEffect, useState } from "react";
import { getSubscriptionPackages } from "../api/subscriptions";

export default function SubscriptionPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const goBack = () => {
    window.location.href = "/Dashboard";
  };

  const handlePackageClick = (pkg) => {
    // You can customize this later (detail page, checkout, etc.)
    // For now, just log or route based on pkg.id:
    // window.location.href = `/subscription/${pkg.id}`;
    alert(`Selected package: ${pkg.name}`);
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
        width: 402,
        height: 874,
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* ===== HERO ===== */}
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
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 85,
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 700,
            lineHeight: "32px",
          }}
        >
          Subscription
          <br />
          Packages
        </div>

        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 40,
            color: "#FFFFFF",
            fontSize: 12,
            lineHeight: "16px",
          }}
        >
          Choose the plan that fits your
          <br />
          training style and schedule.
        </div>

        <div
          style={{
            position: "absolute",
            right: 24,
            top: 28,
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
          💪
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div
        style={{
          padding: "20px 20px 40px",
        }}
      >
        {/* top row: back arrow and menu icon */}
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
              borderRadius: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "4px 0",
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
                    ? "#C1E973"
                    : "#D4D3D0",
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
                  color: "#42554F",
                  marginBottom: 4,
                }}
              >
                {pkg.name}
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#000",
                  marginBottom: 8,
                }}
              >
                {pkg.price.toFixed(2)}$/month
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: "#000",
                  marginBottom: 8,
                }}
              >
                {pkg.description}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#42554F",
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
