const { users } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

const redisHelpers = require('../../helpers/redis')

module.exports = async (req, res) => {
    const schema = {
        account: 'string|empty:false'
    }

    const validate = v.validate(req.query, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    try {
        const { account } = req.query
        redisHelpers.getCached
        const checkAccountNumber = await users.findOne({
            accountNumber: account
        })

        if (!checkAccountNumber) {
            return res.status(404).json({
                status: 'error',
                message: `User dengan nomor akun ${account} tidak ditemukan!`
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                id: checkAccountNumber._id,
                userName: checkAccountNumber.userName,
                accountNumber: checkAccountNumber.accountNumber,
                emailAddress: checkAccountNumber.emailAddress,
                identityNumber: checkAccountNumber.identityNumber
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}
