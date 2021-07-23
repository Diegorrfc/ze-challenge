import { PartnerModel } from '../../../domain/models/partner-model'
import { SearchPartner } from '../../../domain/use-cases/interfaces/search-partner-interface'
import { ServerError } from '../helpers/errors/server-error'
import { HttpRequest } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'
import { SearchPartnerController } from './search-partner-controller'

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

const makeSearchPartnerStub = (): SearchPartner => {
  class SearchPartnerStub implements SearchPartner {
    async searchPartner(longitude: number, latitude: number): Promise<PartnerModel> {
      return Promise.resolve(partnerObject)
    }
  }
  return new SearchPartnerStub()
}

const makeComponentValidationStub = (): ComponentValidation => {
  class ComponentValidationStub implements ComponentValidation {
    validate(request: any): Error {
      return undefined
    }
  }
  return new ComponentValidationStub()
}

describe('Search Partner controller', () => {
  test('Should return error when composite validator returns error', async () => {
    const httpRequest: HttpRequest = {
      query: { latitude: 20, longitude: 30 }
    }
    const validationComposite = makeComponentValidationStub()
    jest.spyOn(validationComposite, 'validate').mockReturnValue(new Error())
    const search = new SearchPartnerController(makeSearchPartnerStub(), validationComposite)
    const result = await search.handle(httpRequest)
    expect(result).toStrictEqual(badRequest(new Error()))
  })

  test('Should return 200 if all data is provided', async () => {
    const httpRequest: HttpRequest = {
      query: { latitude: 20, longitude: 30 }
    }
    const search = new SearchPartnerController(makeSearchPartnerStub(), makeComponentValidationStub())
    const result = await search.handle(httpRequest)
    expect(result).toStrictEqual(Ok(partnerObject))
  })

  test('Should returns server error when search partner throws any error', async () => {
    const httpRequest: HttpRequest = {
      query: { latitude: 20, longitude: 30 }
    }
    const searchStub = makeSearchPartnerStub()
    jest.spyOn(searchStub, 'searchPartner').mockRejectedValueOnce(new Error('any_error'))
    const search = new SearchPartnerController(searchStub, makeComponentValidationStub())

    const error = new Error('any_error')
    error.stack = 'error SearchPartnerController'
    const searchPartnerResult = await search.handle(httpRequest)
    expect(searchPartnerResult).toStrictEqual({ statusCode: 500, body: new ServerError(error.stack) })
  })

  test('Should returns notfound when search partner returns undefined', async () => {
    const httpRequest: HttpRequest = {
      query: { latitude: 20, longitude: 30 }
    }
    const searchStub = makeSearchPartnerStub()
    jest.spyOn(searchStub, 'searchPartner').mockResolvedValue(undefined)
    const search = new SearchPartnerController(searchStub, makeComponentValidationStub())

    const searchPartnerResult = await search.handle(httpRequest)
    expect(searchPartnerResult).toStrictEqual({ statusCode: 404 })
  })
})
