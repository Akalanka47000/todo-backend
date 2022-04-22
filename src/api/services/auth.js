const bcrypt = require('bcrypt')
const { decodeJwtToken } = require('../utils/jwt')
const { createUser, fetchUserByUsername, fetchUserByEmail, deleteUserById } = require('../repository/user')

const register = async (username, email, password) => {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
  return await createUser({
    username,
    email,
    password: encryptedPassword,
  })
}

const login = async (username, email, password) => {
  const user = username ? await fetchUserByUsername(username) : await fetchUserByEmail(email)
  if (!user) return false
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (isPasswordMatch) return user
  return false
}

const getCurrentUser = async (req) => {
  let token = req.headers.authorization
    ? req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null
    : null
  if (!token && req.cookies.token) token = req.cookies.token

  if (!token) return false

  const data = await decodeJwtToken(token).data
  delete data.password
  return data
}

const deleteCurrentUser = async (req) => {
  return await deleteUserById(req.user.id)
}

module.exports = {
  register,
  login,
  getCurrentUser,
  deleteCurrentUser,
}
