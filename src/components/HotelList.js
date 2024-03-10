import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/api';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

function HotelList() {
  let auth = localStorage.getItem("user_id"); 
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [hotels, setHotels] = useState([]);
  const [bookingDetails,setBookingDetails] = useState({
    check_in_date: "",
    check_out_date: "",
    num_guests: 1,
    total_amount: 0,
    hotel_id: "", // Default value is empty string
  });
  console.log("bookingDetails",bookingDetails);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, [formData.check_in_date, formData.check_out_date]);

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
    // Set the selected hotel in the formData
    setFormData(prevState => ({
      ...prevState,
      hotel_id: hotel.hotel_id
    }));
    // Set the selected hotel in the bookingDetails
    setBookingDetails(prevState => ({
      ...prevState,
      hotel_id: hotel.hotel_id
    }));
  };

  const handleSubmit = async () => {
   
    fetchHotels();
    setShowModal(false);

    const loginrequestdata = {
      ...bookingDetails,
      user_id: auth
    };
    console.log("loginrequestdata",loginrequestdata);
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    try {
      const response = await axiosInstance.post("/api/booking/createbooking", loginrequestdata, config);
      console.log("response.status", response.status);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Hotel Booked successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });  
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Sorry for the inconvenience Hotel is not Booked. Please Contact Admin',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.log("Error from API", error);
      setFormErrors("Invalid Credentials");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchHotels = async () => {
    try {
      let params = {};
      if (formData.check_in_date && formData.check_out_date) {
        params = {
          check_in_date: formData.check_in_date,
          check_out_date: formData.check_out_date
        };
      }
      const response = await axiosInstance.get("/api/hotel/gethotels", { params });
      setHotels(response?.data?.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <div>
      <h2>Available Hotels</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label htmlFor="check_in_date">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="check_in_date"
              name="check_in_date"
              value={formData.check_in_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label htmlFor="check_out_date">End Date</label>
            <input
              type="date"
              className="form-control"
              id="check_out_date"
              name="check_out_date"
              value={formData.check_out_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <button className="btn btn-primary mt-4" onClick={fetchHotels}>Search</button>
          </div>
        </div>
      </div>

      <div className="row">
        {hotels?.map(hotel => (
          hotel.status === "Available" && (
            <div key={hotel.hotel_id} className="card col-md-6 mb-5">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">Address: {hotel.address}</p>
                <p className="card-text">City: {hotel.city}</p>
                <button className="btn btn-primary" onClick={() => handleBookNow(hotel)}>Book Now</button>
              </div>
            </div>
          )
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Hotel - {selectedHotel && selectedHotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="hotel_id">Select Hotel</label>
              <select
                className="form-control"
                id="hotel_id"
                name="hotel_id"
                value={bookingDetails.hotel_id}
                onChange={(e)=> setBookingDetails({...bookingDetails,hotel_id: e.target.value})}
                required
              >
                {selectedHotel && (
                  <option value={selectedHotel.hotel_id} selected>{selectedHotel.name}</option>
                )}
                {hotels.map(hotel => (
                  hotel.status === "Available" && (
                    <option key={hotel.hotel_id} value={hotel.hotel_id}>
                      {hotel.name}
                    </option>
                  )
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="check_in_date">Check-in Date</label>
              <input
                type="date"
                className="form-control"
                id="check_in_date"
                name="check_in_date"
                value={bookingDetails.check_in_date}
                onChange={(e)=> setBookingDetails({...bookingDetails,check_in_date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="check_out_date">Check-out Date</label>
              <input
                type="date"
                className="form-control"
                id="check_out_date"
                name="check_out_date"
                value={bookingDetails.check_out_date}
                onChange={(e)=> setBookingDetails({...bookingDetails,check_out_date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="num_guests">Number of Guests</label>
              <input
                type="number"
                className="form-control"
                id="num_guests"
                name="num_guests"
                value={bookingDetails.num_guests}
                onChange={(e)=> setBookingDetails({...bookingDetails,num_guests: e.target.value})}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="total_amount">Total Amount</label>
              <input
                type="number"
                className="form-control"
                id="total_amount"
                name="total_amount"
                value={bookingDetails.total_amount}
                onChange={(e)=> setBookingDetails({...bookingDetails,total_amount: e.target.value})}
                required
              />
            </div>
            
            <button type="button" className="btn btn-primary mt-2" onClick={() => handleSubmit()}>Submit</button>
          </form>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default HotelList;
