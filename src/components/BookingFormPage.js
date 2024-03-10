import React, { useState } from 'react';
import api from '../services/api';

function BookingForm() {
  const [date, setDate] = useState('');
  const [hotelId, setHotelId] = useState('');

  const handleBooking = async () => {
    try {
      await api.post('/bookings', { date, hotelId });
      console.log('Hotel booked successfully!');
    } catch (error) {
      console.error('Booking failed:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Book a Hotel</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Hotel ID" value={hotelId} onChange={(e) => setHotelId(e.target.value)} />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
}

export default BookingForm;
