import React, { useState } from "react";
import { getGymsByKeyword, getGyms } from "../api/gyms";

export default function SearchGyms() {
  const [keyword, setKeyword] = useState("");
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Filter state
  const [useMaxDistance, setUseMaxDistance] = useState(false);
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedTypes, setSelectedTypes] = useState({
    Powerlifting: false,
    Yoga: false,
    Strength: false,
    HIIT: false,
    Cardio: false,
  });

  const gymTypes = ["Powerlifting", "Yoga", "Strength", "HIIT", "Cardio"];

  const handleSearch = async () => {
    try {
      setLoading(true);
      
      // If search bar is empty, get all gyms
      if (!keyword.trim()) {
        const res = await getGyms();
        setGyms(res.data?.data || []);
        setHasSearched(true);
        return;
      }

      // Otherwise search by keyword
      const res = await getGymsByKeyword(keyword);
      setGyms(res.data?.data || []);
      setHasSearched(true);
    } catch (err) {
      console.error("Error searching gyms:", err);
      setGyms([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);

      // Get selected gym types
      const selectedTypesList = Object.keys(selectedTypes).filter(
        (type) => selectedTypes[type]
      );

      let allGyms = [];

      // If no types selected, get all gyms
      if (selectedTypesList.length === 0) {
        const res = await getGyms();
        allGyms = res.data?.data || [];
      } else {
        // Search for gyms by each selected keyword
        const gymSets = await Promise.all(
          selectedTypesList.map(async (type) => {
            const res = await getGymsByKeyword(type);
            return res.data?.data || [];
          })
        );

        // Merge results and remove duplicates by gym ID
        const gymMap = new Map();
        gymSets.forEach((gyms) => {
          gyms.forEach((gym) => {
            if (!gymMap.has(gym._id)) {
              gymMap.set(gym._id, gym);
            }
          });
        });

        allGyms = Array.from(gymMap.values());
      }

      // Apply distance filter if enabled
      if (useMaxDistance && allGyms.length > 0) {
        const latitude = 40.7128;
        const longitude = -74.0060;
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        allGyms = allGyms.filter((gym) => {
          const R = 6371; // Earth's radius in km
          const dLat = (gym.latitude - userLat) * (Math.PI / 180);
          const dLon = (gym.longitude - userLon) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userLat * (Math.PI / 180)) *
              Math.cos(gym.latitude * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distanceInKm = R * c;
          return distanceInKm <= maxDistance;
        });
      }

      setGyms(allGyms);
      setHasSearched(true);
      setShowFilterMenu(false);
    } catch (err) {
      console.error("Error filtering gyms:", err);
      setGyms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setUseMaxDistance(false);
    setMaxDistance(50);
    setSelectedTypes({
      Powerlifting: false,
      Yoga: false,
      Strength: false,
      HIIT: false,
      Cardio: false,
    });
    setKeyword("");
    setGyms([]);
    setHasSearched(false);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleGoBack = () => {
    window.location.href = "/dashboard";
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          width: "100%",
          height: 80,
          background: "#C1E973",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleGoBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#42554F",
          }}
        >
          ←
        </button>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#42554F" }}>
          Search Gyms
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* SEARCH SECTION */}
      <div
        style={{
          padding: "20px 24px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E5E5",
          display: "flex",
          gap: 10,
          flexShrink: 0,
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search keywords..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1px solid #DDD",
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "Roboto",
          }}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            background: "#B8ED44",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#42554F",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          style={{
            padding: "10px 16px",
            background: "#42554F",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#B8ED44",
            cursor: "pointer",
          }}
        >
          ⚙️
        </button>
      </div>

      {/* FILTER MENU */}
      {showFilterMenu && (
        <div
          style={{
            padding: "20px 24px",
            background: "#FFFFFF",
            borderBottom: "1px solid #E5E5E5",
            flexShrink: 0,
          }}
        >
          {/* Distance Toggle and Slider */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                marginBottom: 12,
              }}
            >
              <input
                type="checkbox"
                checked={useMaxDistance}
                onChange={(e) => setUseMaxDistance(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#42554F",
                }}
              >
                Use Max Distance Filter
              </span>
            </label>
            
            {useMaxDistance && (
              <>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#42554F",
                    marginBottom: 8,
                  }}
                >
                  Max Distance: {maxDistance} km
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                />
              </>
            )}
          </div>

          {/* Gym Types Checkboxes */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#42554F",
                marginBottom: 12,
              }}
            >
              Gym Types
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gymTypes.map((type) => (
                <label
                  key={type}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#42554F",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes[type]}
                    onChange={() => handleTypeChange(type)}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: "pointer",
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleFilter}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "#B8ED44",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                color: "#42554F",
                cursor: "pointer",
              }}
            >
              Apply Filter
            </button>
            <button
              onClick={handleResetFilters}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "transparent",
                border: "2px solid #DDD",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                color: "#42554F",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* RESULTS SECTION */}
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)",
          overflowY: "auto",
        }}
      >
        {loading && (
          <div
            style={{
              fontSize: 16,
              color: "#666",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Loading...
          </div>
        )}

        {hasSearched && !loading && gyms.length === 0 && (
          <div
            style={{
              fontSize: 16,
              color: "#999",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            No gyms found. Try different search terms or filters.
          </div>
        )}

        {!hasSearched && !loading && (
          <div
            style={{
              fontSize: 16,
              color: "#999",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Enter keywords or use filters to search for gyms.
          </div>
        )}

        {/* Gyms List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {gyms.map((gym) => (
            <div
              key={gym._id}
              style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#42554F",
                  marginBottom: 8,
                }}
              >
                {gym.name}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#666",
                  marginBottom: 8,
                  display: "flex",
                  gap: 8,
                }}
              >
                <span>📍 {gym.location}</span>
              </div>

              {gym.rating && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 8,
                  }}
                >
                  ⭐ Rating: {gym.rating}
                </div>
              )}

              {gym.keywords && gym.keywords.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {gym.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      style={{
                        background: "#B8ED44",
                        color: "#42554F",
                        padding: "4px 10px",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
