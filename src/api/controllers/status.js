const { getAllStatuses } = require('../repository/status')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const logger = require('../utils/logger')

// @desc    Get all possible task statuses
// @route   POST /api/v1/status/
// @access  Private

const getStatusList = asyncHandler(async (req, res) => {
  try {
    const statuses = await getAllStatuses()
    return res.status(200).json({ success: true, data: statuses })
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

module.exports = {
  getStatusList,
}
