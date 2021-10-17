const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_USER } = process.env

const api = apiAdapter(URL_SERVICE_USER)

module.exports = async (req, res) => {
    try {
        const { identity } = req.query
        const user = await api.get(`/users/getByIdentity?identity=${identity}`)
        return res.json(user.data)
    } catch (error) {
        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}
