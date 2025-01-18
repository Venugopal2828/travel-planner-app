import React, { useState } from "react";
import styles from "./NaturePage.module.css";
import { useNavigate } from "react-router-dom";

const BeachPage = () => {
  const navigate = useNavigate();
  const stays = [
    {
      name: "Waikiki Beach, Hawaii, USA",
      price: "$255 / night",
      rating: 4.5,
      reviews: 120,
      Features: "World-famous, ideal for beginners.",
      Images: [
        "https://images.pexels.com/photos/4321407/pexels-photo-4321407.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      info: "It is Hawaii's most famous beach and is known for its clear blue waters and stunning views of Diamond Head.",
      details1: `Waikiki Beach, located in Honolulu on the island of Oahu, Hawaii, is one of the world’s most iconic coastal destinations. Renowned for its golden sands and calm turquoise waters, the beach offers stunning views of Diamond Head crater, a prominent volcanic landmark. Historically a retreat for Hawaiian royalty, Waikiki is now a vibrant hub for tourists, blending natural beauty with a rich cultural legacy. It is celebrated as the birthplace of modern surfing, with ties to the legendary Duke Kahanamoku, whose statue stands as a tribute on the beach. `,
      details2 : `Visitors can enjoy a range of activities, including surfing, paddleboarding, snorkeling, and outrigger canoe rides, all set against the backdrop of palm trees and a lively beachfront.Beyond the sand and surf, Waikiki is a bustling neighborhood offering luxurious hotels like the historic Royal Hawaiian Hotel and the Moana Surfrider. Kalakaua Avenue, the area’s main thoroughfare, features a mix of high-end boutiques, local shops, and diverse dining options, from casual plate lunches to fine dining. Nearby attractions such as the Honolulu Zoo, Waikiki Aquarium, and hiking trails at Diamond Head add to the area’s appeal. Whether you’re seeking relaxation, adventure, or cultural exploration, Waikiki’s warm weather, welcoming spirit, and array of activities make it a quintessential Hawaiian experience year-round.`,
    },
    {
      name: "Siesta Key Beach, Florida, USA",
      price: "$160 / night",
      rating: 4.5,
      reviews: 98,
      Features: "Fine white sand, clear water, family-friendly.",
      Images: [
        "https://images.pexels.com/photos/11434956/pexels-photo-11434956.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2265846/pexels-photo-2265846.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      info: "It is known for its fine white sand, clear blue waters, and family-friendly atmosphere.",
      details1: `Siesta Key Beach is a popular destination for beachgoers in Florida. It is known for its fine white sand, clear blue waters, and family-friendly atmosphere. The beach is located on Siesta Key, a barrier island off the coast of Sarasota.It stretches for eight miles along the Gulf of Mexico, offering plenty of space for sunbathing, swimming, and other recreational activities. The sand at Siesta Key Beach is unique in that it is 99% pure quartz, making it soft and cool to the touch.`,
      details2:`  The beach is also known for its stunning sunsets, which can be enjoyed from the shore or from one of the many waterfront restaurants and bars in the area. In addition to its natural beauty, Siesta Key Beach offers a range of amenities, including picnic areas, restrooms, and volleyball courts. The beach is also home to the Siesta Key Drum Circle, a popular weekly event where locals and visitors gather to play music and dance on the sand. Whether you're looking to relax in the sun, swim in the crystal-clear waters, or enjoy a lively beach party, Siesta Key Beach has something for everyone."`,
    },
    {
      name: "Playa del Amor (Hidden Beach), Mexico",
      price: "$186 / night",
      rating: 4.5,
      reviews: 74,
      Features: "Hidden in a crater, secluded.",
      Images: [
        "https://images.pexels.com/photos/30021719/pexels-photo-30021719/free-photo-of-serene-beach-with-moored-boat-in-playa-del-carmen.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      info: "It is known for its unique hidden location and crystal-clear waters.",
      details: "Playa del Amor, also known as Hidden Beach, is a secluded beach located in a crater on one of the Marieta Islands in Mexico. The beach is hidden beneath a large hole in the ground, giving it a unique and otherworldly appearance. Visitors can access the beach by swimming or kayaking through a short tunnel that connects the crater to the ocean. Once inside, guests are greeted by a pristine sandy shore surrounded by towering rock walls and crystal-clear waters. The beach is a popular spot for snorkeling, swimming, and sunbathing, and is home to a diverse array of marine life. The Marieta Islands are a protected marine reserve, and visitors are encouraged to respect the natural environment and wildlife. Playa del Amor is a must-visit destination for travelers looking to experience the beauty and tranquility of Mexico's Pacific coast.",
    },
    {
      name: "Bondi Beach, Sydney, Australia",
      price: "$325 / night",
      rating: 4.5,
      reviews: 99,
      Features: "Iconic crescent shape, vibrant atmosphere.",
      Images: [
        "https://images.pexels.com/photos/2265846/pexels-photo-2265846.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    {
      name: "Whitehaven Beach, Queensland, Australia",
      price: "$200 / night",
      rating: 4.4,
      reviews: 80,
      Features: "Pristine white sand, vibrant blue water.",
      Images: [
        "https://images.pexels.com/photos/30030959/pexels-photo-30030959/free-photo-of-scenic-coastal-cave-with-kayak-and-ocean-view.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    {
      name: "Blue Ridge Parkway",
      price: "Free",
      rating: 4.5,
      reviews: 120,
      Features:
        "This scenic drive stretches 469 miles through the Appalachian Mountains",
      Images: [
        "https://images.pexels.com/photos/30021719/pexels-photo-30021719/free-photo-of-serene-beach-with-moored-boat-in-playa-del-carmen.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    {
      name: "Great Smoky Mountains National Park",
      price: "$30 per person",
      rating: 4.5,
      reviews: 98,
      Features:
        "Straddling the border between North Carolina and Tennessee, this park offers over 800 miles of trails.",
      Images: [
        "https://images.unsplash.com/photo-1675702670582-9fa50ca1daa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlYXQlMjBzbW9reSUyMG1vdW50YWlufGVufDB8fDB8fHww",
      ],
    },
    {
      name: "Jimbaran Stay",
      price: "$100 / vehicle ",
      rating: 4.5,
      reviews: 74,
      Features: "default",
      Images: [
        "https://images.unsplash.com/photo-1677380609604-7f5395072ca9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGppbWJhcmFufGVufDB8fDB8fHww",
      ],
    },
    {
      name: "Nusa Dusa",
      price: "$325",
      rating: 4.5,
      reviews: 99,
      Features: "default",
      Images: [
        "https://images.unsplash.com/photo-1674660104821-39fc051b29c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnVzYSUyMGR1YXxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    {
      name: "Bali Boutique Hotel",
      price: "$200",
      rating: 4.4,
      reviews: 80,
      Features: "default",
      Images: [
        "https://images.unsplash.com/photo-1518731683836-4e9cce00ba49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGJhbGklMjBmb29kfGVufDB8fDB8fHww",
      ],
    },
    {
      name: "Seaside Villa",
      price: "$300 / night",
      rating: 4.6,
      reviews: 110,
      Features: "default",
      Images: [
        "https://images.pexels.com/photos/4321407/pexels-photo-4321407.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
  ];
  const [filters, setFilters] = useState({
    price: 1000,
    minRating: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [personCount, setPersonCount] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseFloat(value),
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const toggleAdditionalFilters = () => {
    setShowAdditionalFilters((prev) => !prev);
  };



  const filteredStays = stays.filter((stay) => {
    const stayPrice = parseFloat(stay.price.replace(/[^0-9.]/g, ""));
    const matchesSearchQuery =
      stay.name.toLowerCase().includes(searchQuery) || stay.Features.toLowerCase().includes(searchQuery);
    return stayPrice <= filters.price && stay.rating >= filters.minRating && matchesSearchQuery;
  });

  const handleStayClick = (stay) => {
    setSelectedStay(stay);
    setModalOpen(true);
    setCurrentImageIndex(0); // Reset the image index for the carousel
    setPersonCount(1); // Reset the person count
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStay(null);
  };

  const handleImageNavigation = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedStay.Images.length
      );
    } else if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + selectedStay.Images.length) %
        selectedStay.Images.length
      );
    }
  };

  const handlePersonChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure at least 1 person
    setPersonCount(value);
  };

  const totalPrice = selectedStay
    ? (selectedStay.price * personCount).toFixed(2)
    : 0;




  return (
    <div className={styles.backgroundcontainer}>
      <div className={styles.contentcontainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <ul>
            <li onClick={() => navigate("/homepage")}>🏠 Home</li>
            <li onClick={() => navigate("/hotel")}>🏨 Hotels</li>
            <li onClick={() => navigate("/flight")}>✈ Travel</li>
            <li onClick={() => navigate("/destinations")}>📍 Attractions</li>
            <li>📜 Plans</li>
          </ul>
          <hr className={styles.lineseparator} />
          <div className={styles.cdfilterswrapper}>
            <h4>Filter By</h4>
            <div className={styles.cd - filters}>
              {/* Price and Rating Filters */}
              <form>
                <div className={styles.cdfiltersblock}>
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
                <div className={styles.cdfiltersblock}>
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

              {/* Toggle Button */}
              <button
                type="button"
                onClick={toggleAdditionalFilters}
                className="togglefiltersbtn"
              >
                {showAdditionalFilters ? "Hide Additional Filters" : "Show Additional Filters"}
              </button>

              {/* Additional Filters */}
              {showAdditionalFilters && (
                <div className={styles.additionalfilters}>
                  <div className={styles.filtercategory}>
                    <h4>Activities</h4>
                    <label>
                      <input type="checkbox" name="swimming" value="swimming" /> Swimming
                    </label>
                    <label>
                      <input type="checkbox" name="diving" value="diving" /> Diving
                    </label>
                    <label>
                      <input type="checkbox" name="fishing" value="fishing" /> Fishing
                    </label>
                    <label>
                      <input type="checkbox" name="water sports" value="water sports" /> Water Sports
                    </label>
                  </div>

                  <div className={styles.filtercategory}>
                    <h4>Distance</h4>
                    <input type="range" min="0" max="50" step="1" />
                    <p>Adjust the distance range (in km)</p>
                  </div>

                  <div className={styles.filtercategory}>
                    <h4>Amenities</h4>
                    <label>
                      <input type="checkbox" name="showers" value="showers" /> Showers
                    </label>
                    <label>
                      <input type="checkbox" name="cafes" value="cafes" /> Cafes
                    </label>
                    <label>
                      <input type="checkbox" name="restaurants" value="restaurants" /> Restaurants
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.maincontent}>
          <div className={styles.leftsection}>
            <input
              type="text"
              className={styles.searchbar}
              placeholder="Search Destination, Hotel, Attraction..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <h3>Popular Stays</h3>
            <div className={styles.stayslist}>
              {filteredStays.length > 0 ? (
                filteredStays.map((stay, index) => (
                  <div
                    className={styles.staycard}
                    key={index}
                    onClick={() => handleStayClick(stay)}
                  >
                    {stay.Images && stay.Images.length > 0 ? (
                      <img
                        src={stay.Images[0]}
                        alt={stay.name}
                        className={styles.stayimage}
                      />
                    ) : (
                      <div className={styles.stayplaceholder}>
                        No Image Available
                      </div>
                    )}
                    <div className={styles.staydetails}>
                      <h4>{stay.name}</h4>
                      <p>{stay.price}</p>
                      <span>⭐ {stay.rating} ({stay.reviews} reviews)</span>
                      <p>{stay.Features}</p>
                      <p>{stay.info}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No matches found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedStay && (
        <div className={styles.modal}>
          <div className={styles.modalcontent}>
          <h1>{selectedStay.name}</h1>
            <button className={styles.closebtn} onClick={closeModal}>
              ×
            </button>
            <div className={styles.imagecarousel}>
              {selectedStay.Images && selectedStay.Images.length > 1 ? (
                <>
                  <button onClick={() => handleImageNavigation("prev")}>
                    ←
                  </button>
                  <img
                    src={selectedStay.Images[currentImageIndex]}
                    alt={selectedStay.name}
                    className={styles.carouselimage}
                  />
                  <button onClick={() => handleImageNavigation("next")}>
                    →
                  </button>
                </>
              ) : (
                <img
                  src={selectedStay.Images?.[0]}
                  alt={selectedStay.name}
                  className={styles.carouselimage}
                />
              )}
            </div>
            <div className={styles.details}>
              <h4>{selectedStay.name}</h4>
              <p>{selectedStay.Features}</p>
              <p>
                <strong>Price:</strong> {selectedStay.price}
              </p>
              <p>{selectedStay.details1}</p>
              <p>{selectedStay.details2}</p>
              <div className={styles.personselector}>
                <label>
                  Number of persons:
                  <input
                    type="number"
                    value={personCount}
                    onChange={handlePersonChange}
                    className={styles.personinput}
                  />
                </label>
              </div>
              <p>
                <strong>Total Price:</strong> ${totalPrice}
              </p>
              <button className={styles.booknowbtn} onClick={() => navigate("/payment")}>Book Now</button>
            </div>
          </div>
        </div>
      
      )}
    </div>
  );};
    export default BeachPage;