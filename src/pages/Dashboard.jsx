import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActiveSubscription } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { FaSearch, FaMapMarkedAlt, FaThumbsUp } from "react-icons/fa"; // Updated icons
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Dashboard() {
  const { userId } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

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
    navigate("/packages");
  };

  const handleViewSubscription = () => {
    navigate("/subscription-management");
  };

  // Define features with icons and navigation paths
  const features = [
    {
      icon: <FaSearch />,
      title: "Search Gym Partners",
      description: "Filter by location, ratings, or equipment.",
      path: "/search-gyms",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "View on map",
      description: "Discover gyms near you in real-time.",
      path: "/gyms", // Example path
    },
    {
      icon: <FaThumbsUp />,
      title: "Ratings",
      description: "See what others say about us.",
      path: "/ratings", // Example path
    },
  ];

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
            {/* Correctly map over features */}
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => navigate(feature.path)}
                style={{
                  display: "flex",
                  gap: 15,
                  alignItems: "flex-start",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--global-accent-color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "var(--global-accent-color)",
                    flexShrink: 0,
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
              </button>
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
