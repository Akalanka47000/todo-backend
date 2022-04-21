const prismaClient = require('@prisma/client').PrismaClient

const prisma = new prismaClient()

const getAllStatuses = async () => {
  return await prisma.status.findMany()
}

const getStatusById = async (id) => {
  return await prisma.status.findFirst({
    where: {
      id: Number(id),
    },
  })
}

const getStatusByName = async (name) => {
  return await prisma.status.findFirst({
    where: {
      name,
    },
  })
}

module.exports = {
  getAllStatuses,
  getStatusById,
  getStatusByName,
}
