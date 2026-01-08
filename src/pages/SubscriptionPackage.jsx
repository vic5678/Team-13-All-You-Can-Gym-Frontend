// src/pages/Plan.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscriptionPackageById } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import FeatureItem from "../components/FeatureItem";
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
        setError("");
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
    // keep your existing payment navigation
    navigate(`/payment?planId=${pkg._id}`);
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "crimson", padding: "2rem" }}>
        {error}
      </div>
    );
  }

  if (!pkg) {
    return <div style={{ padding: "2rem" }}>Package not found.</div>;
  }

  // optional: derive sessions per week like you did before
  const sessionsPerWeek =
    pkg.sessionLimit && pkg.durationDays
      ? Math.round(pkg.sessionLimit / (pkg.durationDays / 7))
      : null;

  return (
    <div>
      {/* Header now uses backend data */}
      <Header
        title={pkg.name}
        subtitle={`${pkg.price.toFixed(2)}$ / ${pkg.durationDays} days`}
      />
      <NavBar />

      <div style={{ padding: "20px" }}>
        {/* ===== Feature: Sessions ===== */}
        <FeatureItem
          icon={<FaDumbbell />}
          title={`${pkg.sessionLimit} Sessions${
            sessionsPerWeek ? ` (~${sessionsPerWeek} / week)` : ""
          }`}
          description={`Access any partner gym for up to ${pkg.sessionLimit} sessions within the ${pkg.durationDays}-day period.`}
        />

        {/* ===== Feature: Gyms / Description ===== */}
        <FeatureItem
          icon={<FaInfinity />}
          title="Unlimited Gyms"
          description={pkg.description}
        />

        {/* ===== IMAGE (from PremiumPlan UI) ===== */}
        <div
          style={{
            width: "100%",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            margin: "14px 0 24px",
          }}
        >
          <img
            src="/Photos_for_UI/GymPlan.png"
            alt="Gym plan"
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* ===== UNLOCK COMMENT (from PremiumPlan UI) ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 40,
              fontSize: 28,
              color: "#263B06",
              textAlign: "center",
            }}
          >
            ⬇️
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: "18px",
            }}
          >
            Unlock all these features to train smarter, socialize, and stay
            motivated with the {pkg.name} plan.
          </div>
        </div>

        {/* ===== BUY NOW button ===== */}
        <button
          onClick={handleBuy}
          style={{
            marginTop: 16,
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
