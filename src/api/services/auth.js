const prismaClient = require('@prisma/client').PrismaClient
const bcrypt = require('bcrypt')
const { decodeJwtToken } = require('../utils/jwt')

const prisma = new prismaClient()

const register = async (username, email, password) => {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
  return await prisma.user.create({
    data: {
      username,
      email,
      password: encryptedPassword,
    },
  })
}

const login = async (username, email, password) => {
  const user = await prisma.user.findFirst({
    where: username
      ? {
          username,
        }
      : { email },
  })
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

module.exports = {
  register,
  login,
  getCurrentUser,
}
