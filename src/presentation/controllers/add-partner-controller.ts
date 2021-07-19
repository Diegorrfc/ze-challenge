import { MissingField } from './helpers/errors/missign-field'
import { HttpRequest, HttpResponse } from './helpers/http'

export class AddPartnerController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields: Array<string> = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingField(field)
        }
      }
    }
  }
}