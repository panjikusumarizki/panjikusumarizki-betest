const express = require('express')
const router = express.Router()
const refreshTokenController = require('../controllers/RefreshToken')

router.post('/create', refreshTokenController.createToken)
router.get('/getToken', refreshTokenController.getToken)

module.exports = router
