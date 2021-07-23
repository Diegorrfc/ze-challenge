import { LogRepository } from '../../domain/data/db-interfaces/log-repository'
import { Controller } from '../../presentation/controllers/controller'
import { LogDecorator } from '../../main/log/log-decorator'
import { HttpRequest, HttpResponse } from '../../presentation/controllers/helpers/http/http'

interface SutTypes {
  logControllerSut: Controller
  logRepository: LogRepository
  controllerStub: Controller
}

const makeLogStub = (): SutTypes => {
  class LogStub implements LogRepository {
    async log(message: string): Promise<void> {

    }
  }
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({ statusCode: 200 })
    }

  }
  const logRepositoryStub = new LogStub()
  const controllerStub = new ControllerStub()
  const logControllerSut = new LogDecorator(controllerStub, logRepositoryStub)

  return {
    logControllerSut: logControllerSut,
    logRepository: logRepositoryStub,
    controllerStub: controllerStub
  }
}

describe('LogDecorator', () => {

  test('Check if call handle controller with correct values', async () => {
    const httpRequest: HttpRequest = {
      body: { name: 'diego' },
      params: { number: 10 },
      query: { query: 40 }
    }
    const { controllerStub, logControllerSut } = makeLogStub()
    const spyHanleControllerStub = jest.spyOn(controllerStub, 'handle')
    const logResponse = await logControllerSut.handle(httpRequest)
    
    expect(spyHanleControllerStub).toBeCalledWith(httpRequest)
    expect(logResponse).toStrictEqual({ statusCode: 200 })
  })

  test('Check if call logRepository with correct values', async () => {
    const httpRequest: HttpRequest = {
      body: { name: 'diego' },
      params: { number: 10 },
      query: { query: 40 }
    }
    const HttpResponse: HttpResponse = {
      statusCode: 500,
      body: { msgError: 'error', stack: 'stack error' }
    }
    const { controllerStub, logControllerSut, logRepository } = makeLogStub()
    jest.spyOn(controllerStub, 'handle').mockResolvedValue(HttpResponse)
    const spylog = jest.spyOn(logRepository, 'log')

    const logResponse = await logControllerSut.handle(httpRequest)
    
    expect(spylog).toBeCalledWith(HttpResponse.body.stack)
    expect(logResponse).toStrictEqual(HttpResponse)
  })
})