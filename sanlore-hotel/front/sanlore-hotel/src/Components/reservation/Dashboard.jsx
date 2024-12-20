import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { Global } from "../../Helpers/Global";

export const Dashboard = () => {
  const { auth } = useAuth();
  const [activeReservations, setActiveReservations] = useState([]);

  useEffect(() => {
    fetchActiveReservations();
  }, []);

  const fetchActiveReservations = async () => {
    try {
      const response = await fetch(Global.url + "reservation/active", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setActiveReservations(data);
    } catch (error) {
      console.error("Error fetching active reservations:", error);
    }
  };

  return (
    <div className="content">
      <div className="title">
        <h1 className="title-text">Welcome, {auth.name}</h1>
      </div>

      <div className="tabs">
        <Link to="/booking/create">
          <button className="button">Create Reservation</button>
        </Link>
        <Link to="/booking/pending">
          <button className="button">Pending Reservations</button>
        </Link>
        <Link to="/booking/history">
          <button className="button">Reservations History</button>
        </Link>
      </div>

      <div className="active-card">
        <div className="active-title">
          <h3>Active Reservations</h3>
        </div>
      </div>

      <div className="reservations-list">
        {activeReservations.length > 0 ? (
          activeReservations.map((reservation) => (
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
