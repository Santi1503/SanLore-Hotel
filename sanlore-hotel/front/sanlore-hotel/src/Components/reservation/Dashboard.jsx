import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="content">
      <div className="title">
        <h1 className="title-text">Welcome, {auth.name}</h1>
      </div>

      <div className="tabs">
        <Link to="/booking/create">
          <button className="button">Create Reservation</button>
        </Link>
        <Link to="/booking/active">
          <button className="button">Active Reservations</button>
        </Link>
        <Link to="/booking/history">
          <button className="button">Reservations History</button>
        </Link>
      </div>
    </div>
  );
};
