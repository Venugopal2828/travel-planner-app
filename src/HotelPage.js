import React, { useState } from "react";
import "./NaturePage.css";

const HotelPage = () => {
  const stays = [
    { name: "Pura Tanah Lot", price: "$555 / night", rating: 4.5, reviews: 120 },
    { name: "Udaya Resort and Spa", price: "$160 / night", rating: 4.5, reviews: 98 },
    { name: "Jimbaran Stay", price: "$186 / night", rating: 4.5, reviews: 74 },
    { name: "Nusa Dusa", price: "$325 / night", rating: 4.5, reviews: 99 },
    { name: "Bali Boutique Hotel", price: "$200 / night", rating: 4.4, reviews: 80 },
    { name: "Seaside Villa", price: "$300 / night", rating: 4.6, reviews: 110 },
  ];
  const [filters, setFilters] = useState({
    maxDistance: 50,
    price: 1000,
    minRating: 0,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseFloat(value),
    }));
  };
  const filteredStays = stays.filter((stay) => {
    const stayPrice = parseFloat(stay.price.replace(/[^0-9.]/g, ""));
    return stayPrice <= filters.price && stay.rating >= filters.minRating;
  });

  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const toggleAdditionalFilters = () => {
    setShowAdditionalFilters((prev) => !prev);
  };

  return (
    <div className="background-container">
      <div className="content-container">
        <div className="sidebar">
          <ul>
            <li>Home</li>
            <li>🏨 Hotels</li>
            <li>✈️ Flights</li>
            <li>📍 Attractions</li>
            <li>📜 Plans</li>
          </ul>
          <hr className="line-separator" />
          <div className="cd-filter-wrapper">
            <div className="cd-filter-header">
              <h4>Filter By</h4>
            </div>
            <div className="cd-filters">
              <form>
                <div className="cd-filter-block">
                  <h5>Price</h5>
                  <label>
                    Max Price: ${filters.price}
                    <input
                      type="range"
                      name="price"
                      value={filters.price}
                      min="0"
                      max="1000"
                      step="50"
                      onChange={handleFilterChange}
                      aria-label="Filter by maximum price"
                    />
                  </label>
                </div>
                <div className="cd-filter-block">
                  <h5>Rating</h5>
                  <label>
                    Minimum Rating: {filters.minRating} ⭐
                    <input
                      type="range"
                      name="minRating"
                      value={filters.minRating}
                      min="0"
                      max="5"
                      step="0.5"
                      onChange={handleFilterChange}
                      aria-label="Filter by minimum rating"
                    />
                  </label>
                </div>
              </form>
              <button
                type="button"
                onClick={toggleAdditionalFilters}
                className="toggle-filters-btn"
              >
                {showAdditionalFilters ? "Hide Additional Filters" : "Show Additional Filters"}
              </button>
              {showAdditionalFilters && (
                <div className="additional-filters">
                  {/* Amenities */}
                  <div className="filter-category">
                    <h4>Amenities</h4>
                    <label>
                      <input type="checkbox" name="wifi" value="wifi" /> WiFi
                    </label>
                    <label>
                      <input type="checkbox" name="pool" value="pool" /> Pool
                    </label>
                    <label>
                      <input type="checkbox" name="geyser" value="geyser" /> Geyser
                    </label>
                    <label>
                      <input type="checkbox" name="parking" value="parking" /> Parking
                    </label>
                  </div>
                  {/* Distance */}
                  <div className="filter-category">
                    <h4>Distance</h4>
                    <input type="range" min="0" max="50" step="1" />
                    <p>Adjust the distance range (in km)</p>
                  </div>
                  {/* Room Type */}
                  <div className="filter-category">
                    <h4>Room Type</h4>
                    <label>
                      <input type="checkbox" name="deluxe" value="deluxe" /> Deluxe
                    </label>
                    <label>
                      <input type="checkbox" name="suite" value="suite" /> Suite
                    </label>
                    <label>
                      <input type="checkbox" name="studio" value="studio" /> Studio Room
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="left-section">
          <div className="search-bar-container">
              <input
                type="text"
                placeholder="Thessaloniki"
                className="search-destination"
              />
              <div className="date-picker">
                <input type="date" className="start-date" />
                <input type="date" className="end-date" />
              </div>
              <div className="guest-selector">
                <select className="guest-dropdown">
                  <option value="1">1 adult</option>
                  <option value="2">2 adults</option>
                  <option value="3">3 adults</option>
                  <option value="4">4 adults</option>
                </select>
              </div>
              <button className="search-button">SEARCH</button>
            </div>

            <h3>Popular Stays</h3>
            <div className="scrollable-container">
              <div className="stays-list">
                {filteredStays.length > 0 ? (
                  filteredStays.map((stay, index) => (
                    <div className="stay-card" key={index}>
                      <div className="stay-image"></div>
                      <div className="stay-details">
                        <h4>{stay.name}</h4>
                        <p>{stay.price}</p>
                        <span>
                          ⭐ {stay.rating} ({stay.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No stays match the selected filters.</p>
                )}
              </div>
            </div>
          </div>
          <div className="right-section">
            <h1>Live as if</h1>
            <h2>The Paradise</h2>
            <p>is on earth</p>
            <button className="plan-trip-button">Plan a Trip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
