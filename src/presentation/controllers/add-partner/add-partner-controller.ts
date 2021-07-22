import { AddPartner } from '../../../domain/use-cases/interfaces/add-partner-interface'
import { HasPartnerByDocument } from '../../../domain/use-cases/has-partner-by-document'
import { Controller } from '../controller'
import { PartnerAlreadyExists } from '../helpers/errors/partner-already-exists'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, Ok, serverError } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'

export class AddPartnerController implements Controller {
  private readonly addPartner: AddPartner
  private readonly componentValidation: ComponentValidation
  private readonly hasPartnerByDocument: HasPartnerByDocument

  constructor(addPartner: AddPartner, componentValidation: ComponentValidation, hasPartnerByDocument: HasPartnerByDocument) {
    this.addPartner = addPartner
    this.componentValidation = componentValidation
    this.hasPartnerByDocument = hasPartnerByDocument
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.componentValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { tradingName, ownerName, document, coverageArea, address } = httpRequest.body

      const hasPartner = await this.hasPartnerByDocument.hasPartnerByDocument(document)
      if (hasPartner) {
        return badRequest(new PartnerAlreadyExists())
      }

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
      console.log(error)
      return serverError()
    }
  }
}
