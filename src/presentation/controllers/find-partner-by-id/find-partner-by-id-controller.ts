import { FindPartnerById } from '../../../domain/use-cases/find-partner-by-id'
import { Controller } from '../controller'
import { MissingField } from '../helpers/errors'
import { HttpRequest, HttpResponse } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'

export class FindPartnerByIdController implements Controller {
  private readonly hasPartnerByDocument: FindPartnerById
  private readonly componentValidation: ComponentValidation

  constructor(hasPartnerByDocument: FindPartnerById, componentValidation: ComponentValidation) {
    this.hasPartnerByDocument = hasPartnerByDocument
    this.componentValidation = componentValidation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.componentValidation.validate(httpRequest.params)
    if (error) {
      return badRequest(new MissingField('id'))
    }
    const id = httpRequest.params.id
    const partner = await this.hasPartnerByDocument.findPartnerById(id)
    return Ok(partner)
  }
}
