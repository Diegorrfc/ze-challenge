import { MongoHelper } from './mongodb/helpers/mongo-helper'
import { PartnerRepository } from './partner-repository'

describe('Partner Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should call mongo with correct values', async () => {
    const partnerRepository = new PartnerRepository()
    const partner = await partnerRepository.add({
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
    const { id, ...objwithoudId } = partner
    expect(partner).toBeTruthy()
    expect(id).toBeTruthy()
    expect(objwithoudId).toStrictEqual(
      {
        address:
        {
          coordinates: [-46.57421, -21.785741],
          type: 'Point'
        },
        coverageArea: {
          coordinates: [[[[30, 20], [45, 40], [10, 40], [30, 20]]], [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]],
          type: 'MultiPolygon'
        },
        document: '1432132123891/0001',
        ownerName: 'Zé da Silva',
        tradingName: 'Adega da Cerveja - Pinheiros'
      })
  })
})
