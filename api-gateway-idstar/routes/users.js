const express = require('express')
const router = express.Router()

const usersHandler = require('./handler/users')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', usersHandler.register)
router.post('/login', usersHandler.login)
router.get('/get', verifyToken, usersHandler.getUserByAccountNumber)
router.get('/getByIdentity', verifyToken, usersHandler.getUserByIdentityNumber)
router.put('/update', verifyToken, usersHandler.update)
router.delete('/delete', verifyToken, usersHandler.deleteUser)
router.post('/logout', verifyToken, usersHandler.logout)

module.exports = router;
