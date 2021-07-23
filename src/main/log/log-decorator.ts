import { Controller } from '../../presentation/controllers/controller'
import { HttpRequest, HttpResponse } from '../../presentation/controllers/helpers/http/http'
import { LogRepository } from '../../domain/data/db-interfaces/log-repository'

export class LogDecorator implements Controller {
  private readonly controller: Controller
  private readonly logRepository: LogRepository
  private static readonly httpStatusCodeError: number = 500

  constructor(controller: Controller, logRepository: LogRepository) {
    this.controller = controller
    this.logRepository = logRepository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const controllerResponse = await this.controller.handle(httpRequest)

    if (controllerResponse.statusCode === LogDecorator.httpStatusCodeError) {
      await this.logRepository.log(controllerResponse.body.stack)
    }
    return controllerResponse
  }
}
