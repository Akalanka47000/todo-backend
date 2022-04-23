const { getAllStatuses, createStatuses } = require('../../src/api/repository/status')

const data = [
  {
    name: 'Todo',
    description: 'Newly added tasks which are still pending',
    color: '#fbbf24',
  },
  {
    name: 'In Progress',
    description: 'Tasks which are currently being worked on',
    color: '#2462c3',
  },
  {
    name: 'Done',
    description: 'Tasks which are completed',
    color: '#22c55e',
  },
]

const seed = async () => {
  const statuses = await getAllStatuses()
  if (statuses.length === 0) await createStatuses(data)
}

module.exports = seed
