import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Bookings = () => {
  const [trips, setTrips] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(`http://localhost:8083/api/bookings/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched trips:", data); // Debug response here
          const parseDate = (dateStr) => {
            if (!dateStr) return null;
            const [day, month, year] = dateStr.split("/").map(Number);
            return new Date(year, month - 1, day);
          };

          const processedTrips = (data || []).map((trip) => ({
            ...trip,
            departureDate: parseDate(trip.departureDate),
            returnDate: trip.returnDate ? parseDate(trip.returnDate) : null,
          }));

          console.log("Processed Trips:", processedTrips);
          setTrips(processedTrips);
        } else {
          console.error("Failed to fetch trips. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (date) => {
    if (!date) return "NA"; // Return "NA" if no date is available
    return date.toLocaleDateString(); // Format the date as a string
  };
  

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    itinerary: {
      flex: 1,
      padding: "20px",
      marginRight: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflowY: "auto",
      height: "98vh",
    },
    itineraryItem: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
    },
    calendarContainer: {
      width: "300px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    tripTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    tripDetails: {
      fontSize: "14px",
      marginBottom: "8px",
    },
    tripColor: (color) => ({
      height: "10px",
      width: "100%",
      borderRadius: "5px",
      backgroundColor: color,
      marginBottom: "10px",
    }),
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    button: {
      padding: "8px 12px",
      fontSize: "14px",
      color: "white",
      backgroundColor: "#0073e6",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonSecondary: {
      backgroundColor: "#28a745",
    },
    highlightedDate: {
      backgroundColor: "blue",
      color: "white",
      borderRadius: "50%",
      padding: "5px",
      display: "inline-block",
    },
  };

  const highlightDates = useMemo(() => {
    const getDateRange = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        dates.push(new Date(currentDate)); // Push a copy of the current date
        currentDate.setDate(currentDate.getDate() + 1); // Increment the day
      }

      return dates;
    };

    return trips.flatMap((trip) => {
      if (trip.departureDate && trip.returnDate) {
        return getDateRange(trip.departureDate, trip.returnDate);
      } else if (trip.departureDate) {
        return [new Date(trip.departureDate)];
      }
      return [];
    });
  }, [trips]);

  console.log("HighlightDates:", highlightDates.map(d => d.toDateString()));

  const tileClassName = ({ date }) => {
    console.log("Tile Date:", date.toDateString());
    // const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // const normalizedDate = normalizeDate(date);
    const highlighted = highlightDates.some(
      (highlightDate) => highlightDate.toDateString() === date.toDateString()
    );
  
    console.log("Is Highlighted:", highlighted);
  
    return highlighted ? "highlightedDate" : null;

    // return highlightDates.some(
    //   (highlightDate) => {
    //     console.log("Comparing:", highlightDate.toDateString(), "with", date.toDateString());
    //     return highlightDate.toDateString() === date.toDateString()// Ensure exact comparison using getTime
    //   }
    // ) ? "highlightedDate" : null;
  };

  return (
    <div style={styles.container}>
      {/* Itinerary Section */}
      <div style={styles.itinerary}>
        <h2>Your Itinerary</h2>
        {trips.map((trip, index) => (
          <div key={index} style={styles.itineraryItem}>
            <div style={styles.tripColor(trip.color || "red" || "red" )}></div>
            <div style={styles.tripTitle}>
              {trip.fromCity} - {trip.toCity || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>Dates:</strong> {formatDate(trip.departureDate) || "NA"} - {formatDate(trip.returnDate) || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>Transport:</strong> {trip.bookingType || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>No.of Persons:</strong> {trip.numberOfPersons || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>Ticket Details:</strong> {trip.name || "NA"}-{trip.id || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>Hotel:</strong> {trip.hotel || "NA"}
            </div>
            <div style={styles.tripDetails}>
              <strong>Room Details:</strong> {trip.roomDetails || "NA"}
            </div>
            <div style={styles.buttonsContainer}>
              <button style={styles.button}>Download</button>
              <button style={{ ...styles.button, ...styles.buttonSecondary }}>Share</button>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <div style={styles.calendarContainer}>
        <h2>Monthly Calendar</h2>
        <Calendar
          value={date}
          onChange={setDate}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
};

export default Bookings;
