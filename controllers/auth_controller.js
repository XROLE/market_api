const signUp = (req, res, next) => {
    res.json({
        status: "success",
        message: "Sign up is working"
    })
}

module.exports = { signUp }