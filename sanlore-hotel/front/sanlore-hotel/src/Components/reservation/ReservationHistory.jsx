import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../Helpers/Global";

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(Global.url + "reservation/reservations", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setReservations(data);
      setFilteredReservations(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = reservations.filter(
      (reservation) =>
        reservation.room.name.toLowerCase().includes(term) ||
        reservation.status.toLowerCase().includes(term) ||
        new Date(reservation.checkIn).toLocaleDateString().includes(term) ||
        new Date(reservation.checkOut).toLocaleDateString().includes(term)
    );

    setFilteredReservations(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="title">
        <h1 className="title-text">Reservation History</h1>
      </div>

      <div className="tabs">
        <Link to="/booking">
          <button className="button">Home</button>
        </Link>
        <Link to="/booking/active">
          <button className="button">Active Reservations</button>
        </Link>
      </div>

      <div className="reservations-card">
        <div className="search-bar">
          <p>Search:</p>
          <input
            type="text"
            placeholder="Search by room, status, or date"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      <p>
        Showing {filteredReservations.length} of {reservations.length}{" "}
        reservations.
      </p>

      <div className="reservations-list">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <h3>{reservation.room.name}</h3>
              <p>{reservation.room.description}</p>
              <p>Price per Night: ${reservation.totalPrice}</p>
              <p>
                Check-In: {new Date(reservation.checkIn).toLocaleDateString()}
              </p>
              <p>
                Check-Out: {new Date(reservation.checkOut).toLocaleDateString()}
              </p>
              <p>Status: {reservation.status}</p>
            </div>
          ))
        ) : (
          <p>No reservations match your search.</p>
        )}
      </div>
    </div>
  );
};
