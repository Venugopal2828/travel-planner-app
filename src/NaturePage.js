import React, {useState} from "react";
import "./NaturePage.css";

const NaturePage = () => {
  const stays = [
    { name: "Blue Ridge Parkway", price: "Free", rating: 4.5, reviews: 120, About: "This scenic drive stretches 469 miles through the Appalachian Mountains"},
    { name: "Great Smoky Mountains National Park", price: "$30 per person", rating: 4.5, reviews: 98, About:" Straddling the border between North Carolina and Tennessee, this park offers over 800 miles of trails." },
    { name: "Jimbaran Stay", price: "$100 /vehicle ", rating: 4.5, reviews: 74 },
    { name: "Nusa Dusa", price: "$325 ", rating: 4.5, reviews: 99 },
    { name: "Bali Boutique Hotel", price: "$200  ", rating: 4.4, reviews: 80 },
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
      {/* Content Wrapper */}
      <div className="content-container">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
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
                    <h4>Activities</h4>
                    <label>
                      <input type="checkbox" name="trekking" value="trekking" /> Trekking
                    </label>
                    <label>
                      <input type="checkbox" name="camping" value="camping" /> Camping
                    </label>
                    <label>
                      <input type="checkbox" name="ropeway" value="ropeway" /> Ropeway
                    </label>
                    <label>
                      <input type="checkbox" name="wildlife" value="wildlife" /> Wildlife viewing
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
                    <h4>Landscape</h4>
                    <label>
                      <input type="checkbox" name="Mountains" value="mountains" /> Mountains
                    </label>
                    <label>
                      <input type="checkbox" name="lakes" value="lakes" /> LAkes&Rivers
                    </label>
                    <label>
                      <input type="checkbox" name="deserts" value="deserts" /> Deserts
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="main-content">
          {/* Left Section */}
          <div className="left-section">
            <input
              type="text"
              className="search-bar"
              placeholder="Destination, Hotel etc."
            />
            <h3>Popular Stays</h3>
            <div className="scrollable-container">
              <div
                className="stays-list">
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
                      <p>{stay.About}</p>
                    </div>
                  </div>
                ))
              ): (
              <p> No places match the selected filters</p>
              )}
              
            </div>
            </div>
          </div>

          {/* Right Section */}
          {/* <div className="right-section">
            <h1>Live as if</h1>
            <h2>The Paradise</h2>
            <p>is on earth</p>
            <button className="plan-trip-button">Plan a Trip</button>
            
              
            </div> */}
        </div>
    
      </div>
    </div>
  );
};

export default NaturePage;
