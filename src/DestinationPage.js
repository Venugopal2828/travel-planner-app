import React, { useState,useEffect } from "react";
import "./DestinationPage.css";
import dubai from "./Images/Dubai.avif";
import santorini from "./Images/santorini.avif";
import bali from "./Images/bali.avif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const DestinationPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState({}); // Track selected events
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const stripePromise = loadStripe("pk_test_51QXeFTFDMIdA4FuzzsO4Jmq7VpE2mqwCoPpMamfMS8beedzDkTLm66Mka5RNBtBkQcWxK3eV5kAE5IhVbibgqdT500SomfnAXX");

  useEffect(() => {
    // Get the username from local storage
    const username = localStorage.getItem('username');
    console.log('Stored Username:', username);
    if (username) {
      const user = username.split('@')[0];
      const capitalizedUsername = user.charAt(0).toUpperCase() + user.slice(1);
      setUsername(capitalizedUsername); // Set it in the state
    }
  }, []);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      // Call backend to create a checkout session
      const response = await fetch("http://localhost:8083/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const session = await response.json();
      console.log("Session response:", session);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe error:", result.error.message);
      } else {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  

  const destinations = [
    { name: "Dubai", location: "UAE", rating: 4.8, image: dubai },
    { name: "Santorini", location: "Greece", rating: 4.7, image: santorini },
    { name: "Bali", location: "Indonesia", rating: 4.5, image: bali },
  ];

  const bestDestinations = [
    {
      name: "Hyderabad",
      location: "India",
      events: [
        { name: "Golconda Fort", price: 0, image: "https://images.unsplash.com/photo-1621909321963-2276c9660298?q=80&w=1834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Charminar", price: 0, image: "https://media.istockphoto.com/id/467851707/photo/hyderabad-india.jpg?b=1&s=612x612&w=0&k=20&c=2tTtw9xYm4taxWILDCJt4qCiXdtmb0SGNDqempPHsp0=" },
        { name: "WonderLa", price: 1300, image: "https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/wonderla-hyderabad/Sky_Wheel_k9epdj" },
        { name: "DSP Concert", price: 2500, image: "https://media.hitex.co.in/gallery/2023/lucky-ali-concert-2023/whatsapp-image-42023-03-17-at-182935_0317133464146c7872286.jpg" },
      ],
    },
    {
      name: "Banglore",
      location: "India",
      events: [
        { name: "Lalbagh ", price: 25, image: "https://lh3.googleusercontent.com/p/AF1QipPIRZTX1cUpsctw9N-I6WKLJxrjTza4D1v5HE_u=s294-w294-h220-k-no" },
        { name: "Bengaluru Palace", price: 0, image: "https://lh3.googleusercontent.com/p/AF1QipNHvBtoADn3vXrixppCjv6seso2g07iqNJ-sbWS=s294-w294-h220-k-no" },
        { name: "WonderLa", price: 1400, image: "https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/wonderla-hyderabad/Sky_Wheel_k9epdj" },
        { name: "REHMAN Concert", price: 3500, image: "https://media.hitex.co.in/gallery/2023/lucky-ali-concert-2023/whatsapp-image-42023-03-17-at-182935_0317133464146c7872286.jpg" },
      ],
    },
    {
      name: "Mumbai",
      location: "India",
      events: [
        { name: "Gateway Of India Mumbai", price: 0, image: "https://lh3.googleusercontent.com/p/AF1QipPp5u5YSR-MrNM09Bl5MGs3GDcK-1p-7PAA-inf=s294-w294-h220-k-no" },
        { name: "Vastu Sangrahalaya", price: 700, image: "https://lh3.googleusercontent.com/proxy/-7-a6zwmyqdBdYwmq4pQDTKsidaC91uQsi1Sdu9gjN4Y7Q-JnLau-03iMMvWjHbHyI625Xfh2y7ozT-Rf8jRon9rjj3OyqXy9Dg55keYM_UYAI6wJkCLLQG5F1RbH-yOk7q0RuL_nmWsAWpxMpu0jgh2rHhdTgk=s294-w294-h220-k-no" },
        { name: "Dadasaheb Phalke Chitranagari", price: 3300, image: "https://lh3.googleusercontent.com/p/AF1QipMLbbYUODETLCGF6cQD5xRF5_Wacx7E6gOok_yB=s294-w294-h220-k-no" },
        { name: "Ed Sheeran +-=÷x 2025 India Tour", price: 5600, image: "https://media.hitex.co.in/gallery/2023/lucky-ali-concert-2023/whatsapp-image-42023-03-17-at-182935_0317133464146c7872286.jpg" },
      ],
    },
    {
      name: "Ooty",
      location: "India",
      events: [
        { name: "Doddabetta Peak", price: 0, image: "https://lh3.googleusercontent.com/p/AF1QipOqnrRBQEKZnaJvaZcwa57jovg_uG3skRDXEbC8=s1360-w1360-h1020-rw" },
        { name: "Pykara Waterfalls", price: 30, image: "https://lh3.googleusercontent.com/p/AF1QipMOczc7xjPhc7jX9rJdMuMrE5CiBUEA_fmEDKCS=s294-w294-h220-k-no" },
        { name: " Tiger Reserve", price: 2500, image: "https://lh3.googleusercontent.com/p/AF1QipOq-0B0vGrz0W4P9u01s_jXyr3tHl2o8mQX08qO=s294-w294-h220-k-no" },
        { name: "Thunder World", price: 500, image: "https://lh3.googleusercontent.com/p/AF1QipMCE5ZoBncBNuiFg8z9uWa_c0MJt9axevx1EIO2=s294-w294-h220-k-no" },
      ],
    },
    {
      name: "Dubai",
      location: "UAE",
      events: [
        { name: "Bhurj Khalifa", price: 4450, image: "https://lh3.googleusercontent.com/p/AF1QipMazuVsL0HX51aw0NeR8L6Oq7zWkDSnpa4Fpb53=s294-w294-h220-k-no" },
        { name: "Aquarium & Underwater Zoo", price: 4000, image: "https://lh3.googleusercontent.com/p/AF1QipMQOa43INhBV-JoehNSkR68UtJMlmfN8JfF-2_j=s294-w294-h220-k-no" },
        { name: "Museum of the Future", price: 3500, image: "https://lh3.googleusercontent.com/p/AF1QipMO17D2D6vhNZOCjZwgydQYxdNHDxSA69bCsGWt=s294-w294-h220-k-no" },
        { name: "Jumeirah Mosque", price: 500, image: "https://lh3.googleusercontent.com/p/AF1QipONflc0eyffKizm5NdxqaSzbAoyHpW6cXoxffpI=s294-w294-h220-k-no" },
      ],
    },
    {
      name: "Santorini",
      location: "Greece",
      events: [
        { name: "Ancient Thera", price: 550, image: "https://lh3.googleusercontent.com/p/AF1QipONaJSwYHUqNocMRKFyUM6fpEY8WyvGYC07qM86=s294-w294-h220-k-no" },
        { name: "Red Beach", price: 100, image: "https://lh3.googleusercontent.com/p/AF1QipPYslcUzG0KJYTVvsEjbqawOMnmoIws2w7R026U=s294-w294-h220-k-no" },
        { name: "Three Bells of Fira", price: 250, image: "https://lh3.googleusercontent.com/proxy/-PbyOp0wSbKrFGV47DKj5c3T7oluxpxbQ_ioxyPuatm4HbwWruNuUXkYDcIkVtxvXpSBU5j3cbodk2HicJpEEN_bvHtZ5j6vPzmJ41nZAgcfcvSn1qku4kboStiuBj3AdKu5haiTp7OcpuamH_RpMTm_ARActNs=s294-w294-h220-k-no" },
        { name: "Atlantis Museum", price: 1400, image: "https://lh3.googleusercontent.com/p/AF1QipN_s8uhqo4aEZsY5lkpMJAfD7u-K5QF2o_akf_W=s294-w294-h220-k-no" },
      ],
    },
    {
      name: "Bali",
      location: "Indonesia",
      events: [
        { name: "Ulun Danu Beratan Temple", price: 50, image: "https://lh3.googleusercontent.com/proxy/sSEkslQ7HosS9G1mipnyM06oObOMQ3F75DR6wsWQ26m_YP6dHDiehwZy0cFg0RzK0rph-BCDxQBC0UqXB475PIWdGYYUVAaz6hG2mi9Z6IEcQ6lsuFfBQUPzGtKx5Ap1vBBAJemPllWY4JJ9L8yZeKsTFaG7SA=s294-w294-h220-k-no" },
        { name: "Sacred Monkey Forest Sanctuary", price: 550, image: "https://lh3.googleusercontent.com/p/AF1QipPL82X1zxPguSgfGNSjqmgrNs0PZTHNBfg_9bep=s294-w294-h220-k-no" },
        { name: "Ceking Rice Terrace", price: 0, image: "https://lh3.googleusercontent.com/p/AF1QipMI2ZIJLjw1pHZTB5bvdwNvcnUWn-WbbMblfJFz=s294-w294-h220-k-no" },
        { name: "Bali Safari & Marine Park", price: 3800, image: "https://lh3.googleusercontent.com/p/AF1QipPJZ6oQbZKn0IK6UiYt8kMfcWpv6UnrYWI_Fdc=s294-w294-h220-k-no" },
      ],
    },
    {
      name: "Paris",
      location: "France",
      events: [
        { name: "Eiffel Tower", price: 1300, image: "https://lh3.googleusercontent.com/p/AF1QipMFvt9DUkfvGQkhDUTQK5mUFTKAGwTzp3RqSpAG=s294-w294-h220-k-no" },
        { name: "Louvre Museum", price: 2000, image: "https://lh3.googleusercontent.com/p/AF1QipOpwvxDZaczyfFGYk1_tQRYnfS3WxUYEp8XTwju=s294-w294-h220-k-no" },
        { name: "Palais Garnier", price: 1540, image: "https://lh3.googleusercontent.com/p/AF1QipOB_dBm_5jKqfStPXn1eifoxTwDvyxb5JnvyAWp=s294-w294-h220-k-no" },
        { name: "Arc de Triomphe", price: 1700, image: "https://lh3.googleusercontent.com/proxy/yDz8CQdvZLGcxYqZrGDAtyfWEbF0iNq-MGs-l4fNj7XpMOKKX0PsKis5j_yUn3g1a_N1WdBntNeoH4ibCXvIV07HDWT3EpBmQy85YCYEhbCsxYPjzXK4xKVMOG2uXTC1Wv5ZRgL-y1ASyUKM0bIW55PHFwfVyw=s294-w294-h220-k-no" },
      ],
    },
    {
      name: "Madrid",
      location: "Spain",
      events: [
        { name: "Royal Palace", price: 1410, image: "https://lh3.googleusercontent.com/p/AF1QipPp7gG6UeQm7kyfY5d_KCZbDZnKjsFGMTpUH8YQ=s294-w294-h220-k-no" },
        { name: "Plaza Mayor ", price: 80, image: "https://lh3.googleusercontent.com/proxy/9TiSmm94HaMcXM70qFirE8aJbtDIs1P-K61Mj-nGwrKqp7hlJyqe2HtkmvK7vx4w6MgYpUr8a2JG75AjKhdlmG3V3SzgACH6ZiNnP7ldTk30E0fMHSZgrHFFogSleHwL-RS2tOX3XGRCZ2jHNmgETo8M_8d4Dm4=s294-w294-h220-k-no" },
        { name: "El Retiro Park", price: 0, image: "https://lh3.googleusercontent.com/proxy/JHxHa4FmgaeYusvBHkyo3DmGEXUFzzXGUxO08D7D9m-XY4nZBj2sywD-2n2697WbhROi3qFCySVnPeCN-lqHxiiRqOVPOy1CHuYSkl5wZqgCbi0MKTLaLpH4aRAAhutECDLZawUpKrXYg4zoHhWCRqwFE0uN3Q=s294-w294-h220-k-no" },
        { name: "Temple of Debod", price: 300, image: "https://lh3.googleusercontent.com/p/AF1QipMMMEXGW1K4MBxmZ71T2nbLI3rnKHiC6RtXs-_o=s294-w294-h220-k-no" },
      ],
    },
  ];

  const schedule = [
    { location: "Bangkok", dates: "12 Oct - 28 Oct", attendees: 2 },
    { location: "India", dates: "12 Oct - 28 Oct", attendees: 4 },
    { location: "Mexico", dates: "12 Oct - 28 Oct", attendees: 7 },
  ];

  // Open Modal
  const openModal = (destination) => {
    setSelectedDestination(destination);
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDestination(null);
    setSelectedEvents({});
  };

  // Handle event selection and update quantity
  const handleEventSelection = (eventName, price, quantity) => {
    setSelectedEvents((prevSelectedEvents) => {
      const updatedEvents = { ...prevSelectedEvents };

      if (quantity > 0) {
        updatedEvents[eventName] = { price, quantity };
      } else {
        delete updatedEvents[eventName]; // Remove event if quantity is 0
      }

      return updatedEvents;
    });
  };
  

  // Calculate total price
  const totalPrice = Object.values(selectedEvents).reduce(
    (total, event) => total + event.price * event.quantity,
    0
  );

  return (
    <div className="destination">
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="logo">
            Go<span className="dot">Beyond</span>
          </h2>
          <ul className="menu">
            <li className="active" onClick={() => navigate("/homepage")}>Home</li>
            <li className="active" onClick={() => navigate("/bookings")}>My Tickets</li>
            <li className="active" onClick={() => navigate("/cart")}>Favourites</li>
          </ul>
          <div className="promotion">
            <img
              src="https://plus.unsplash.com/premium_photo-1679758629450-30d2263efca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBsYW5lfGVufDB8MXwwfHx8MA%3D%3D"
              alt="Promotion"
              height={"150px"}
              width={"129px"}
              onClick={() => navigate("/flight")}
            />
            <p>50% off!</p>
            <p>Flight Bookings</p>
            
          </div>
          <button className="logout" onClick={() => navigate("/signin")}>Logout</button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="header">
            <h1>Hello, {username ? username : 'Guest'}👋</h1>
            <p>Welcome back! Are you ready to explore the world?</p>
            <input
              type="text"
              placeholder="Search Destination"
              className="search-bar"
            />
          </header>

          {/* Destinations */}
          <section className="destinations">
            <h2>Best Destinations</h2>
            <div className="destination-cards">
              {destinations.map((dest, index) => (
                <div className="destination-card" key={index}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="destination-image"
                  />
                  <div className="destination-info">
                    <h3>{dest.name}</h3>
                    <p>{dest.location}</p>
                    <p>⭐ {dest.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best Destinations */}
          <section className="best-destinations">
            <h2>50 Destinations Found</h2>
            <div className="best-list" >
              {bestDestinations.map((destination, index) => (
                <div
                  className="best-item"
                  key={index}
                  onClick={() => openModal(destination)}
                >
                  <h3 style={{cursor: "pointer"}}>{destination.name}</h3>
                  <p>{destination.location}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Modal */}
          {modalOpen && selectedDestination && (
            <div className="modal">
              <div className="modalcontent">
                <button className="closebtn" onClick={closeModal}>
                  ×
                </button>
                <h2>Select Events </h2>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="datepicker"
                />

                <div className="event-tiles">
                  {selectedDestination.events.map((event) => (
                    <div key={event.name} className="event-tile">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="event-image"
                      />
                      <h3>{event.name}</h3>
                      <p>Price: ₹{event.price}</p>
                      <label className="people">
                        Number of Persons:
                        <input
                          type="number"
                          min="0"
                          value={
                            selectedEvents[event.name]?.quantity || 0
                          }
                          onChange={(e) =>
                            handleEventSelection(
                              event.name,
                              event.price,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="total-price">
                  <h3>Total Price: ₹{totalPrice}</h3>
                </div>

                <button
                  className="booknowbtn"
                  onClick={handlePayment}
                  disabled={totalPrice === 0}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <section className="my-schedule">
            <h2>My Schedule</h2>
            {schedule.map((item, index) => (
              <div className="schedule-item" key={index}>
                <h3>{item.location}</h3>
                <p>{item.dates}</p>
                <p>{item.attendees} attendees</p>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default DestinationPage;