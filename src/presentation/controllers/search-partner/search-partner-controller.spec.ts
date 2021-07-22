import { PartnerModel } from '../../../domain/models/partner-model'
import { SearchPartner } from '../../../domain/use-cases/search-partner'
import { MissingField } from '../helpers/errors'
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
  test('Should return badRequest if no params is provided', async () => {
    const httpRequest: HttpRequest = {}
    const loadById = new SearchPartnerController(makeSearchPartnerStub())

    const result = await loadById.handle(httpRequest)

    expect(result).toStrictEqual(badRequest(new MissingField('id')))
  })

  test('Should return 200 if all data is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { id: 'Partner' }
    }
    const loadById = new SearchPartnerController(makeSearchPartnerStub())
    const result = await loadById.handle(httpRequest)
    expect(result).toStrictEqual(Ok(partnerObject))
  })
})
