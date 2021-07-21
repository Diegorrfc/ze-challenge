import supertest from 'supertest'
import app from '../config/app'
describe('Middleware test', () => {
  test('json parse', async () => {
    app.post('/json-parse', (req, res) => {
      res.send(req.body)
    })
    await supertest(app).post('/json-parse')
      .send({ jsonParse: 'parse' })
      .expect({ jsonParse: 'parse' })
  })
})
