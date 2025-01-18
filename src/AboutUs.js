import React from "react";


const AboutUs = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      lineHeight: 1.6,
      padding: "20px",
      color: "#333",
      backgroundColor: "#f9f9f9",
      height: "100vh",
      overflowY: "auto",
     
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    headerTitle: {
      fontSize: "2.5rem",
      marginBottom: "10px",
    },
    appName: {
      fontWeight: "bold",
      color: "#007bff",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      marginBottom: "10px",
    },
    list: {
      listStyleType: "disc",
      marginLeft: "20px",
    },
    listItem: {
      marginBottom: "10px",
    },
    callToAction: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "15px",
      padding: "5px",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle} >About Us</h1>
        <p>
          Welcome to <span style={styles.appName}>GoBeyond</span>, your ultimate travel companion!
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p>
          At <span style={styles.appName}>GoBeyond</span>, we believe that travel is not just about reaching a destination—it’s about the journey, the experiences, and the memories you create along the way. Our mission is to make travel planning seamless, enjoyable, and inspiring for everyone.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Who We Are</h2>
        <p>
          We are a team of passionate travelers, tech enthusiasts, and customer-focused professionals dedicated to bringing you the best tools and resources for your adventures. With a blend of cutting-edge technology and a love for exploration, we’ve created a platform that caters to all your travel needs.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Offer</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Personalized Travel Plans:</strong> Tailored recommendations based on your preferences and interests.
          </li>
          <li style={styles.listItem}>
            <strong>Seamless Bookings:</strong> Easy booking for flights, hotels, and activities—all in one place.
          </li>
          <li style={styles.listItem}>
            <strong>Real-Time Updates:</strong> Stay informed with live updates on itineraries, weather, and travel advisories.
          </li>
          <li style={styles.listItem}>
            <strong>Community Insights:</strong> Connect with a global community of travelers to share tips and stories.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>User-Friendly Experience:</strong> Intuitive design to make planning stress-free.
          </li>
          <li style={styles.listItem}>
            <strong>Comprehensive Services:</strong> From planning to booking to experiencing, we’ve got you covered.
          </li>
          <li style={styles.listItem}>
            <strong>24/7 Support:</strong> Our team is always here to assist you, wherever you are.
          </li>
        </ul>
      </section>

      <section style={styles.callToAction}>
        <h2>Let’s Explore the World Together!</h2>
        <p style={{color: "#fff"}}>
          Whether you’re planning a weekend getaway, a family vacation, or a solo adventure, <span style={styles.appName}>GoBeyond</span> is here to make your travel dreams a reality.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;