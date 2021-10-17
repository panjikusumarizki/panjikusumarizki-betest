const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
