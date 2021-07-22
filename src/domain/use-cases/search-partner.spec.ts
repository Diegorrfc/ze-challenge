import { SearchPartnerRepository } from '../data/db-interfaces/search-partner-repository'
import { PartnerModel } from '../models/partner-model'
import { SearchPartnerUseCase } from './search-partner'

export interface TypesSut {
  searchPartnerUseCase: SearchPartnerUseCase
  searchPartnerRepository: SearchPartnerRepository
}

const partnerResponse =
{
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

const makeSearchPartner = (): SearchPartnerRepository => {
  class SearchPartnerStub implements SearchPartnerRepository {
    async searchPartner(longitude: number, latitude: number): Promise<PartnerModel[]> {
      return Promise.resolve(
        [partnerResponse, partnerResponse]
      )
    }
  }
  return new SearchPartnerStub()
}

export const makeDbPartnerSut = (): TypesSut => {
  const searchPartnerStub = makeSearchPartner()
  const searchPartnerUseCase = new SearchPartnerUseCase(searchPartnerStub)

  return {
    searchPartnerUseCase: searchPartnerUseCase,
    searchPartnerRepository: searchPartnerStub
  }
}

describe('SearchPartnerUseCase', () => {
  const coordinates = {
    longitude: 70,
    latitude: 180
  }
  test('Should return partners with success', async () => {
    const partner = {
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
    const { searchPartnerUseCase } = makeDbPartnerSut()

    const result = await searchPartnerUseCase.searchPartner(coordinates.longitude, coordinates.latitude)

    expect(result).toStrictEqual([partner, partner])
  })

  test('Should return empty partner', async () => {
    const { searchPartnerUseCase, searchPartnerRepository } = makeDbPartnerSut()
    jest.spyOn(searchPartnerRepository, 'searchPartner').mockResolvedValueOnce([])
    const result = await searchPartnerUseCase.searchPartner(coordinates.longitude, coordinates.latitude)

    expect(result).toStrictEqual([])
  })

  test('Should throw error when searchPartner throw error', async () => {
    const { searchPartnerUseCase, searchPartnerRepository } = makeDbPartnerSut()

    jest.spyOn(searchPartnerRepository, 'searchPartner').mockRejectedValueOnce(new Error())
    const result = searchPartnerUseCase.searchPartner(coordinates.longitude, coordinates.latitude)

    await expect(result).rejects.toThrow()
  })
})
