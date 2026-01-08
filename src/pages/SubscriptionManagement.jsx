// src/pages/SubscriptionManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getSubscriptions,
  getSubscriptionPackages,
  cancelSubscription,
} from "../api/subscriptions";

export default function SubscriptionManagement() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);          // the one we show
  const [activeSubscriptions, setActiveSubscriptions] = useState([]); // ALL active subs
  const [packageDetails, setPackageDetails] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadSubscription = async () => {
      try {
        setLoading(true);
        setError(null);
        setSubscription(null);
        setPackageDetails(null);
        setActiveSubscriptions([]);

        // 1) Get user's subscriptions
        const subRes = await getSubscriptions(userId);
        const subscriptions = subRes.data?.data || subRes.data || [];

        const now = new Date();

        // 2) Get all active subs (not explicitly inactive and not expired)
        const actives = subscriptions.filter(
          (sub) => sub.isActive !== false && new Date(sub.endDate) > now
        );

        if (!actives.length) {
          setError("No active subscription found");
          return;
        }

        setActiveSubscriptions(actives);

        // 3) Pick the *latest* active subscription (by startDate or endDate)
        const latestActive = actives.reduce((latest, current) => {
          const latestDate = new Date(latest.startDate || latest.endDate);
          const currentDate = new Date(current.startDate || current.endDate);
          return currentDate > latestDate ? current : latest;
        });

        setSubscription(latestActive);

        // 4) Get all packages
        const pkgRes = await getSubscriptionPackages();
        const packages = pkgRes.data?.data || pkgRes.data || [];
        setAllPackages(packages);

        // 5) Find the package for the active (latest) subscription
        const pkg = packages.find(
          (p) => String(p._id) === String(latestActive.packageId)
        );

        if (!pkg) {
          setError("Subscription package not found");
          return;
        }

        setPackageDetails(pkg);
      } catch (err) {
        console.error("Error loading subscription:", err);
        setError("Failed to load subscription details");
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [userId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = async () => {
    if (!activeSubscriptions.length) return;
    try {
      // 🔥 Cancel *all* active subscriptions for this user
      for (const sub of activeSubscriptions) {
        await cancelSubscription(userId, sub._id);
      }
      setShowCancelConfirm(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error canceling subscription:", err);
      setError("Failed to cancel subscription");
    }
  };

  // ---------- PLAN TYPE / PERIOD HELPERS ----------

  const currentName = (packageDetails?.name || "").toLowerCase();

  const isBasicPlan = currentName.includes("basic");
  const isPremiumPlan = currentName.includes("premium");

  const isYearly =
    currentName.includes("year") ||
    (packageDetails && packageDetails.durationDays >= 360);

  const periodMatches = (name, durationDays) => {
    const n = (name || "").toLowerCase();
    if (isYearly) {
      return n.includes("year") || durationDays >= 360;
    }
    return n.includes("month") || durationDays < 360;
  };

  const findMatchingPlan = (targetType /* 'basic' | 'premium' */) => {
    const targetIsBasic = targetType === "basic";
    return allPackages.find((p) => {
      const n = (p.name || "").toLowerCase();
      const typeOk = targetIsBasic ? n.includes("basic") : n.includes("premium");
      const periodOk = periodMatches(p.name, p.durationDays);
      return typeOk && periodOk;
    });
  };

  const handleUpgrade = () => {
    if (!packageDetails || allPackages.length === 0) return;

    const target = findMatchingPlan("premium");
    if (!target) {
      setError("Matching premium plan not found.");
      return;
    }

    navigate(`/packages/${target._id}`);
  };

  const handleDowngrade = () => {
    if (!packageDetails || allPackages.length === 0) return;

    const target = findMatchingPlan("basic");
    if (!target) {
      setError("Matching basic plan not found.");
      return;
    }

    navigate(`/packages/${target._id}`);
  };

  // ---------- RENDER ----------

  if (loading) {
    return (
      <div
        style={{
          width: 402,
          height: 874,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !subscription || !packageDetails) {
    return (
      <div
        style={{
          width: 402,
          height: 874,
          margin: "0 auto",
          background: "#FAFAFA",
          padding: "24px",
          fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#42554F",
              marginBottom: 16,
            }}
          >
            {error || "Subscription not found"}
          </div>
          <button
            onClick={handleGoBack}
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#B8ED44",
              borderRadius: 999,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              color: "#42554F",
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const startDate = new Date(subscription.startDate).toLocaleDateString();
  const nextPaymentDate = new Date(subscription.endDate).toLocaleDateString();

  return (
    <div
      style={{
        margin: "0 auto",
        overflow: "hidden",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          width: "100%",
          height: 80,
          background: "var(--global-accent-color-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={handleGoBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#42554F",
          }}
        >
          ←
        </button>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#42554F",
          }}
        >
          Manage Subscription
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "40px 24px 60px",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
        }}
      >
        {/* Current Plan Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#42554F",
              marginBottom: 20,
            }}
          >
            Current Plan
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ color: "#666", fontSize: 14 }}>
                Subscription Plan:
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#42554F",
                  fontSize: 14,
                }}
              >
                {packageDetails.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ color: "#666", fontSize: 14 }}>Price:</span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#42554F",
                  fontSize: 14,
                }}
              >
                ${packageDetails.price}/month
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ color: "#666", fontSize: 14 }}>Started:</span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#42554F",
                  fontSize: 14,
                }}
              >
                {startDate}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ color: "#666", fontSize: 14 }}>
                Upcoming Payment:
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#42554F",
                  fontSize: 14,
                }}
              >
                {nextPaymentDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {/* Upgrade/Downgrade Button */}
          <button
            onClick={isBasicPlan ? handleUpgrade : handleDowngrade}
            style={{
              width: "100%",
              padding: "14px 0",
              background: isBasicPlan ? "#42554F" : "transparent",
              border: isBasicPlan ? "none" : "2px solid #C0392B",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 700,
              color: isBasicPlan ? "#FFFFFF" : "#C0392B",
              cursor: "pointer",
            }}
          >
            {isBasicPlan
              ? "Upgrade to Premium Plan"
              : "Downgrade to Basic Plan"}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => setShowCancelConfirm(true)}
            style={{
              width: "100%",
              padding: "14px 0",
              background: "transparent",
              border: "2px solid #C0392B",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 700,
              color: "#C0392B",
              cursor: "pointer",
            }}
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#42554F",
                marginBottom: 12,
              }}
            >
              Cancel Subscription?
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#666",
                marginBottom: 24,
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to cancel your {packageDetails.name}? You
              will lose access to all gym features.
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowCancelConfirm(false)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: "#E5E5E5",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#42554F",
                  cursor: "pointer",
                }}
              >
                Keep It
              </button>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: "#C0392B",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                Cancel It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
