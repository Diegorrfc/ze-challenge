import { SearchPartner } from '../../../domain/use-cases/search-partner'
import { Controller } from '../controller'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { Ok, serverError } from '../helpers/http/http-response-status-code'

export class SearchPartnerController implements Controller {
  private readonly searchPartner: SearchPartner

  constructor(searchPartner: SearchPartner) {
    this.searchPartner = searchPartner
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const longitude = httpRequest.params.long
      const latitude = httpRequest.params.lat
      const partner = await this.searchPartner.searchPartner(longitude, latitude)
      return Ok(partner)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
