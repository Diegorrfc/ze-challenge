import { Controller } from './controller'
import { MissingField } from './helpers/errors/missign-field'
import { HttpRequest, HttpResponse } from './helpers/http/http'
import { badRequest } from './helpers/http/http-response-status-code'

export class AddPartnerController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields: Array<string> = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingField(field))        
      }
    }
  }
}