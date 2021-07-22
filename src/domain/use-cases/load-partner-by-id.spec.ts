import { LoadPartnerByIdRepository } from '../data/db-interfaces/load-partner-by-id-repository'
import { PartnerModel } from '../models/partner-model'
import { LoadPartnerByIdUseCase } from './load-partner-by-id'

export interface TypesSut {
  loadPartnerByIdUseCase: LoadPartnerByIdUseCase
  loadPartnerByIdRepository: LoadPartnerByIdRepository
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

const makeLoadPartnerByIdRepositoryStub = (): LoadPartnerByIdRepository => {
  class LoadPartnerByIdRepositoryStub implements LoadPartnerByIdRepository {
    async loadPartnerById(id: string): Promise<PartnerModel> {
      return Promise.resolve(partnerResponse)
    }
  }
  return new LoadPartnerByIdRepositoryStub()
}

export const makeDbPartnerSut = (): TypesSut => {
  const loadPartnerByIdRepositoryStub = makeLoadPartnerByIdRepositoryStub()
  const loadPartnerByIdUseCase = new LoadPartnerByIdUseCase(loadPartnerByIdRepositoryStub)

  return {
    loadPartnerByIdUseCase: loadPartnerByIdUseCase,
    loadPartnerByIdRepository: loadPartnerByIdRepositoryStub
  }
}

describe('LoadPartnerByIdUseCase', () => {
  const partnerId = '123456'
  test('Should return partner with success', async () => {
    const { loadPartnerByIdUseCase } = makeDbPartnerSut()

    const result = await loadPartnerByIdUseCase.loadPartnerById(partnerId)

    expect(result).toStrictEqual(
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
    )
  })

  test('Should return null when loadPartnerByIdRepository returns null', async () => {
    const { loadPartnerByIdUseCase, loadPartnerByIdRepository } = makeDbPartnerSut()

    jest.spyOn(loadPartnerByIdRepository, 'loadPartnerById').mockResolvedValueOnce(null)
    const result = await loadPartnerByIdUseCase.loadPartnerById(partnerId)

    expect(result).toBeFalsy()
  })

  test('Should throw error when loadPartnerByIdRepository throw error', async () => {
    const { loadPartnerByIdUseCase, loadPartnerByIdRepository } = makeDbPartnerSut()

    jest.spyOn(loadPartnerByIdRepository, 'loadPartnerById').mockRejectedValueOnce(new Error())
    const result = loadPartnerByIdUseCase.loadPartnerById(partnerId)

    await expect(result).rejects.toThrow()
  })
})
