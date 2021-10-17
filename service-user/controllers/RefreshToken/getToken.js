const { RefreshToken } = require('../../models')

module.exports = async (req, res) => {
    const refreshToken = req.query.refreshToken
    const token = await RefreshToken.findOne({
        token: refreshToken
    })

    if (!token) {
        return res.status(400).json({
            status: 'error',
            message: 'invalid token'
        });
    }

    return res.json({
        status: 'success',
        token
    })
}