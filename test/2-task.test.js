const app = require('../src/server')
const testBase = require('./testBase')

let testSession

/**
 * Create a super test session and initiate the database before running tests.
 */
beforeAll(async () => {
  testSession = testBase.createSuperTestSession(app)
  await testBase.authenticateTestSession(testSession)
})

/**
 * Take down the app and reset database once the test execution is done
 */
afterAll((done) => {
  testBase.resetDatabase()
  app.close(done)
})

describe('Task CRUD Operations', () => {
  let task
  test('Create New Task', async () => {
    const res = await testSession.post('/api/v1/task').send({ name: 'Test Task' })
    task = res._body.data
    expect(res.status).toBe(200)
  })
  test('Get Task List', async () => {
    const res = await testSession.get('/api/v1/task').send()
    expect(res.status).toBe(200)
    expect(res._body.data.length).toBe(1)
  })
  test('Get Single Task', async () => {
    await testSession.get(`/api/v1/task/${task.id}`).send().expect(200)
  })
  test('Update Task', async () => {
    const res = await testSession.put(`/api/v1/task/${task.id}`).send({ name: 'Updated Task' })
    expect(res.status).toBe(200)
    expect(res._body.data.name).toBe('Updated Task')
  })
  test('Delete Task', async () => {
    await testSession.delete(`/api/v1/task/${task.id}`).send().expect(200)
  })
})
