import { LoadPartnerById } from '../../../domain/use-cases/interfaces/load-partner-by-id-interface'
import { Controller } from '../controller'
import { MissingField } from '../helpers/errors'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, notFound, Ok, serverError } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'

export class LoadPartnerByIdController implements Controller {
  private readonly loadPartnerByIdUseCase: LoadPartnerById
  private readonly componentValidation: ComponentValidation

  constructor(loadPartnerByIdUseCase: LoadPartnerById, componentValidation: ComponentValidation) {
    this.loadPartnerByIdUseCase = loadPartnerByIdUseCase
    this.componentValidation = componentValidation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.componentValidation.validate(httpRequest.params)
      if (error) {
        return badRequest(new MissingField('id'))
      }
      const id = httpRequest.params.id
      const partner = await this.loadPartnerByIdUseCase.loadPartnerById(id)
      if (!partner) {
        return notFound()
      }
      return Ok(partner)
    } catch (error) {
      return serverError(error)
    }
  }
}
