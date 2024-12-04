const { Schema, model } = require('mongoose');

const RoomSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    maxGuests: {
        type: Number,
        required: true,
        enum: [2, 4, 6], // Habitaciones con 2, 4, o 6 personas máximas
    },
});

module.exports = model('Room', RoomSchema);