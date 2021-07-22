import { PartnerModel } from '../../../domain/models/partner-model'
import { FindPartnerById } from '../../../domain/use-cases/find-partner-by-id'
import { MissingField } from '../helpers/errors'
import { HttpRequest } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'
import { FindPartnerByIdController } from './find-partner-by-id-controller'

const partnerObject = {
  id: '1',
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741]
  }
}

const makeFindPartnerStub = (): FindPartnerById => {
  class FindPartnerStub implements FindPartnerById {
    async findPartnerById(id: string): Promise<PartnerModel> {
      return Promise.resolve(partnerObject)
    }
  }
  return new FindPartnerStub()
}

const makeComponentValidation = (): ComponentValidation => {
  class ComponentValidatorStub implements ComponentValidation {
    validate(request: any): Error {
      return null
    }
  }
  return new ComponentValidatorStub()
}

describe('Find Partner by id controller', () => {
  test('Should return badRequest if no params is provided', async () => {
    const httpRequest: HttpRequest = { }
    const validation = makeComponentValidation()
    jest.spyOn(validation, 'validate').mockReturnValue(new MissingField('id'))
    const findById = new FindPartnerByIdController(makeFindPartnerStub(), validation)

    const result = await findById.handle(httpRequest)

    expect(result).toStrictEqual(badRequest(new MissingField('id')))
  })

  test('Should return 200 if all data is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { id: 'Partner' }
    }
    const findById = new FindPartnerByIdController(makeFindPartnerStub(), makeComponentValidation())
    const result = await findById.handle(httpRequest)
    expect(result).toStrictEqual(Ok(partnerObject))
  })
})
