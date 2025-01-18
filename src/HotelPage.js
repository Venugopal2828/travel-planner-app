import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Importing the custom hook

const HotelPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);

  const { cart, addToCart } = useCart(); // Ensure addToCart is coming from the context

  const carouselImages = [
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg',
    'https://www.ohotelsindia.com/goa/images/bccadd6018a0421487734769d7014e73.jpg',
    'https://www.palaceresorts.com/moon_palace_punta_cana_palace_resorts_8e6872ed24.webp',
  ];

  const statesInIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setHotels([
      {
        name: 'Luxury Hotel',
        location: city,
        price: '₹5000',
        image: 'https://www.palaceresorts.com/moon_palace_punta_cana_palace_resorts_8e6872ed24.webp',
      },
      {
        name: 'Seaside Resort',
        location: city,
        price: '₹6000',
        image: 'https://images.squarespace-cdn.com/content/v1/62dfa656a2986f7b76f75c92/1658824441045-RYTWQQGICIUX6WN1TCXZ/Carib+Dev.jpg',
      },
      {
        name: 'Mountain Retreat',
        location: city,
        price: '₹7000',
        image: 'https://media.istockphoto.com/id/641448082/photo/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-sunshine.jpg?s=612x612&w=0&k=20&c=9PyitcP743oS7oGAoSW8iGDjf1goapy40Ol7PcCNv24=',
      },
      {
        name: 'wonder Resort',
        location: city,
        price: '₹6000',
        image: 'https://images.squarespace-cdn.com/content/v1/62dfa656a2986f7b76f75c92/1658824441045-RYTWQQGICIUX6WN1TCXZ/Carib+Dev.jpg',
      },
      {
        name: 'dayum hotels',
        location: city,
        price: '₹7000',
        image: 'https://media.istockphoto.com/id/641448082/photo/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-sunshine.jpg?s=612x612&w=0&k=20&c=9PyitcP743oS7oGAoSW8iGDjf1goapy40Ol7PcCNv24=',
      },
    ]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ overflow: 'hidden', position: 'relative', height: '350px' }}>
        <div
          className="carousel-container"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${carouselImages.length * 100}%`,
          }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} style={{ flex: '1 0 100%' }}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Search Form */}
      <div className="search-form" style={{ padding: '20px', textAlign: 'center' }}>
        <form onSubmit={handleSearch}>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ padding: '10px', marginRight: '10px' }}
          >
            <option value="">Select City</option>
            {statesInIndia.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={{ padding: '10px', marginRight: '10px' }}
          />

          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            style={{ padding: '10px', marginRight: '10px' }}
          />

          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            style={{ padding: '10px', marginRight: '10px' }}
            placeholder="Guests"
          />

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#f4811e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Search Hotels
          </button>
        </form>
      </div>

      {/* Hotel Cards Section */}
      <div
        className="hotel-cards-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '20px',
          overflowY: 'auto',
          height: 'calc(100vh - 350px - 20px - 20px - 30px)',
          marginBottom: '20px',
        }}
      >
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="hotel-card"
            style={{
              margin: '16px',
              textAlign: 'center',
              width: '300px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h3 className="hotel-name" style={{ marginTop: '10px' }}>
              {hotel.name}
            </h3>
            <p className="hotel-location">{hotel.location}</p>
            <p className="hotel-price">{hotel.price}</p>
            <button
              className="cart-button"
              style={{
                padding: '10px 20px',
                backgroundColor: '#f4811e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => addToCart(hotel)} // Make sure addToCart is accessible
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Display Cart Count */}
      <div
        className="cart-count"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#f4811e',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50%',
         
        }}
      >
        Cart: {cart.length}
      </div>
    </div>
  );
};

export default HotelPage;