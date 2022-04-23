const taskService = require('../services/task')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const { sendTokenResponse } = require('../utils/jwt')
const logger = require('../utils/logger')

// @desc    Create user specific task
// @route   POST /api/v1/task
// @access  Private

const createTask = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    const { name } = req.body
    if (!name) return errorResponse(res, 'Please provide a task name', 400)

    const task = await taskService.createTask(req, res, name)
    if (task) return res.status(200).json({ success: true, message: 'Task created successfully', data: task })
    return errorResponse(res, 'Failed to create task', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Get all user specific tasks
// @route   GET /api/v1/task/
// @access  Private

const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req, res)
    if (tasks) return res.status(200).json({ success: true, data: tasks })
    return errorResponse(res, 'Failed to get tasks', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Get user specific task by id
// @route   GET /api/v1/task/:id
// @access  Private

const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await taskService.getTaskById(req, res)
    if (task) return res.status(200).json({ success: true, data: task })
    return errorResponse(res, 'Failed to get task', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Update user specific task by id
// @route   PUT /api/v1/task/:id
// @access  Private

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { name, status_id } = req.body
    const task = await taskService.updateTask(req, res, name, status_id)
    if (task) return res.status(200).json({ success: true, message: 'Task updated successfully', data: task })
    return errorResponse(res, 'Failed to update task', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Delete user specific task by id
// @route   DELETE /api/v1/task/:id
// @access  Private

const deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req, res)
    if (task) return res.status(200).json({ success: true, message: 'Task deleted successfully' })
    return errorResponse(res, 'Failed to delete task', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
