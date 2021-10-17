const express = require('express')
const router = express.Router()

const refreshToken = require('./handler/token/refreshToken')
const token = require('./handler/token/getToken')
const getRefreshToken = require('./handler/token/getRefreshToken')

router.post('/', refreshToken)
router.post('/getToken', token)
router.post('/getRefreshToken', getRefreshToken)

module.exports = router;
