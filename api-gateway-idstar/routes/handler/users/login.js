const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_USER, URL_LOCAL } = process.env

const api = apiAdapter(URL_SERVICE_USER)
const apiGetToken = apiAdapter(URL_LOCAL)

module.exports = async (req, res) => {
    try {
        const user = await api.post('/users/login', req.body)
        const data = user.data.data

        const getToken = await apiGetToken.post('/token/getToken', data)
        const token = getToken.data.data.token

        const getRefreshToken = await apiGetToken.post('/token/getRefreshToken', data)
        const refreshToken = getRefreshToken.data.data.token

        await api.post('/refresh_token/create', { refreshToken: refreshToken, userId: data.id })

        return res.json({
            status: 'success',
            data: {
                data,
                token,
                refreshToken
            }
        })
    } catch (error) {
        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}