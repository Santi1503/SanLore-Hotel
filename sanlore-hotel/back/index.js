const { connection } = require("./Database/connection")
const express = require("express")
const cors = require("cors")
const userRoutes = require("./Routes/userRoute")
const reservationRoutes = require("./Routes/reservationRoute")
const roomRoutes = require("./Routes/roomRoute")

console.log("Api node para SanLore-Hotel iniciada")
connection()

const app = express()
const port = 3900

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/user", userRoutes)
app.use("/api/reservation", reservationRoutes)
app.use("/api/room", roomRoutes)

app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`)
})