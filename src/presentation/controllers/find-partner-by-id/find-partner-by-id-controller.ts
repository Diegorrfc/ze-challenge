import { FindPartnerById } from '../../../domain/use-cases/find-partner-by-id'
import { Controller } from '../controller'
import { MissingField } from '../helpers/errors'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'

export class FindPartnerByIdController implements Controller {
  private readonly hasPartnerByDocument: FindPartnerById

  constructor(hasPartnerByDocument: FindPartnerById) {
    this.hasPartnerByDocument = hasPartnerByDocument
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params?.id
    if (!id) {
      return badRequest(new MissingField('id'))
    }
    const partner = await this.hasPartnerByDocument.findPartnerById(id)
    return Ok(partner)
  }
}
