import { Controller } from '../../presentation/controllers/controller'
import { HttpRequest, HttpResponse } from '../../presentation/controllers/helpers/http/http'
import { routeAdapter } from './router-adapter'
import request from 'supertest'
import app from '../config/app'
import { badRequest, serverError } from '../../presentation/controllers/helpers/http/http-response-status-code'
import { MissingField } from '../../presentation/controllers/helpers/errors'

const controllerStub = (): Controller => {
  class ControllerRouteAdapterStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      })
    }
  }
  return new ControllerRouteAdapterStub()
}

describe('Route Adapter', () => {
  test('Should return 200 and correct body', async () => {
    const controller = controllerStub()
    app.post('/testAdapter', routeAdapter(controller))
    await request(app)
      .post('/testAdapter')
      .expect(200, { name: 'any_name' })
  })

  test('Should return 400 and MissingField body message', async () => {
    const controller = controllerStub()
    const missingField = new MissingField('adapter_test')
    jest.spyOn(controller, 'handle').mockResolvedValueOnce(badRequest(missingField))

    app.post('/testBadAdapter', routeAdapter(controller))

    await request(app)
      .post('/testBadAdapter')
      .expect(400, { message: 'Missing field adapter_test' })
  })

  test('Should return 500 and Server error body message', async () => {
    const controller = controllerStub()
    jest.spyOn(controller, 'handle').mockResolvedValueOnce(serverError())

    app.post('/testServerErrorAdapter', routeAdapter(controller))

    await request(app)
      .post('/testServerErrorAdapter')
      .expect(500, { message: 'Server error' })
  })
})
