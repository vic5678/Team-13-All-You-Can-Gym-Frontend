import React from "react";

export default function PaymentPage() {
  // read ?plan=premium or ?plan=basic from the URL
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan") || "premium"; // default premium

  const isPremium = plan !== "basic";
  const itemLabel = isPremium ? "Premium" : "Basic";
  const totalPrice = isPremium ? "49,99$" : "29,99$";

  const goBack = () => {
    window.location.href = isPremium ? "/premium-plan" : "/basic-plan";
  };

  const handleCancel = () => {
    window.location.href = "/packages"; // or wherever you like
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    alert(`Payment confirmed for ${itemLabel} (${totalPrice}) – demo.`);
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
      {/* ===== HERO ===== */}
      <div
        style={{
          width: "100%",
          height: 230,
          background: "#C1E973",
          position: "relative",
        }}
      >
        {/* dark curved block */}
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
              fontSize: 26,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: "32px",
            }}
          >
            Order
            <br />
            Summary
          </div>
        </div>

        {/* small icon top-left */}
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

        {/* runner icon top-right */}
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
      <form
        onSubmit={handleConfirm}
        style={{
          padding: "18px 22px 40px",
          height: 874 - 230,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* back + menu */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
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

        {/* item + total rows */}
        <div
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Item:</span>
          <span style={{ fontWeight: 600 }}>{itemLabel}</span>
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Total:</span>
          <span style={{ fontWeight: 600 }}>{totalPrice}</span>
        </div>

        {/* card image */}
        <div
          style={{
            width: "100%",
            height: 140,
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: 18,
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src="/Photos_for_UI/card.jpg"
            alt="Credit card"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* PAYMENT METHOD HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            fontWeight: 700,
            color: "#555",
            borderBottom: "1px solid #ddd",
            paddingBottom: 6,
            marginBottom: 12,
          }}
        >
          <span>PAYMENT METHOD:</span>
          <span>CREDIT CARD</span>
        </div>

        {/* CARD NUMBER */}
        <div
          style={{
            marginBottom: 10,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#999",
              marginBottom: 3,
            }}
          >
            Card Number
          </div>
          <input
            type="text"
            defaultValue="5354 6786 8788 2324"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: 8,
              border: "1px solid #B8ED44",
              background: "#F8FFEB",
              fontSize: 13,
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 10,
              top: 28,
              fontSize: 16,
              color: "#42554F",
            }}
          >
            💳
          </span>
        </div>

        {/* EXPIRY + CVV */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: "#999",
                marginBottom: 3,
              }}
            >
              Expiry Date
            </div>
            <input
              type="text"
              defaultValue="12/26"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "1px solid #B8ED44",
                background: "#F8FFEB",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: "#999",
                marginBottom: 3,
              }}
            >
              CVV
            </div>
            <input
              type="text"
              defaultValue="234"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "1px solid #B8ED44",
                background: "#F8FFEB",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* NAME */}
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#999",
              marginBottom: 3,
            }}
          >
            Name
          </div>
          <input
            type="text"
            defaultValue="John Papadopoulos"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #B8ED44",
              background: "#F8FFEB",
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: "14px 0",
              borderRadius: 999,
              border: "2px solid #333",
              background: "#FFFFFF",
              color: "#333",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            CANCEL
          </button>

          <button
            type="submit"
            style={{
              flex: 1,
              padding: "14px 0",
              borderRadius: 999,
              border: "none",
              background: "#B8ED44",
              color: "#42554F",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            CONFIRM PAYMENT
          </button>
        </div>
      </form>
    </div>
  );
}
