import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import FeatureGrid from "../components/FeatureGrid";
import { FaPlus, FaListAlt, FaDumbbell, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
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
      path: "/admin/sessions",
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

      <FeatureGrid
        features={features}
        onFeatureClick={(feature) => navigate(feature.path)}
        circularPhotoSrc="/Photos_for_UI/GymAdmin_Session1.png"
        photoAlt="Gym admin"
        photoWidth={120}
        photoHeight={120}
        photoMarginTop={0}
        photoBoxShadow="0 4px 12px rgba(0,0,0,0.1)"
      />
    </div>
  );
}

