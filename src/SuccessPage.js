// Success page that is triggered after successful payment
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SuccessPage = () => {
//   useEffect(() => {
//     // After redirect from Stripe, save cart details
//     const saveCartDetails = async () => {
//       const cart = JSON.parse(localStorage.getItem("cart"));
//       const userId = localStorage.getItem("userId") // Replace with actual user ID
//       try {
//         const response = await fetch("http://localhost:8083/api/payment/save-cart", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userId, // Replace with actual user ID
//             cartItems: cart,
//           }),
//         });
//         if (response.ok) {
//           alert("Cart details saved successfully!");
//         } else {
//           alert("Failed to save cart details.");
//         }
//       } catch (error) {
//         console.error("Error saving cart details:", error);
//       }
//     };

//     // Call saveCartDetails when the success page loads
//     saveCartDetails();
//   }, []);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/homepage"); // Redirect to the home page or any other page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Successful</h1>
      <p style={styles.message}>
        Thank you for your payment! Your transaction has been successfully processed.
      </p>
      <button style={styles.button} onClick={handleGoBack}>
        Go to Home
      </button>
      <button style={styles.logout} onClick={() => navigate("/signin")}>Log out</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    color: "#28a745",
    fontSize: "2rem",
  },
  message: {
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logout : {
    backgroundcolor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderradius: "5px",
  }
};

export default SuccessPage;