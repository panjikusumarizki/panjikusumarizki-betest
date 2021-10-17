const { users } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

const { REDIS_KEYS } = process.env
const redisHelpers = require('../../helpers/redis')

module.exports = async (req, res) => {
    const schema = {
        id: "string|empty:false"
    }

    const validate = v.validate(req.params, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    try {
        const { id } = req.params
        const user = await users.findOne({ _id: id })

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });
        }

        const deleteUser = await user.remove()

        if (deleteUser) {
            redisHelpers.deleteCache(REDIS_KEYS)
            const getAllUser = await users.find({})
            redisHelpers.caching(REDIS_KEYS, getAllUser)
            return res.status(200).json({
                status: 'success',
                message: 'delete user sukses'
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'delete user gagal'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}