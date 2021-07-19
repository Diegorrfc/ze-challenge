import { PartnerModel } from '../../domain/models/partner-model'
import { AddPartnerModel } from '../../domain/use-cases/add-partner-model'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { DbAddPartner } from './db-add-partner'

const partnerToAdd =
{
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

const makeAddPartnerRepositoryStub = (): AddPartnerRepository => {
  class AddPartnerRepositoryStub implements AddPartnerRepository {
    async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
      return Promise.resolve({
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
      })
    }
  }
  return new AddPartnerRepositoryStub()
}

describe('Db Add Partner Db', () => {
  test('Should call MongoRespository add with correct values', async () => {
    const mongoRespositoryAdapter = makeAddPartnerRepositoryStub()
    const spyMongoRespositoryAdapter = jest.spyOn(mongoRespositoryAdapter, 'add')
    const dbRepository = new DbAddPartner(mongoRespositoryAdapter)
    await dbRepository.add(partnerToAdd)
    expect(spyMongoRespositoryAdapter).toHaveBeenCalledWith(partnerToAdd)
  })

  test('Should call return partner with success', async () => {
    const mongoRespositoryAdapter = makeAddPartnerRepositoryStub()
    const dbRepository = new DbAddPartner(mongoRespositoryAdapter)
    const partner = await dbRepository.add(partnerToAdd)
    expect(partner).toStrictEqual({
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
    })
  })

  test('Should throws error when add partner throws error', async () => {
    const mongoRespositoryAdapter = makeAddPartnerRepositoryStub()
    jest.spyOn(mongoRespositoryAdapter, 'add').mockRejectedValueOnce(new Error('any_error'))
    const dbRepository = new DbAddPartner(mongoRespositoryAdapter)
    const partner = dbRepository.add(partnerToAdd)
    await expect(partner).rejects.toThrow()
  })
})
