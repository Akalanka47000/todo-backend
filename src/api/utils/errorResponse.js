const errorResponse = (res, error, status) => {
  // Prisma duplicate entry error
  if (error.code === 'P2002') error.message = `Duplicate entry for ${error.meta.target}`
  return res.status(status).json({ success: false, error: error.message || error, stack: error.stack })
}
module.exports = errorResponse
