const Room = require("../Models/Room");

// Crear una nueva habitación
const createRoom = async (req, res) => {
    try {
        const { name, description, pricePerNight, availability, maxGuests } = req.body;

        const newRoom = new Room({
            name,
            description,
            pricePerNight,
            availability,
            maxGuests
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creando la habitación" });
    }
};

// Obtener todas las habitaciones
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo las habitaciones" });
    }
};

// Obtener una habitación por su ID
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo la habitación" });
    }
};

// Actualizar una habitación
const updateRoom = async (req, res) => {
    try {
        const { name, description, pricePerNight, availability } = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { name, description, pricePerNight, availability },
            { new: true }
        );
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error actualizando la habitación" });
    }
};

// Eliminar una habitación
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error eliminando la habitación" });
    }
};

module.exports = {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
};