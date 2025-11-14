import React from "react";

export default function EditSession() {
  const goBack = () => {
    window.location.href = "/admin";
  };

  const handleContinue = (e) => {
    e.preventDefault();
    alert("Continue with this Session ID (demo).");
  };

  const handleViewSessions = () => {
    window.location.href = "/admin/sessions";
  };

  return (
    <div
      style={{
        width: 402,
        height: 874,
        margin: "0 auto",
        position: "relative",
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
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 270,
            height: 155,
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
            }}
          >
            Edit Session
          </div>
        </div>

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

      {/* ===== CONTENT (above the grey panel) ===== */}
      <form
        onSubmit={handleContinue}
        style={{
          padding: "18px 22px 170px", // extra bottom padding so content doesn't hide behind grey box
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* back + menu */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <button
            type="button"
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
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

        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#333",
            marginBottom: 14,
          }}
        >
          Do you want to edit a Session?
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#666",
            marginBottom: 24,
          }}
        >
          Enter Session ID
        </div>

        {/* Session ID field */}
        <div style={{ marginBottom: 8, position: "relative" }}>
          <div
            style={{
              fontSize: 11,
              color: "#999",
              marginBottom: 3,
            }}
          >
            Session ID
          </div>
          <input
            type="text"
            placeholder="Enter session ID"
            style={{
              width: "100%",
              padding: "10px 36px 10px 10px",
              borderRadius: 8,
              border: "1px solid #42554F",
              fontSize: 13,
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 10,
              top: 30,
              fontSize: 16,
              color: "#999",
              cursor: "pointer",
            }}
          >
            ⓧ
          </span>
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#999",
            marginBottom: 40,
          }}
        >
          Forgot your Session ID?
        </div>

        {/* CONTINUE */}
        <button
          type="submit"
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
          }}
        >
          CONTINUE
        </button>
      </form>

      {/* ===== BOTTOM GREY PANEL (outside form, stuck to bottom) ===== */}
      <button
        type="button"
        onClick={handleViewSessions}
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: 402,
          height: 130,
          background: "#D3D3D3",
          border: "none",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: "#42554F",
            marginBottom: 6,
          }}
        >
          View my Sessions
        </span>
        <span
          style={{
            fontSize: 20,
            color: "#42554F",
          }}
        >
          ⬆️
        </span>
      </button>
    </div>
  );
}
