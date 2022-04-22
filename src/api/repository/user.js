const prismaClient = require('@prisma/client').PrismaClient

const prisma = new prismaClient()

const createUser = async (data) => {
  return await prisma.user.create({
    data: data,
  })
}

const fetchUserByUsername = async (username) => {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  })
}

const fetchUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

const fetchUserById = async (id) => {
  return await prisma.user.findFirst({
    where: {
      id: typeof id != 'number' ? Number(id) : id,
    },
  })
}

const deleteUserById = (id) => {
  return prisma.user.delete({
    where: {
      id: typeof id != 'number' ? Number(id) : id,
    },
  })
}

module.exports = {
  createUser,
  fetchUserByUsername,
  fetchUserByEmail,
  fetchUserById,
  deleteUserById,
}
