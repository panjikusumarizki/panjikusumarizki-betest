const express = require('express')
const router = express.Router()
const userController = require('../controllers/User')
const redis = require('../helpers/redis')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/get', userController.getByAccountNumber)
router.get('/getByIdentity', userController.getByIdentityNumber)
router.put('/update/:id', userController.update)
router.delete('/delete/:id', userController.deleteUser)
router.post('/logout', userController.logout)

module.exports = router
