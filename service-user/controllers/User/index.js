const register = require('./register')
const login = require('./login')
const getByAccountNumber = require('./getUserByAccountNumber')
const getByIdentityNumber = require('./getUserByIdentityNumber')
const update = require('./update')
const deleteUser = require('./delete')
const logout = require('./logout')

module.exports = {
    register,
    login,
    getByAccountNumber,
    getByIdentityNumber,
    update,
    deleteUser,
    logout
}
