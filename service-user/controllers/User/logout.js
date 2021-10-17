const { users, RefreshToken } = require('../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        userId: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }
    
    try {        
        const userId = req.body.userId
        const user = await users.findOne({ _id: userId })
    
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });
        }
    
        await RefreshToken.remove({ user_id: userId })

        return res.json({
            status: 'success',
            message: 'refresh token deleted'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}