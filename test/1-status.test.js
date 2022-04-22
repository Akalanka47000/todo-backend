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

describe('Status Fetch', () => {
  test('Fetch possible statuse', async () => {
   await testSession.get('/api/v1/status').send().expect(200)
  })
})
