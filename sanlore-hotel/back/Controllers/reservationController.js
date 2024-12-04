const fs = require("fs")
const path = require("path")
const Reservation = require("../Models/Reservation");
const Room = require("../Models/Room");

const createReservation = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut, numberOfGuests, status } = req.body;
        const userId = req.user.id

        // Obtén la información de la habitación
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        if (numberOfGuests > room.maxGuests) {
            return res.status(400).json({ message: "Too many guests for this room" });
        }

        // Calcular la cantidad de noches
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))

        if (nights < 1) {
            return res.status(400).json({ message: "Invalid dates" });
        }

        // Calcular el precio total
        const totalPrice = room.pricePerNight * nights;

        // Crear la nueva reserva
        const newReservation = new Reservation({
            user: userId, // El usuario que realiza la reserva
            room: roomId,
            checkIn: startDate,
            checkOut: endDate,
            numberOfGuests,
            totalPrice,  // Incluye el precio calculado
            status  // Estado por defecto
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getReservations = async (req, res) => {
    try {
        const userId = req.user.id

        const reservations = await Reservation.find({ user: userId }).populate('room');
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { reservationId, checkIn, checkOut } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        reservation.checkIn = new Date(checkIn);
        reservation.checkOut = new Date(checkOut);

        const nights = (reservation.checkOut - reservation.checkIn) / (1000 * 3600 * 24);
        reservation.totalPrice = reservation.room.pricePerNight * nights;

        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        reservation.status = 'cancelled';
        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRoomSuggestions = async (req, res) => {
    try {
        const userId = req.user.id

        const userReservations = await Reservation.find({ user: userId }).select('room')
        const reservedRoomIds = userReservations.map((reservation) => reservation.room)

        const suggestedRooms = await Room.find({
            _id: { $nin: reservedRoomIds },
            availability: true
        })
        
        res.status(200).json(suggestedRooms)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createReservation,
    getReservations,
    updateReservation,
    cancelReservation,
    getRoomSuggestions,
};