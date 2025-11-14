import React from "react";

export default function PremiumPlan() {
  const goBack = () => {
    window.location.href = "/subscriptions"; // or "/packages", whatever your route is
  };

  const handleBuy = () => {
    // for now just go back or go to a checkout page
    window.location.href = "/payment"; // change to what you need
  };

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
      {/* ===== TOP HERO ===== */}
      <div
        style={{
          width: "100%",
          height: 230,
          background: "#C1E973",
          position: "relative",
        }}
      >
        {/* dark block with plan name */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 270,
            height: 160,
            background: "#42554F",
            borderTopRightRadius: 40,
            padding: "22px 20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: 10,
            }}
          >
            Premium Plan
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            49.99$/month
          </div>
        </div>

        {/* top-left small icon (like receipt) */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 24,
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "#42554F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C1E973",
            fontSize: 22,
          }}
        >
          🧾
        </div>

        {/* runner icon box top-right */}
        <div
          style={{
            position: "absolute",
            right: 24,
            top: 24,
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
          🏃‍♀️
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div
        style={{
          padding: "22px 20px 40px",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          height: 874 - 230,
          boxSizing: "border-box",
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

        {/* Unlimited Gyms */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#B8ED44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#263B06",
              }}
            >
              🏋️
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#42554F",
              }}
            >
              Unlimited Gyms
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: "18px",
            }}
          >
            Access any partner gym with no restrictions – train wherever suits
            you best.
          </div>
        </div>

        {/* Unlimited Sessions */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#B8ED44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#263B06",
              }}
            >
              🔁
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#42554F",
              }}
            >
              Unlimited Sessions
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: "18px",
            }}
          >
            Book as many workout sessions as you like, with complete flexibility.
          </div>
        </div>

        {/* IMAGE */}
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
            src="/Img_for_dashboard.png" // reuse existing image; replace if you want
            alt="Premium gym"
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Text + arrow above button */}
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
            motivated.
          </div>
        </div>

        {/* BUY NOW button */}
        <button
          onClick={handleBuy}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "16px 0",
            background: "#B8ED44",
            borderRadius: 999,
            border: "none",
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#42554F",
            cursor: "pointer",
          }}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
