const fs = require("fs")
const path = require("path")
const Reservation = require("../Models/Reservation");
const Room = require("../Models/Room");

const createReservation = async (req, res) => {
    try {
        const { roomId, startDate, endDate, numberOfGuests } = req.body;
        
        // Obtén la información de la habitación
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Calcular la cantidad de noches
        const start = new Date(startDate);
        const end = new Date(endDate);
        const nights = (end - start) / (1000 * 3600 * 24); // Convierte la diferencia a días

        // Calcular el precio total
        const totalPrice = room.pricePerNight * nights;

        // Crear la nueva reserva
        const newReservation = new Reservation({
            user: req.user.id, // El usuario que realiza la reserva
            room: roomId,
            startDate,
            endDate,
            numberOfGuests,
            totalPrice,  // Incluye el precio calculado
            status: 'pending'  // Estado por defecto
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
        const reservations = await Reservation.find({ user: req.user.id });
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { reservationId, startDate, endDate } = req.body;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        reservation.startDate = new Date(startDate);
        reservation.endDate = new Date(endDate);

        const nights = (reservation.endDate - reservation.startDate) / (1000 * 3600 * 24);
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

module.exports = {
    createReservation,
    getReservations,
    updateReservation,
    cancelReservation
};