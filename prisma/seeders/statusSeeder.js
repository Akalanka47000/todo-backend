const prismaClient = require('@prisma/client').PrismaClient

const prisma = new prismaClient()

const data = [
  {
    name: 'Todo',
    description: 'Newly added tasks which are still pending',
  },
  {
    name: 'In Progress',
    description: 'Tasks which are currently being worked on',
  },
  {
    name: 'Done',
    description: 'Tasks which are completed',
  },
]

const seed = async () => {
  await prisma.status.createMany({
    data,
  })
}

module.exports = seed
