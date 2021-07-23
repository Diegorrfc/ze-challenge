import { AddPartner } from '../../../domain/use-cases/interfaces/add-partner-interface'
import { Controller } from '../controller'
import { PartnerAlreadyExists } from '../helpers/errors/partner-already-exists'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, created, serverError } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'

export class AddPartnerController implements Controller {
  private readonly addPartner: AddPartner
  private readonly componentValidation: ComponentValidation

  constructor(addPartner: AddPartner, componentValidation: ComponentValidation) {
    this.addPartner = addPartner
    this.componentValidation = componentValidation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.componentValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { id, tradingName, ownerName, document, coverageArea, address } = httpRequest.body

      const partner = await this.addPartner.add({
        id: id,
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
      return created(partner)
    } catch (error) {
      if (error instanceof PartnerAlreadyExists) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
