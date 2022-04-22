const errorResponse = require('../utils/errorResponse')
const {
  createNewTask,
  fetchAllTasksByUser,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
} = require('../repository/task')
const { getStatusByName, getStatusById } = require('../repository/status')

const createTask = async (req, res, taskName) => {
  const todoStatus = await getStatusByName('Todo')

  return await createNewTask({
    name: taskName,
    status_id: todoStatus.id,
    user_id: req.user.id,
  })
}

const getTasks = async (req, res) => {
  return await fetchAllTasksByUser(req.user.id)
}

const getTaskById = async (req, res) => {
  const task = await fetchTaskById(req.params.id)
  if (!task) return errorResponse(res, 'Task not found', 400)

  if (task.user_id != req.user.id)
    return errorResponse(res, 'You are not authorized to view this task', 403)

  return task
}

const updateTask = async (req, res, taskName, statusId) => {
  const task = await fetchTaskById(req.params.id)
  if (!task) return errorResponse(res, 'Task not found', 400)
  if (task.user_id != req.user.id)
    return errorResponse(res, 'You are not authorized to update this task', 403)

  let newStatus
  if (statusId) {
    const status = await getStatusById(statusId)
    if (!status) return errorResponse(res, 'Status not found', 400)
    newStatus = status.id
  }

  return await updateTaskById(req.params.id, {
    name: taskName || task.name,
    status_id: newStatus || task.status_id,
  })
}
const deleteTask = async (req, res) => {
  const task = await fetchTaskById(req.params.id)
  if (!task) return errorResponse(res, 'Task not found', 400)

  if (task.user_id != req.user.id)
    return errorResponse(res, 'You are not authorized to delete this task', 403)

  return await deleteTaskById(req.params.id)
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
