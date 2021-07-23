import { SearchPartner } from '../../../domain/use-cases/interfaces/search-partner-interface'
import { Controller } from '../controller'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, notFound, Ok, serverError } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'

export class SearchPartnerController implements Controller {
  private readonly searchPartnerUseCase: SearchPartner
  private readonly componentValidation: ComponentValidation

  constructor(searchPartnerUseCase: SearchPartner, componentValidation: ComponentValidation) {
    this.searchPartnerUseCase = searchPartnerUseCase
    this.componentValidation = componentValidation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query

      const isValidParams = this.componentValidation.validate(params)
      if (isValidParams) {
        return badRequest(isValidParams)
      }

      const partner = await this.searchPartnerUseCase.searchPartner(params.longitude, params.latitude)
      if (!partner) {
        return notFound()
      }
      return Ok(partner)
    } catch (error) {
      return serverError(error)
    }
  }
}
