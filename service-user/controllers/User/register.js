const { users } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

const redisHelpers = require('../../helpers/redis')
const { REDIS_KEYS } = process.env

module.exports = async (req, res) => {
    const schema = {
        userName: 'string|empty:false',
        accountNumber: 'number|empty:false',
        emailAddress: 'email|empty:false',
        identityNumber: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    try {
        const { accountNumber } = req.body
        const checkAccountNumber = await users.findOne({
            accountNumber: accountNumber
        })

        if (checkAccountNumber === null) {
            await users.create(req.body)
            redisHelpers.deleteCache(REDIS_KEYS)

            const getAllUser = await users.find({})
            redisHelpers.caching(REDIS_KEYS, getAllUser)

            return res.status(200).json({
                status: 'success',
                message: 'Registrasi berhasil'
            })
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'Nomor akun sudah digunakan, gunakan nomor akun lain untuk mendaftar!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}
