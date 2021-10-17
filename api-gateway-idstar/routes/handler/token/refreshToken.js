const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;
const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(URL_SERVICE_USER)

module.exports = async (req, res) => {
    try {
        const { refreshToken, accountNumber } = req.body

        if (!refreshToken || !accountNumber) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid token'
            })
        }

        await api.get('/refresh_token/getToken', { params: { refreshToken: refreshToken }})

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                })
            }

            if (accountNumber !== decoded.data.accountNumber) {
                return res.status(400).json({
                    status: 'error',
                    message: 'account number is not valid'
                })
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })

            return res.json({
                status: 'success',
                data: {
                    token
                }
            })
        })
    } catch (error) {
        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}