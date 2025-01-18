import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const [amount, setAmount] = useState(1000); // Amount to be charged in smallest unit (e.g., 1000 = 10 USD)
  const [currency, setCurrency] = useState('usd');
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState(''); // For displaying messages
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Fetch client secret from the backend
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/payments/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, currency }),
        });

        if (response.ok) {
          const data = await response.json();
          setClientSecret(data.clientSecret);
          setMessage('Payment details loaded successfully.');
        } else {
          const errorData = await response.text();
          setMessage(`Error: ${errorData}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchClientSecret();
  }, [amount, currency]);

  // Handle form submission and payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage('Stripe is not properly initialized or client secret is missing.');
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    message: {
      textAlign: 'center',
      marginBottom: '15px',
      color: '#d9534f', // Error color
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    cardElement: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Form</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="amount" style={styles.label}>
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="currency" style={styles.label}>
            Currency:
          </label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Card details:</label>
          <CardElement style={styles.cardElement} />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={
            loading || !stripe
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
        >
          {loading ? 'Processing…' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
