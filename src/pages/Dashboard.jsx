import React from "react";

export default function Dashboard() {
  const handleSubscribe = () => {
    window.location.href = "/packages";
  };

  return (
    <div
      style={{
        width: 402,
        height: 874,
        position: "relative",
        background: "#FAFAFA",
        overflow: "hidden",
        margin: "0 auto",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
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
        {/* dark panel with title + subtitle */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 260,
            background: "#42554F",
            padding: "16px 18px",
            borderTopRightRadius: 32,
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: "28px",
              marginBottom: 4,
            }}
          >
            All You Can Gym
          </div>
          <div
            style={{
              fontSize: 11,
              lineHeight: "15px",
            }}
          >
            One App. Every gym
            <br />
            Train anywhere, anytime.
            <br />
            Your way.
          </div>
        </div>

        {/* top-right big icon background (runner) */}
        <div
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            width: 78,
            height: 78,
            borderRadius: 22,
            background: "#42554F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            color: "#C1E973",
          }}
        >
          🏃‍♀️
        </div>

        {/* map + user icons under it */}
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
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#42554F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#C1E973",
            }}
          >
            📍
          </div>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#42554F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#C1E973",
            }}
          >
            👤
          </div>
        </div>
      </div>

            {/* ===== MAIN CONTENT ===== */}
      <div
        style={{
          position: "relative",
          padding: "40px 24px 60px", // increased padding
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
        }}
      >
        {/* features + circular photo */}
        <div
          style={{
            display: "flex",
            gap: 20,               // wider spacing
            marginTop: 20,
            marginBottom: 50,      // more space before the button
          }}
        >
          {/* left column: three features */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 30,             // bigger gaps between features
            }}
          >
            {/* feature 1 */}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#B8ED44",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#263B06",
                }}
              >
                🔍
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#42554F",
                    marginBottom: 4,
                  }}
                >
                  Search Gym Partners
                </div>
                <div style={{ fontSize: 12, lineHeight: "15px", color: "#4F4F4F" }}>
                  Filter by location, ratings, or equipment.
                </div>
              </div>
            </div>

            {/* feature 2 */}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#B8ED44",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#263B06",
                }}
              >
                🗺️
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#42554F",
                    marginBottom: 4,
                  }}
                >
                  View on map
                </div>
                <div style={{ fontSize: 12, lineHeight: "15px", color: "#4F4F4F" }}>
                  Discover gyms near you in real-time.
                </div>
              </div>
            </div>

            {/* feature 3 */}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#B8ED44",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#263B06",
                }}
              >
                👍
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#42554F",
                    marginBottom: 4,
                  }}
                >
                  Ratings
                </div>
                <div style={{ fontSize: 12, lineHeight: "15px", color: "#4F4F4F" }}>
                  See what others say about us.
                </div>
              </div>
            </div>
          </div>

          {/* right side: circular photo */}
          <div
            style={{
              flex: "0 0 150px",     // slightly bigger
              marginTop: 30,         // lower the image
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
                src="/Img_for_dashboard.png"
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

        {/* SUBSCRIBE BUTTON - moved lower */}
        <button
          onClick={handleSubscribe}
          style={{
            marginTop: 80, // pushes it down more
            width: "100%",
            padding: "18px 0",
            background: "#B8ED44",
            borderRadius: 999,
            border: "none",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#42554F",
            cursor: "pointer",
          }}
        >
          SUBSCRIBE NOW
        </button>
      </div>
    </div>
  );
}
