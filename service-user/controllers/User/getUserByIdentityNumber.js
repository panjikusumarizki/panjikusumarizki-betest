const { users } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

const redisHelpers = require('../../helpers/redis')

module.exports = async (req, res) => {
    const schema = {
        identity: 'string|empty:false'
    }

    const validate = v.validate(req.query, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    try {
        const { identity } = req.query
        redisHelpers.getCached
        const checkIdentityNumber = await users.findOne({
            identityNumber: req.query.identity
        })

        if (!checkIdentityNumber) {
            return res.status(404).json({
                status: 'error',
                message: `User dengan nomor identitas ${identity} tidak ditemukan!`
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                id: checkIdentityNumber._id,
                userName: checkIdentityNumber.userName,
                accountNumber: checkIdentityNumber.accountNumber,
                emailAddress: checkIdentityNumber.emailAddress,
                identityNumber: checkIdentityNumber.identityNumber
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}