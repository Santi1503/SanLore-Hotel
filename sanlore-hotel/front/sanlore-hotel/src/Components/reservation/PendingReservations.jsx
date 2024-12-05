import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../Helpers/Global";

export const PendingReservations = () => {
  const [pendingReservations, setPendingReservations] = useState([]);

  useEffect(() => {
    fetchPendingReservations();
  }, []);

  const fetchPendingReservations = async () => {
    try {
      const response = await fetch(Global.url + "reservation/pending", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setPendingReservations(data);
    } catch (error) {
      console.error("Error fetching pending reservations:", error);
    }
  };
  return (
    <div className="content">
      <div className="title">
        <h1 className="title-text">Pending Reservations</h1>
      </div>

      <div className="tabs">
        <Link to="/booking">
          <button className="button">Home</button>
        </Link>
        <Link to="/booking/history">
          <button className="button">Reservations History</button>
        </Link>
      </div>

      <div className="reservations-list">
        {pendingReservations.length > 0 ? (
          pendingReservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <h3>{reservation.room.name}</h3>
              <p>{reservation.room.description}</p>
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
          <p>No active reservations.</p>
        )}
      </div>
    </div>
  );
};
