import React from "react";
// NOTE: You will need to create these API functions for sessions
import { getAllSessions, searchSessions } from "../api/sessions";
import { getGymById } from "../api/gyms";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import "../styles/SearchGyms.css"; // Reusing styles from SearchGyms
import SearchComponent from "../components/SearchComponent";
import SessionResultItem from "../components/SessionResultItem";

export default function SearchSessions() {
  // Define filters specific to sessions
  const sessionFilterConfig = {
    // Distance filter is removed, so it won't be displayed for sessions.
    // Session types might be different from gym types
    types: {
      label: "Session Types",
      options: ["Yoga", "Strength", "HIIT", "Cardio", "Cycling", "Pilates", "Wellness"],
    },
  };

  // userLocation is no longer needed here as the distance filter is disabled.

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
      <Header title="Search Sessions" subtitle="Find the perfect training session by searching or using the filters below" userIcon={true} />
      <NavBar />

      <SearchComponent
        getFn={getAllSessions}
        getByKeywordFn={searchSessions}
        filterConfig={sessionFilterConfig}
        renderResult={(session) => <SessionResultItem key={session._id} session={session} />}
        // The userLocation prop is removed
        entityName="sessions"
        placeholder="Search for sessions..."
      />
    </div>
  );
}