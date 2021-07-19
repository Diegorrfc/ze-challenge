import { request } from 'http'
import { Controller } from './controller'
import { InvalidField } from './helpers/errors/invalid-field'
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
    if (!httpRequest.body.coverageArea.type) {
      return badRequest(new MissingField('coverageArea.type'))
    }
    if (!httpRequest.body.coverageArea.coordinates) {
      return badRequest(new MissingField('coverageArea.coordinates'))
    }

    if (!httpRequest.body.address.type) {
      return badRequest(new MissingField('address.type'))
    }
    if (!httpRequest.body.address.coordinates) {
      return badRequest(new MissingField('address.coordinates'))
    }

    if (httpRequest.body.coverageArea.type !== 'MultiPolygon') {
      return badRequest(new InvalidField('coverageArea.type'))
    }

    if (httpRequest.body.address.type !== 'Point') {
      return badRequest(new InvalidField('address.type'))
    }
  }
}