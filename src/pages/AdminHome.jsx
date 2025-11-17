import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { FaPlus, FaListAlt, FaDumbbell, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Define admin features with icons and navigation paths
  const features = [
    {
      icon: <FaPlus />,
      title: "Create session",
      description: "Set up new training sessions for your gym.",
      path: "/admin/create-session",
    },
    {
      icon: <FaListAlt />,
      title: "View my sessions",
      description: "Manage and edit your existing sessions.",
      path: "/admin/edit-session",
    },
    {
      icon: <FaDumbbell />,
      title: "Create gym",
      description: "Add a new gym to the platform.",
      path: "/admin/create-gym",
    },
    {
      icon: <FaBuilding />,
      title: "View my gyms",
      description: "See all gyms you manage.",
      path: "/admin/my-gyms",
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
        subtitle={<>Managing your gym and planning sessions made easier than ever.</>}
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
          {/* left column: four features */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
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
                <div style={{ flex: 1 }}>
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
                      color: "var(--global-text-color-muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {feature.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* right: circular photo */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/Photos_for_UI/GymAdmin_Session1.png"
              alt="Gym admin"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

