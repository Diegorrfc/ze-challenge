import { PartnerModel } from '../../../domain/models/partner-model'
import { SearchPartner } from '../../../domain/use-cases/interfaces/search-partner-interface'
import { MissingField } from '../helpers/errors'
import { ServerError } from '../helpers/errors/server-error'
import { HttpRequest } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'
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
    async searchPartner(longitude: number, latitude: number): Promise<PartnerModel[]> {
      return Promise.resolve([partnerObject, partnerObject])
    }
  }
  return new SearchPartnerStub()
}

describe('Search Partner controller', () => {
  test('Should return badRequest if no longitude params is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { latitude: 20 }
    }
    const loadById = new SearchPartnerController(makeSearchPartnerStub())

    const result = await loadById.handle(httpRequest)

    expect(result).toStrictEqual(badRequest(new MissingField('longitude')))
  })

  test('Should return badRequest if no latitude params is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { longitude: 30 }
    }
    const loadById = new SearchPartnerController(makeSearchPartnerStub())

    const result = await loadById.handle(httpRequest)

    expect(result).toStrictEqual(badRequest(new MissingField('latitude')))
  })

  test('Should return 200 if all data is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { latitude: 20, longitude: 30 }
    }
    const search = new SearchPartnerController(makeSearchPartnerStub())
    const result = await search.handle(httpRequest)
    expect(result).toStrictEqual(Ok([partnerObject, partnerObject]))
  })

  test('Should returns server error when search partner throws any error', async () => {
    const httpRequest: HttpRequest = {
      params: { latitude: 20, longitude: 30 }
    }
    const searchStub = makeSearchPartnerStub()
    jest.spyOn(searchStub, 'searchPartner').mockRejectedValueOnce(new Error('any_error'))
    const search = new SearchPartnerController(searchStub)

    const searchPartnerResult = await search.handle(httpRequest)
    expect(searchPartnerResult).toStrictEqual({ statusCode: 500, body: new ServerError() })
  })
})
