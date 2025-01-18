import React, {useState} from "react";

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
      const styles = `
      /* General Styles */
      body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #ffffff;
        overflow: hidden;
      }

      /* Background container */
      .background-container {
        height: 100vh;
        width: 100vw;
        background: url('./Images/download.jpeg') no-repeat center center / cover;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Content container (box) */
      .content-container {
        width: 90%;
        height: 90%;
        display: flex;
        background-color: transparent;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1;
        position: relative;
        backdrop-filter: blur(15px);
      }

      /* Sidebar */
      .sidebar {
        width: 20%;
        background-color: #3ba1b0;
        color: white;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .sidebar ul {
        list-style: none;
        padding: 0;
      }

      .sidebar li {
        margin: 10px 0;
        cursor: pointer;
      }

      .sidebar li:hover {
        text-decoration: underline;
      }

      .sidebar .line-separator {
        height: 1px;
        background: white;
        margin: 90px 0;
      }

      /* Filter Wrapper */
      .cd-filter-wrapper {
        margin-top: 20px;
      }

      .cd-filter-header h4 {
        color: white;
        margin-bottom: 10px;
      }

      .cd-filters form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .cd-filter-block {
        background: rgba(255, 255, 255, 0.8);
        padding: 10px;
        border-radius: 8px;
      }

      .cd-filter-block h5 {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }

      .cd-filter-content {
        margin-top: 5px;
      }

      .cd-filter-content label {
        font-size: 12px;
        color: #555;
        display: block;
      }

      .cd-filter-content input[type="range"] {
        width: 100%;
        margin-top: 5px;
      }

      /* Main Content */
      .main-content {
        display: flex;
        flex: 1;
        flex-direction: row;
        background-color: transparent;
        justify-content: space-between;
        padding: 20px;
        gap: 20px;
      }

      /* Left Section */
      .left-section {
        width: 90%;
        padding: 20px;
      }

      .search-bar {
        width: 100%;
        padding: 10px;
        font-size: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 1px solid #ddd;
      }

      .stays-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .stay-card {
        display: flex;
        gap: 15px ;
        padding: 10px ;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
      }

      .stay-image {
        width: 500px;
        height: 80px;
        background-color: #ddd;
        border-radius: 5px;
      }


      /* Carousel */
      .carousel {
        display: flex;
        gap: 10px;
      }

      .carousel img {
        width: 100px;
        height: 600px;
        border-radius: 5px;
        object-fit: cover;
      }

      /* Scrollable Filters */
      .scrollable-container {
        height: 400px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.4) transparent;
        margin-top: 0;
      }

      .scrollable-container::-webkit-scrollbar {
        width: 8px;
      }

      .scrollable-container::-webkit-scrollbar-thumb {
        background: rgba(0, 9, 9, 0.4);
        border-radius: 10px;
      }

      .scrollable-container::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 55, 55, 0.6);
      }

      /* Scrollable Filters Section */
      .scrollable-filters {
        display: flex;
        align-items: center;
        overflow-x: auto;
        gap: 10px;
        padding-bottom: 10px;
      }

      .filter-buttons button {
        flex-shrink: 0;
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        cursor: pointer;
      }

      .filter-buttons button:hover {
        background-color: #f0f0f0;
      }

      .expand-filters {
        padding: 5px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 18px;
      }

      .toggle-filters-btn {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .toggle-filters-btn:hover {
        background-color: #29517c;
      }

      .additional-filters {
        margin-top: 15px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

.search-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.search-destination {
  flex: 2;
  border: none;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  margin-right: 10px;
  outline: none;
}

.date-picker {
  display: flex;
  flex: 2;
  gap: 10px;
}

.start-date,
.end-date {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
}

.guest-selector {
  flex: 1;
}

.guest-dropdown {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
}

.search-button {
  flex: 1;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}


     `;
  

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
