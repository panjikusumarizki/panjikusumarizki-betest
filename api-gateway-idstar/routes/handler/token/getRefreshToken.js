const jwt = require('jsonwebtoken')
const { 
    JWT_SECRET_REFRESH_TOKEN,
    JWT_REFRESH_TOKEN_EXPIRED 
} = process.env

module.exports = (req, res) => {
    try {
        const data = req.body
        const token = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED})

        return res.json({
            status: 'success',
            data: {
                token
            }
        })
    } catch (error) {
        return res.json(error.message);
    }
}