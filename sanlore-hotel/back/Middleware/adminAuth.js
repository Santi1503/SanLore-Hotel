const adminAuth = (req, res, next) => {
    if (req.user.role !== "role_admin") {
        return res.status(403).send({
            status: "error",
            message: "Unauthorized to perform this action"
        })
    }
    next()
}

module.exports = adminAuth