const jwt = require("jwt-simple")
const moment = require("moment")

const secret = "CLAVE_SECRETA_HOTEL_15050304"

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix()
    }

    return jwt.encode(payload, secret)
}

module.exports = {
    secret,
    createToken
}