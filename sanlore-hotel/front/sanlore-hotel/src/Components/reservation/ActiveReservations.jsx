import { Link } from "react-router-dom";

export const ActiveReservations = () => {
  return (
    <div className="content">
      <div className="title">
        <h1 className="title-text">Active Reservations</h1>
      </div>

      <div className="tabs">
        <Link to="/booking">
          <button className="button">Home</button>
        </Link>
        <Link to="/booking/history">
          <button className="button">Reservations History</button>
        </Link>
      </div>
    </div>
  );
};
