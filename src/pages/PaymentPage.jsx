// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { getSubscriptionPackageById , processPayment} from "../api/subscriptions";


export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // read ?planId=<packageId> from the URL
  const params = new URLSearchParams(location.search);
  const planId = params.get("planId");

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // local state for inputs
  const [cardNumber, setCardNumber] = useState("5354 6786 8788 2324");
  const [expiryDate, setExpiryDate] = useState("12/26");
  const [cvv, setCvv] = useState("234");
  const [name, setName] = useState("John Papadopoulos");

  useEffect(() => {
    const loadPackage = async () => {
      if (!planId) {
        setError("No plan selected.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const res = await getSubscriptionPackageById(planId);
        const data = res.data?.data || res.data || null;
        if (!data) {
          setError("Failed to load plan details.");
        } else {
          setPkg(data);
        }
      } catch (err) {
        console.error("Error loading plan:", err);
        setError("Failed to load plan details.");
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [planId]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!pkg) return;

    try {
      setSubmitting(true);
      setError("");

      // call backend /payment/checkout
      await processPayment({
        cardNumber,
        expiryDate,
        cvv,
        amount: pkg.price,
        packageId: pkg._id,       // backend can use this to create subscription
        cardHolderName: name,
      });

      // on success: go to dashboard or subscription management
      navigate("/dashboard"); // or "/manage-subscription"
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        Loading payment details…
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        <div style={{ color: "crimson", marginBottom: "1rem" }}>
          {error || "Plan not found."}
        </div>
        <button
          onClick={() => navigate("/packages")}
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            border: "none",
            background: "#B8ED44",
            color: "#42554F",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Back to Packages
        </button>
      </div>
    );
  }

  const itemLabel = pkg.name;
  const totalPrice = `${pkg.price.toFixed(2)}$`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <Header title="Order Summary" subtitle={`${itemLabel} • ${totalPrice}`} />
      <NavBar />

      <form
        onSubmit={handleConfirm}
        style={{
          maxWidth: 402,
          margin: "0 auto",
          padding: "18px 22px 40px",
          height: 874 - 230,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* error message (if payment failed) */}
        {error && (
          <div style={{ color: "crimson", marginBottom: 12, fontSize: 13 }}>
            {error}
          </div>
        )}

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
        <div style={{ marginBottom: 10, position: "relative" }}>
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
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
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
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* CONFIRM button */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 999,
            border: "none",
            background: "#B8ED44",
            color: "#42554F",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            cursor: submitting ? "default" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "PROCESSING..." : "CONFIRM PAYMENT"}
        </button>
      </form>
    </div>
  );
}
