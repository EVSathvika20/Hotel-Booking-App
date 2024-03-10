import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HotelList from './components/HotelList';
import BookingList from './components/BookingFormPage';
import BookingHistory from './components/BookingHistory';
import Login from './components/login/loginPage';

function App() {
  return (
    <Router>
      <div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/hotels" element={<HeaderWithContent><HotelList /></HeaderWithContent>} />
            <Route path="/my-bookings" element={<HeaderWithContent><BookingHistory /></HeaderWithContent>} />
            <Route path="/bookings" element={<HeaderWithContent><BookingList /></HeaderWithContent>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function HeaderWithContent({ children }) {
  return (
    <>
      <Header />
      <div className="content">
        {children}
      </div>
    </>
  );
}

export default App;
