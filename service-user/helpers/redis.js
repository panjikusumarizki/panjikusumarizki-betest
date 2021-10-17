const redis = require('redis')
const client = redis.createClient()
const { REDIS_KEYS } = process.env

module.exports = {
    getCached: (req, res, next) => {
        client.get(REDIS_KEYS, (err, reply) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }

            if (reply == null) {
                next()
            } else {
                res.status(200).json({
                    message: 'Read data success',
                    data: JSON.parse(reply)
                })
            }
        })
    },
    caching: (key, data) => {
        client.set(key, JSON.stringify(data))
    },
    deleteCache: (key) => {
        client.del(key)
    }
}
