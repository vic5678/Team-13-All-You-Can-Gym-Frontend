import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminHome() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => setShowProfile((prev) => !prev);

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    window.location.href = "/login";
  };
  const handleProfile = () => {
    window.location.href = "/profile";
  };
  return (
    <div
      style={{
        width: 402,
        height: 874,
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Roboto",
      }}
    >
      {/* ===== TOP HERO ===== */}
      <div
        style={{
          width: "100%",
          height: 210,
          background: "#C1E973",
          position: "relative",
        }}
      >
        {/* Dark curved panel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 260,
            background: "#42554F",
            padding: "18px 20px",
            borderTopRightRadius: 32,
            color: "#FFFFFF",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 700 }}>All You Can Gym</div>
          <div
            style={{
              fontSize: 12,
              lineHeight: "16px",
              marginTop: 4,
            }}
          >
            One App. Every gym
            <br />
            Train anywhere, anytime.
            <br />
            Your way.
          </div>
        </div>

        {/* Runner Icon */}
        <div
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            width: 78,
            height: 78,
            background: "#42554F",
            borderRadius: 22,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#C1E973",
            fontSize: 36,
          }}
        >
          🏃‍♀️
        </div>

        {/* Map + User icons */}
        <div
          style={{
            position: "absolute",
            right: 32,
            top: 112,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
          }}
        >
          {/* map icon (static) */}
          <div
            style={{
              width: 34,
              height: 34,
              background: "#42554F",
              borderRadius: 10,
              color: "#C1E973",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            📍
          </div>

          {/* user icon (clickable for profile popup) */}
          <button
            type="button"
            onClick={toggleProfile}
            style={{
              width: 34,
              height: 34,
              background: "#42554F",
              borderRadius: 10,
              color: "#C1E973",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              border: "none",
              cursor: "pointer",
            }}
          >
            👤
          </button>
        </div>

        {/* PROFILE DROPDOWN */}
        {showProfile && (
          <div
            style={{
              position: "absolute",
              right: 16,
              top: 155,
              background: "#FFFFFF",
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              padding: "10px 14px",
              minWidth: 170,
              zIndex: 10,
            }}
          >
            <button
              type="button"
              onClick={handleProfile}
              style={{
                width: "100%",
                padding: "8px 14px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                fontSize: 14,
                color: "#42554F",
                cursor: "pointer",
              }}
            >
              My profile
            </button>
            <div
              style={{
                height: 1,
                background: "#E5E5E5",
                margin: "4px 0",
              }}
            />

            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px 14px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                fontSize: 14,
                color: "#C0392B",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* ===== CONTENT STARTS ===== */}
      <div
        style={{
          padding: "30px 30px 20px",
          textAlign: "center",
        }}
      >
        {/* CREATE SESSION BUTTON */}
        <button
          onClick={() => (window.location.href = "/admin/create-session")}
          style={{
            width: "100%",
            height: 55,
            background: "#B8ED44",
            borderRadius: 25,
            border: "none",
            fontSize: 20,
            fontWeight: 700,
            color: "#42554F",
            cursor: "pointer",
          }}
        >
          CREATE A SESSION
        </button>

        {/* Description */}
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "#42554F",
            textAlign: "left",
            width: "100%",
            lineHeight: "20px",
          }}
        >
          Create a new session for your gym.
          <br />
          Add the necessary details.
          <br />
          Subscribed users will view it &amp; book it!
        </p>

        {/* Image */}
        <img
          src="/Photos_for_UI/GymAdmin_Session1.png"
          alt="gym"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: 12,
            marginTop: 12,
          }}
        />

        {/* EDIT SESSION */}
        <button
          onClick={() => (window.location.href = "/admin/edit-session")}
          style={{
            width: "100%",
            height: 55,
            background: "#B8ED44",
            borderRadius: 25,
            border: "none",
            fontSize: 20,
            fontWeight: 700,
            color: "#42554F",
            cursor: "pointer",
            marginTop: 36,
          }}
        >
          EDIT A SESSION
        </button>

        {/* Edit description */}
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "#42554F",
            textAlign: "left",
            lineHeight: "20px",
          }}
        >
          Something wrong with your session?
          <br />
          Let us know if you want to make any changes.
          <br />
          We’ll notify the users who booked it!
        </p>

        {/* Image */}
        <img
          src="/Photos_for_UI/GymAdmin_Session2.png"
          alt="edit session"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: 12,
            marginTop: 12,
          }}
        />
      </div>
    </div>
  );
}
