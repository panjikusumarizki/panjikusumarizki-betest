const register = require('./register')
const login = require('./login')
const getUserByAccountNumber = require('./getUserByAccountNumber')
const getUserByIdentityNumber = require('./getUserByIdentityNumber')
const update = require('./update')
const deleteUser = require('./delete')
const logout = require('./logout')

module.exports = {
    register,
    login,
    getUserByAccountNumber,
    getUserByIdentityNumber,
    update,
    deleteUser,
    logout
}
