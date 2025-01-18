import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import NaturePage from './NaturePage';
import BeachPage from './BeachPage';
import HotelPage from './HotelPage';
import DestinationsPage from './DestinationPage';
import LoginTable from './LoginTable';
import FlightSearch from './FlightSearch';
import PaymentForm from './PaymentForm';
import CartPage from "./CartPage";
import { CartProvider } from './CartContext';
import Bookings from './Bookings';
import AboutUs from './AboutUs';
import SuccessPage from './SuccessPage';


// Initialize Stripe with your publishable API key
const stripePromise = loadStripe('pk_test_51Qb0FsJljp2L5dTETvhBkkeyIwyValwc6wO0vefa2B55w1i0LTqKR9d33A2SysG3FpuVlEz9KUdC4FrQPKuEYtW200Yi6XwKsB');

const App = () => {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/beach" element={<BeachPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/login" element={<LoginTable />} />
        <Route path="/flight" element={<FlightSearch />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        />
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;
