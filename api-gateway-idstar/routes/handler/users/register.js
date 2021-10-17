const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_USER } = process.env

const api = apiAdapter(URL_SERVICE_USER)

module.exports = async (req, res) => {
    try {
        const register = await api.post('/users/register', req.body)
        return res.json(register.data)
    } catch (error) {
        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' })
        }

        const { status, data } = error.response
        return res.status(status).json(data)
    }
}
