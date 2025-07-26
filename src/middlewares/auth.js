const isAdminAuth = (req, res, next) => {
    const token = "xyz"
    isAuth = token === "xyz"
    if(isAuth){
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = {
    isAdminAuth
}