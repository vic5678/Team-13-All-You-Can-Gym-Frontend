import React, { useState, useEffect } from "react";
import "../styles/SearchGyms.css";

export default function SearchComponent({
  getFn,
  getByKeywordFn,
  filterConfig,
  renderResult,
  userLocation,
  entityName = "items",
  placeholder = "Search...",
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const getInitialFilterState = () => {
    const initialState = {};
    if (filterConfig.distance) {
      initialState.useMaxDistance = false;
      initialState.maxDistance = 50;
    }
    if (filterConfig.types) {
      initialState.selectedTypes = filterConfig.types.options.reduce(
        (acc, type) => {
          acc[type] = false;
          return acc;
        },
        {}
      );
    }
    return initialState;
  };

  const [filters, setFilters] = useState(getInitialFilterState());

  const handleSearch = async (searchKeyword) => {
    try {
      setLoading(true);
      setShowFilterMenu(false);
      if (!searchKeyword.trim()) {
        const res = await getFn();
        setResults(res.data?.data || []);
      } else {
        const res = await getByKeywordFn(searchKeyword);
        setResults(res.data?.data || []);
      }
      setHasSearched(true);
    } catch (err) {
      console.error(`Error searching ${entityName}:`, err);
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      setShowFilterMenu(false);
      const { useMaxDistance, maxDistance, selectedTypes } = filters;
      const selectedTypesList = Object.keys(selectedTypes).filter(
        (type) => selectedTypes[type]
      );

      let allItems = [];
      if (selectedTypesList.length === 0) {
        const res = await getFn();
        allItems = res.data?.data || [];
      } else {
        const itemSets = await Promise.all(
          selectedTypesList.map(async (type) => {
            const res = await getByKeywordFn(type);
            return res.data?.data || [];
          })
        );
        const itemMap = new Map();
        itemSets.forEach((items) => {
          items.forEach((item) => {
            if (!itemMap.has(item._id)) {
              itemMap.set(item._id, item);
            }
          });
        });
        allItems = Array.from(itemMap.values());
      }

      if (useMaxDistance && userLocation && allItems.length > 0) {
        const userLat = parseFloat(userLocation.latitude);
        const userLon = parseFloat(userLocation.longitude);
        allItems = allItems.filter((item) => {
          if (!item.latitude || !item.longitude) return false;
          const R = 6371; // Earth's radius in km
          const dLat = (item.latitude - userLat) * (Math.PI / 180);
          const dLon = (item.longitude - userLon) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userLat * (Math.PI / 180)) *
              Math.cos(item.latitude * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distanceInKm = R * c;
          return distanceInKm <= maxDistance;
        });
      }

      setResults(allItems);
      setHasSearched(true);
    } catch (err) {
      console.error(`Error filtering ${entityName}:`, err);
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters(getInitialFilterState());
    setKeyword("");
    setResults([]);
    setHasSearched(false);
  };

  const handleTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: {
        ...prev.selectedTypes,
        [type]: !prev.selectedTypes[type],
      },
    }));
  };

  const handleDistanceToggle = (e) => {
    setFilters((prev) => ({ ...prev, useMaxDistance: e.target.checked }));
  };

  const handleDistanceChange = (e) => {
    setFilters((prev) => ({ ...prev, maxDistance: parseInt(e.target.value) }));
  };

  return (
    <>
      {/* SEARCH & FILTER UI */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ padding: "20px 24px", background: "#FFFFFF", borderBottom: "1px solid #E5E5E5", display: "flex", gap: 10 }}>
          <input type="text" placeholder={placeholder} value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSearch(keyword)} style={{ flex: 1, padding: "10px 14px", border: "1px solid #DDD", borderRadius: 8, fontSize: 14, fontFamily: "Roboto" }} />
          <button onClick={() => handleSearch(keyword)} style={{ padding: "10px 16px", background: "#B8ED44", border: "none", borderRadius: 8, cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" stroke="#42554F" strokeWidth="2" strokeLinecap="round"/><path d="M15 15L21 21" stroke="#42554F" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setShowFilterMenu(!showFilterMenu)} style={{ padding: "10px 16px", background: "#42554F", border: "none", borderRadius: 8, color: "#FFFFFF", cursor: "pointer" }}>Filters</button>
        </div>
        {showFilterMenu && (
          <div style={{ padding: "20px 24px", background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" }}>
            {filterConfig.distance && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#42554F" }}>{filterConfig.distance.label}</span>
                  <input type="checkbox" checked={filters.useMaxDistance} onChange={handleDistanceToggle} className="search-gyms-checkbox" />
                </label>
                {filters.useMaxDistance && (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#42554F", marginBottom: 8 }}>Max Distance: {filters.maxDistance} {filterConfig.distance.unit}</div>
                    <input type="range" min="1" max={filterConfig.distance.max} value={filters.maxDistance} onChange={handleDistanceChange} style={{ width: "100%" }} />
                  </>
                )}
              </div>
            )}
            {filterConfig.types && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#42554F", marginBottom: 12 }}>{filterConfig.types.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "160px", overflowY: "auto" }}>
                  {filterConfig.types.options.map((type) => (
                    <label key={type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                      {type}
                      <input type="checkbox" checked={filters.selectedTypes[type]} onChange={() => handleTypeChange(type)} className="search-gyms-checkbox" />
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleFilter} style={{ flex: 1, padding: "10px 0", background: "#B8ED44", border: "none", borderRadius: 8, fontWeight: 700, color: "#42554F", cursor: "pointer" }}>Apply Filter</button>
              <button onClick={handleReset} style={{ flex: 1, padding: "10px 0", background: "transparent", border: "2px solid #DDD", borderRadius: 8, fontWeight: 700, color: "#42554F", cursor: "pointer" }}>Reset</button>
            </div>
          </div>
        )}
      </div>

      {/* RESULTS SECTION */}
      <div style={{ flex: 1, padding: "20px 24px", background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F9F9F9 100%)", overflowY: "auto" }}>
        {loading && <div style={{ textAlign: "center", marginTop: 20, color: "#666" }}>Loading...</div>}
        {hasSearched && !loading && results.length === 0 && <div style={{ textAlign: "center", marginTop: 40, color: "#999" }}>No {entityName} found. Try different search terms or filters.</div>}
        {!hasSearched && !loading && <div style={{ textAlign: "center", marginTop: 40, color: "#999" }}>Enter keywords or use filters to search for {entityName}.</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {results.map((item) => renderResult(item))}
        </div>
      </div>
    </>
  );
}