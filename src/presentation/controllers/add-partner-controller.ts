import { AddPartner } from '../../domain/use-cases/add-partner'
import { Controller } from './controller'
import { InvalidField, MissingField } from './helpers/errors'
import { HttpRequest, HttpResponse } from './helpers/http/http'
import { badRequest, Ok, serverError } from './helpers/http/http-response-status-code'

export class AddPartnerController implements Controller {
  private readonly addPartner: AddPartner

  constructor(addPartner: AddPartner) {
    this.addPartner = addPartner
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields: string[] = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
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
      const { tradingName, ownerName, document, coverageArea, address } = httpRequest.body

      const partner = await this.addPartner.add({
        tradingName: tradingName,
        ownerName: ownerName,
        document: document,
        coverageArea: {
          type: coverageArea.type,
          coordinates: coverageArea.coordinates
        },
        address: {
          type: address.type,
          coordinates: address.coordinates
        }
      })
      return Ok(partner)
    } catch (error) {
      return serverError()
    }
  }
}
