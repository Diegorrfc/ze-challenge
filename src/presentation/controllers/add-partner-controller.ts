export class AddPartnerController {
  async handle(httpReques: any): Promise<any> {
    if (!httpReques.body.tradingName) {
      return {
        statusCode: 400
      }
    }
    if (!httpReques.body.ownerName) {
      return {
        statusCode: 400
      }
    }

    if (!httpReques.body.document) {
      return {
        statusCode: 400
      }
    }
    if (!httpReques.body.coverageArea) {
      return {
        statusCode: 400
      }
    }
    if (!httpReques.body.address) {
      return {
        statusCode: 400
      }
    }    
  }
}