import { SearchPartner } from '../../../domain/use-cases/interfaces/search-partner-interface'
import { Controller } from '../controller'
import { MissingField } from '../helpers/errors'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, Ok, serverError } from '../helpers/http/http-response-status-code'

export class SearchPartnerController implements Controller {
  private readonly searchPartnerUseCase: SearchPartner

  constructor(searchPartnerUseCase: SearchPartner) {
    this.searchPartnerUseCase = searchPartnerUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params
      if (!params.longitude) {
        return badRequest(new MissingField('longitude'))
      }
      if (!params.latitude) {
        return badRequest(new MissingField('latitude'))
      }

      const longitude = httpRequest.params.longitude
      const latitude = httpRequest.params.latitude
      const partner = await this.searchPartnerUseCase.searchPartner(longitude, latitude)
      return Ok(partner)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
