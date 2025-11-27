import React from "react";
import { getGymsByKeyword, getGyms } from "../api/gyms";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import "../styles/SearchGyms.css";
import SearchComponent from "../components/SearchComponent";

// A dedicated component to render a single gym item
const GymResultItem = ({ gym }) => (
  <div
    key={gym._id}
    style={{
      background: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ fontSize: 16, fontWeight: 700, color: "#42554F", marginBottom: 8 }}>
      {gym.name}
    </div>
    <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
      <span>📍 {gym.location}</span>
    </div>
    {gym.rating && (
      <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
        ⭐ Rating: {gym.rating}
      </div>
    )}
    {gym.keywords && gym.keywords.length > 0 && (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        {gym.keywords.map((keyword) => (
          <span key={keyword} style={{ background: "#B8ED44", color: "#42554F", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>
            {keyword}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default function SearchGyms() {
  const gymFilterConfig = {
    distance: {
      label: "Use Max Distance Filter",
      max: 100,
      unit: "km",
    },
    types: {
      label: "Gym Types",
      options: ["Powerlifting", "Yoga", "Strength", "HIIT", "Cardio", "Bodybuilding", "CrossFit", "Pilates", "Wellness", "24/7", "Weights", "Cycling"],
    },
  };

  // NOTE: This uses a hardcoded user location. You might want to get the user's actual location.
  const userLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
  };

  return (
    <div
      style={{
        margin: "0 auto",
        background: "#FAFAFA",
        overflow: "hidden",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header title="Search Gyms" subtitle={<>Use the search bar and configure the filters to your liking to find the perfect gym<br />for your style of training<br />&nbsp;</>} userIcon={true} />
      <NavBar />

      <SearchComponent
        getFn={getGyms}
        getByKeywordFn={getGymsByKeyword}
        filterConfig={gymFilterConfig}
        renderResult={(gym) => <GymResultItem key={gym._id} gym={gym} />}
        userLocation={userLocation}
        entityName="gyms"
        placeholder="Search for gyms..."
      />
    </div>
  );
}
