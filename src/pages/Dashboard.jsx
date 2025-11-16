import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActiveSubscription } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { GiMagnifyingGlass }  from "react-icons/gi";

export default function Dashboard() {
  const { userId } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, [userId]);

  const checkSubscription = async () => {
    if (userId) {
      const subscription = await getActiveSubscription(userId);
      setHasSubscription(!!subscription);
    }
  };

  const handleSubscribe = () => {
    window.location.href = "/packages";
  };

  const handleViewSubscription = () => {
    window.location.href = "/subscription-management";
  };

  return (
    <div
      style={{
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <Header
        title="All You Can Gym"
        subtitle={<>One App. Every gym<br />Train anywhere, anytime. <br />Your way.</>}
      />
      <NavBar />

      {/* ===== MAIN CONTENT ===== */}
      <div
        style={{
          position: "relative",
          padding: "40px 24px 60px",
        }}
      >
        {/* features + circular photo */}
        <div
          style={{
        display: "flex",
        gap: 20,
        marginTop: 20,
        marginBottom: 50,
          }}
        >
          {/* left column: three features */}
          <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
          >
        {[
          {
            icon: "🔍",
            title: "Search Gym Partners",
            description: "Filter by location, ratings, or equipment.",
          },
          {
            icon: "🗺️",
            title: "View on map",
            description: "Discover gyms near you in real-time.",
          },
          {
            icon: "👍",
            title: "Ratings",
            description: "See what others say about us.",
          },
        ].map((feature, index) => (
          <div key={index} style={{ display: "flex", gap: 10, alignItems: 'flex-start' }}>
            <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: "var(--global-accent-color-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0, /* Add this to prevent shrinking */
          }}
            >
          {feature.icon}
            </div>
            <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--global-accent-color)",
              marginBottom: 4,
            }}
          >
            {feature.title}
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: "15px",
              color: "var(--global-text-color-muted)",
            }}
          >
            {feature.description}
          </div>
            </div>
          </div>
        ))}
          </div>

          {/* right side: circular photo */}
          <div
            style={{
              flex: "0 0 150px",
              marginTop: 30,
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src="/Photos_for_UI/Img_for_dashboard.png"
                alt="Gym"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        {/* SUBSCRIBE BUTTON */}
        <button
          onClick={hasSubscription ? handleViewSubscription : handleSubscribe}
          style={{
            marginTop: 80,
            width: "100%",
            padding: "18px 0",
            background: "var(--global-accent-color-secondary)",
            borderRadius: 999,
            border: "none",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "var(--global-accent-color)",
            cursor: "pointer",
          }}
        >
          {hasSubscription ? "VIEW MY SUBSCRIPTION" : "SUBSCRIBE NOW"}
        </button>
      </div>
    </div>
  );
}
