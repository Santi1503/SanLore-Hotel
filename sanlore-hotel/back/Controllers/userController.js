const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("../Services/jwt")
const mongoosePagination = require("mongoose-pagination")
const fs = require("fs")
const path = require("path")

const register = async (req, res) => {
    // recoger los datos de la peticion
    let params = req.body

    // comprobar recepcion
    if (!params.name || !params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos obligatorios"
        })
    }

    // Control usuarios duplicados
    User.find({ $or: [
        {email: params.email.toLowerCase()}
    ]}).then(async (users) => {
        if (users && users.length >= 1) {
            return res.status(400).send({
                status: "error",
                message: "El email ya está en uso"
            })
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(params.password, 10)
        params.password = hashedPassword

        // Crear objeto de usuario
        const userToSave = new User(params)

        // Guardar usuario
        const savedUser = await userToSave.save()

        return res.status(200).send({
            status: "success",
            message: "Usuario creado correctamente",
            user: savedUser
        })
    }).catch((error) => {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al crear el usuario",
                error
            })
        }
    })
}

const login = async (req, res) => {
    try {
        // Recoger los datos de la peticion
        const {email, password} = req.body

        // Comprobar recepcion
        if (!email || !password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos obligatorios"
            })
        }

        // Comprobar el usuario
        const user = await User.findOne({
            email: email.toLowerCase()
        })

        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).send({
                status: "error",
                message: "Contraseña incorrecta"
            })
        }

        // Generar token JWT
        const token = jwt.createToken(user)

        return res.status(200).send({
            status: "success",
            message: "Login correcto",
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
            token
        })
    } catch (error) {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "Error en el login",
                error
            })
        }
    }
}

const update = async (req, res) => {
    let userIdentity = req.user
    let userToUpdate = req.body

    delete userToUpdate.iat
    delete userToUpdate.exp
    delete userToUpdate.role

    try {
        // Comprobar si el email ya esta en uso
        const users = await User.find({
            $or: [
                {email: userToUpdate.email.toLowerCase()}
            ]
        })

        let userIsset = false
        users.forEach(user => {
            if (user && user._id != userIdentity.id) {
                userIsset = true
                return
            }
        })

        if (userIsset) {
            return res.status(400).send({
                status: "error",
                message: "El email ya está en uso"
            })
        }

        if (userToUpdate.password) {
            const hashedPassword = await bcrypt.hash(userToUpdate.password, 10)
            userToUpdate.password = hashedPassword
        } else {
            userToUpdate.password = userIdentity.password
        }

        const userUpdated = await User.findByIdAndUpdate(userIdentity.id, userToUpdate, {new: true})

        if (!userUpdated) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).send({
            status: "success",
            message: "Usuario actualizado correctamente",
            user: userUpdated
        })

    } catch (error) {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar usuario",
                error
            })
        }
    }
}

const profile = async (req, res) => {
    const id = req.params.id

    try {
        // Buscar el usuario por ID
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).send({
            status: "success",
            user: user
        })

    } catch (error) {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener el usuario",
                error
            })
        }
    }
}

module.exports = {
    register,
    login,
    update,
    profile,
}