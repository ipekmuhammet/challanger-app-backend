const jwt = require('jsonwebtoken')

module.exports = {
    generate: ({ id, username }, expiresIn) => (
        jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY, { expiresIn })
    )
}