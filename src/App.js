import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import NaturePage from './NaturePage';
import BeachPage from './BeachPage';
import HotelPage from './HotelPage';
import DestinationsPage from './DestinationPage';
//import ItineraryPage from './ItineraryPage';


const App = () => {
  return (
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
        {/* <Route path="/itinerary" element={<ItineraryPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
