import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "./CartContext";


const stripePromise = loadStripe("pk_test_51QXeFTFDMIdA4FuzzsO4Jmq7VpE2mqwCoPpMamfMS8beedzDkTLm66Mka5RNBtBkQcWxK3eV5kAE5IhVbibgqdT500SomfnAXX");
const getUserIdFromLocalStorage = () => {
    const user = localStorage.getItem("userId");
    if (user) {
        return JSON.parse(user).userId; // Replace 'userId' with actual key in your stored object
    }
    return null;
};

const userId = getUserIdFromLocalStorage();
const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => {
        const itemPrice = typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^\d.-]/g, ""))
            : parseFloat(item.price);

        return total + itemPrice;
    }, 0);

 

    const handleRemoveFromCart = (index) => {
        removeFromCart(index); // Call removeFromCart from context
    };

    const handleBooking = async (trip, transportType) => {
        const userId = localStorage.getItem("userId");
        console.log("User ID:", userId);  // Check if userId exists
        console.log("Trip:", trip.name);
        const transport =  trip.name;
        console.log("Transport Type:", trip);

        if (!userId) {
            console.error("User ID is not found. Ensure the user is logged in.");
            return;
        }
        // const userId = 1; // Replace with actual user ID from authentication context or state
        const payload = {
            fromCity: trip.from , // Assuming `fromCity` is mapped to `destination`
            toCity: trip.to || "Destination City", // Replace with the correct data if available
            tripType: trip.tripType || "one-way", // Replace if `tripType` is dynamically determined
            departureDate: trip.departureDate, // Assuming `startDate` is `departureDate`
            returnDate: trip.returnDate || null, // Assuming `endDate` is `returnDate`
            numberOfPersons: trip.numberOfPersons || 1, // Default to 1 person if not specified
            [`${transport}Name`]: trip[`${transport}Name`] || `${transport}line`, // Dynamic key for transport name
            price: trip.price || 0, // Assuming `price` is available in the trip object
            paymentStatus: "pending",
             // Set default status as `pending`
        };
        //console.log("Payload:", payload);
    
        try {
            const response = await fetch(`http://localhost:8083/api/bookings/${transport}?userId=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Booking successful:", result);
            } else {
                console.error("Failed to book. Status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred while booking:", error);
        }
    };
    

    // const handleBooking = async (bookingDetails) => {
    //     const userId = localStorage.getItem("userId"); // Retrieve user ID from storage (adjust based on your login implementation)
    //     const response = await fetch(`http://localhost:8083/api/bookings/${bookingDetails.type}?userId=${userId}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ ...bookingDetails, userId }),
    //     });
    
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log("Booking successful:", data);
    //     } else {
    //         console.error("Error booking:", response.status);
    //     }
    // };
    

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
        console.log("Raw response: ",response);
        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error("Stripe error:", result.error.message);
        } else {
            await saveCartDetails(cart, userId); // Send cart items to backend with user ID (change as needed)
                alert("Payment successful! Cart details saved.");
            }
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };
    const saveCartDetails = async (cart, userId) => {
        try {
            const response = await fetch("http://localhost:8083/api/payment/save-cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId, // Replace with actual user ID
                    cartItems: cart,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to save cart details");
            }
            console.log("Cart details saved successfully!");
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };


    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: '20px', // Add gap between cards
            flexDirection: 'row',
            overflowY: 'auto',
            height: '90vh',
            overflowX: 'hidden'
            // justifyContent: 'space-between',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            width: '250px',
            margin: '10px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: '#fff',
            minHeight: '300px',
            maxWidth: '100%'
        },
        cardImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        },
        cardContent: {
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '220px',
        },
        cardTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
        },
        cardDescription: {
            fontSize: '14px',
            color: '#777',
            marginBottom: '12px',
        },
        price: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#28a745',
        },
        removeButton: {
            background: '#dc3545',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        removeButtonHover: {
            background: '#c82333',
        },
        summary: {
            marginTop: 'auto', // This ensures the summary sticks to the bottom
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            borderTop: '2px solid #ddd',
            width: '100%',
            boxSizing: 'border-box',
        },
        payButton: {
            marginTop: '20px',
            background: '#28a745',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.3s ease',
        },
        payButtonHover: {
            background: '#218838',
        }
    };

    return (
        <div style={styles.container}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {cart.map((item, index) => (
                        <div key={index} style={styles.card}>
                            <img src={item.image} alt={item.name} style={styles.cardImage} />
                            <div style={styles.cardContent}>
                                <h3 style={styles.cardTitle}>{item.name}</h3>
                                <p style={styles.cardDescription}>{item.location}</p>
                                <p style={styles.cardDescription}>{item.from}-{item.to}</p>
                                
                                <h3 style={styles.cardTitle}>{item.type}</h3>

                                <p style={styles.cardDescription}>{item.description}</p>

                                <p style={styles.price}>{item.price}</p>
                                <button
                                    style={styles.removeButton}
                                    onClick={() => handleRemoveFromCart(index)}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.removeButtonHover.background}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.removeButton.background}
                                >
                                    Remove
                                </button>
                                <button
                        style={{ ...styles.payButton, backgroundColor: '#007bff', marginTop: '10px' }}
                        onClick={() =>{
                            console.log("Button clicked");
                            console.log("Item type:", item.name); 
                            handleBooking(item,item.type)}}
                    >
                        Confirm Booking
                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div style={styles.summary}>
                    <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                    <button
                        style={styles.payButton}
                        onClick={handlePayment}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.payButtonHover.background}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.payButton.background}
                    >
                        Pay Now
                    </button>
                    
                </div>
            )}
        </div>
    );
};

export default CartPage;