import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscriptionPackageById } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { FaInfinity, FaDumbbell } from "react-icons/fa";

export default function Plan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPackage = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getSubscriptionPackageById(id);
        setPackage(res.data?.data || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load package details.");
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [id]);

  const handleBuy = () => {
    if (!pkg) return;
    navigate(`/payment?planId=${pkg._id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "crimson", padding: "2rem" }}>{error}</div>;
  }

  if (!pkg) {
    return <div style={{ padding: "2rem" }}>Package not found.</div>;
  }

  return (
    <div>
      <Header
        title={pkg.name}
        subtitle={`${pkg.price.toFixed(2)}$ / ${pkg.durationDays} days`}
      />
      <NavBar />

      <div style={{ padding: "20px" }}>
        {/* Features Section */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--global-accent-color-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#263B06" }}>
              <FaDumbbell />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#42554F" }}>
              {pkg.sessionLimit} Sessions
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: "18px" }}>
            Access any partner gym for up to {pkg.sessionLimit} sessions within the {pkg.durationDays}-day period.
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--global-accent-color-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#263B06" }}>
              <FaInfinity />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#42554F" }}>
              Unlimited Gyms
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: "18px" }}>
            {pkg.description}
          </div>
        </div>

        {/* BUY NOW button */}
        <button
          onClick={handleBuy}
          style={{
            marginTop: 32,
            width: "100%",
            padding: "16px 0",
            background: "var(--global-accent-color-secondary)",
            borderRadius: 999,
            border: "none",
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "var(--global-accent-color)",
            cursor: "pointer",
          }}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}