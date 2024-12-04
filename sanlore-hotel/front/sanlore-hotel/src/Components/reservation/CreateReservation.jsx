import { useEffect, useState } from "react";
import { Global } from "../../Helpers/Global";

export const CreateReservation = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reservationStatus, setReservationStatus] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(Global.url + "room", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    if (selectedRoom && checkIn && checkOut) {
      const room = rooms.find((r) => r._id === selectedRoom);

      if (room) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (nights > 0) {
          setTotalPrice(room.pricePerNight * nights);
        } else {
          setTotalPrice(0);
        }
      } else {
        setTotalPrice(0);
      }
    }
  }, [selectedRoom, checkIn, checkOut]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Muestra el modal
  };

  const confirmReservation = async (status) => {
    try {
      const response = await fetch(Global.url + "reservation/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          roomId: selectedRoom,
          checkIn,
          checkOut,
          numberOfGuests,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Reservation ${status}`);
        setSelectedRoom("");
        setCheckIn("");
        setCheckOut("");
        setNumberOfGuests(1);
        setTotalPrice(0);
      } else {
        setMessage(data.message || "Failed to create reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      setMessage("Failed to create reservation.");
    }

    setShowModal(false);
  };

  return (
    <div className="create-reservation">
      <h1>Create a Reservation</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Room:
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name} - ${room.pricePerNight}
              </option>
            ))}
          </select>
        </label>
        <label>
          Check-In:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </label>
        <label>
          Check-Out:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </label>
        <label>
          Number of guests:
          <select
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))}
            required
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </label>
        <p>Total Price: ${totalPrice}</p>
        <button type="submit">Reserve</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Reservation</h2>
            <p>Total Price: ${totalPrice}</p>
            <p>
              Do you want to confirm the reservation or leave it as pending?
            </p>
            <button onClick={() => confirmReservation("confirmed")}>
              Confirm
            </button>
            <button onClick={() => confirmReservation("pending")}>
              Pending
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
