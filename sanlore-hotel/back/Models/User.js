const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return regex.test(email)
            },
            message: "El email no es válido"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        default: 'role_user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("User", UserSchema)