const { users } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

const { REDIS_KEYS } = process.env
const redisHelpers = require('../../helpers/redis')

module.exports = async (req, res) => {
    const schema = {
        userName: 'string|empty:false',
        accountNumber: 'string|optional',
        emailAddress: 'string|empty:false',
        identityNumber: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }
    
    try {
        const id = req.params.id
        const { userName, accountNumber, emailAddress, identityNumber } = req.body
        redisHelpers.getCached
        const user = await users.findOne({ _id: id })
    
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });
        }

        user.userName = userName
        user.accountNumber = accountNumber
        user.emailAddress = emailAddress
        user.identityNumber = identityNumber

        const update = await user.save()

        if (update) {
            redisHelpers.deleteCache(REDIS_KEYS)
            const getAllUser = await users.find({})
            redisHelpers.caching(REDIS_KEYS, getAllUser)
            return res.status(200).json({
                status: 'success',
                message: 'update sukses',
                data: update
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'update gagal',
                data: update
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })        
    }
}