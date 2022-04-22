const { getAllStatuses, createStatuses } = require('../../src/api/repository/status')

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
  const statuses = await getAllStatuses()
  if (statuses.length === 0) await createStatuses(data)
}

module.exports = seed
