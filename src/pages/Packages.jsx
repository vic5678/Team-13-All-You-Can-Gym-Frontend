import React from "react";

export default function SubscriptionPackages() {
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
      {/* ===== HERO (same style family as other pages) ===== */}
      <div
        style={{
          width: "100%",
          height: 230,
          background: "#C1E973",
          position: "relative",
        }}
      >
        {/* Dark curved block */}
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

        {/* Title */}
        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 95,
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

        {/* Subtitle */}
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

        {/* Icon box top-right */}
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
          padding: "28px 20px 40px",
        }}
      >
        {/* PREMIUM CARD */}
        <div
          style={{
            background: "#C1E973",
            borderRadius: 20,
            padding: "22px 20px 18px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
            marginBottom: 24,
            position: "relative",
          }}
        >
          {/* small outlined square (like a checkbox) */}
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
              marginBottom: 8,
            }}
          >
            Premium
          </div>

          <div
            style={{
              fontSize: 15,
              color: "#263B06",
              marginBottom: 18,
            }}
          >
            Unlimited Gyms • Unlimited Sessions
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: "#000000",
                }}
              >
                49.99$
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#000000",
                }}
              >
                /month
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#42554F",
                textAlign: "right",
                maxWidth: 140,
              }}
            >
              Best for heavy lifters and
              <br />
              frequent gym users.
            </div>
          </div>
        </div>

        {/* BASIC CARD */}
        <div
          style={{
            background: "#D4D3D0",
            borderRadius: 20,
            padding: "22px 20px 18px",
            boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          {/* small outlined square (like a checkbox) */}
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
              marginBottom: 8,
            }}
          >
            Basic
          </div>

          <div
            style={{
              fontSize: 15,
              color: "#000000",
              marginBottom: 16,
            }}
          >
            Access to 3 gyms
            <br />
            3 sessions / week
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: "#000000",
                }}
              >
                29.99$
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#000000",
                }}
              >
                /month
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#42554F",
                textAlign: "right",
                maxWidth: 140,
              }}
            >
              Perfect if you’re getting
              <br />
              started or training casually.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
