// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/hotels">Hotel Booking App</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">Hotels</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-bookings">My Bookings</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  function handleLogout() {
    console.log("Logout clicked");
    localStorage.removeItem("user_id");
    return navigate("/");
    
  }
}

export default Header;
