import { HttpRequest, HttpResponse } from './helpers/http'

export class AddPartnerController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.tradingName) {
      return {
        statusCode: 400,
        body: new Error('Missing param tradingName')
      }
    }
    if (!httpRequest.body.ownerName) {
      return {
        statusCode: 400,
        body: new Error('Missing param ownerName')
      }
    }

    if (!httpRequest.body.document) {
      return {
        statusCode: 400,
        body: new Error('Missing param document')
      }
    }
    if (!httpRequest.body.coverageArea) {
      return {
        statusCode: 400,
        body: new Error('Missing param coverageArea')
      }
    }
    if (!httpRequest.body.address) {
      return {
        statusCode: 400,
        body: new Error('Missing param address')
      }
    }    
  }
}