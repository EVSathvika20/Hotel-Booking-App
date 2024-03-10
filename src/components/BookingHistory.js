import React, { useState, useEffect } from 'react';
import api from '../services/api';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  let auth = localStorage.getItem("user_id"); 

  useEffect(() => {
    async function fetchBookingHistory() {
      try {
        const response = await api.get(`/api/booking/getBookingByUser?user_id=${auth}`);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching booking history:', error.response.data.error);
      }
    }
    fetchBookingHistory();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <div className="row">
      <div className="col-md-12">
          {bookings.length === 0 && <h4 className="text-danger mt-4">No bookings available...</h4>}
        </div>
      {bookings?.map(booking => (
        <div key={booking.booking_id} className="card col-md-6 mb-5">
          <div className="card-body">
            
            {booking.hotels.map(hotel => (
              <div key={hotel.hotel_id}>
                <p className="card-text">Hotel Name: {hotel.name}</p>
                <p className="card-text">Address: {hotel.address}</p>
                <p className="card-text">City: {hotel.city}</p>
              </div>
            ))}
            {booking.status === "Booked" ? (
              <button className="btn btn-danger" disabled>Booked</button>
            ) : (
              <button className="btn btn-primary" >Book Now</button>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default BookingHistory;
