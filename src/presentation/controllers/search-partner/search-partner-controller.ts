import { SearchPartner } from '../../../domain/use-cases/interfaces/search-partner-interface'
import { Controller } from '../controller'
import { MissingField } from '../helpers/errors'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, notFound, Ok, serverError } from '../helpers/http/http-response-status-code'

export class SearchPartnerController implements Controller {
  private readonly searchPartnerUseCase: SearchPartner

  constructor(searchPartnerUseCase: SearchPartner) {
    this.searchPartnerUseCase = searchPartnerUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query
      if (!params.longitude) {
        return badRequest(new MissingField('longitude'))
      }
      if (!params.latitude) {
        return badRequest(new MissingField('latitude'))
      }

      const partner = await this.searchPartnerUseCase.searchPartner(params.longitude, params.latitude)
      if (!partner) {
        return notFound()
      }
      return Ok(partner)
    } catch (error) {
      return serverError()
    }
  }
}
