import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActiveSubscription } from "../api/subscriptions";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import FeatureGrid from "../components/FeatureGrid";
import { FaSearch, FaDumbbell, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    navigate("/SubscriptionPackages");
  };

  const handleViewSubscription = () => {
    navigate("/subscription-management");
  };

  // Define features with icons and navigation paths
  const features = [
    {
      icon: <FaSearch />,
      title: "Search Sessions",
      description: "Filter by location, ratings, or equipment.",
      path: "/search-sessions",
    },
    {
      icon: <FaDumbbell />,
      title: "Search Gyms",
      description: "Filter by keyword, type, or distance.",
      path: "/search-gyms",
    },
    {
      icon: <FaThumbsUp />,
      title: "Ratings",
      description: "See what others say about us.",
      path: "/ratings",
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

      <FeatureGrid
        features={features}
        onFeatureClick={(feature) => navigate(feature.path)}
        circularPhotoSrc="/Photos_for_UI/Img_for_dashboard.png"
        photoAlt="Gym"
        photoWidth={150}
        photoHeight={150}
        photoMarginTop={30}
        photoBoxShadow="0 6px 14px rgba(0,0,0,0.25)"
        buttonContent={hasSubscription ? "VIEW MY SUBSCRIPTION" : "SUBSCRIBE NOW"}
        onButtonClick={hasSubscription ? handleViewSubscription : handleSubscribe}
      />
    </div>
  );
}
