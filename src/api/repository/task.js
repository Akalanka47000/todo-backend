const prismaClient = require('@prisma/client').PrismaClient

const prisma = new prismaClient()

const createNewTask = async (data) => {
  return await prisma.task.create({
    data: data,
  })
}

const getAllTasks = async () => {
  return await prisma.task.findMany({
    include: {
      status: true,
    },
  })
}

const fetchAllTasksByUser = async (userId) => {
  return await prisma.task.findMany({
    where: {
      user_id: userId,
    },
    include: {
      status: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  })
}

const fetchTaskById = async (id) => {
  return await prisma.task.findFirst({
    where: {
      id: typeof id != 'number' ? Number(id) : id,
    },
    include: {
      status: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  })
}

const updateTaskById = (id, data) => {
  return prisma.task.update({
    where: {
      id: typeof id != 'number' ? Number(id) : id,
    },
    data: data,
  })
}

const deleteTaskById = (id) => {
  return prisma.task.delete({
    where: {
      id: typeof id != 'number' ? Number(id) : id,
    },
  })
}

module.exports = {
  createNewTask,
  getAllTasks,
  fetchAllTasksByUser,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
}
