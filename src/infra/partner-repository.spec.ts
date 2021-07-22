import mongoose from 'mongoose'
import { PartnerRepository } from './partner-repository'
import PartnerSchemaModel from './mongodb/helpers/partner-schema'

describe('Partner Repository', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true })
  })

  beforeEach(async () => {
    await PartnerSchemaModel.deleteMany({}).exec()
  })

  afterAll(async () => {
    await mongoose.disconnect()
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

  test('Should return true when partner exist', async () => {
    const partnerRepository = new PartnerRepository()
    await partnerRepository.add({
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
    const hasAlready = await partnerRepository.hasPartnerByDocument('1432132123891/0001')
    expect(hasAlready).toBeTruthy()
  })

  test('Should return false when not exist partner with document 1432132123891/0001', async () => {
    const partnerRepository = new PartnerRepository()
    const hasAlready = await partnerRepository.hasPartnerByDocument('1432132123891/0001')
    expect(hasAlready).toBeFalsy()
  })

  test('Should return false when not exist partner with id', async () => {
    const partnerRepository = new PartnerRepository()
    const hasAlready = await partnerRepository.findPartnerById('60f86c26796bab0562182d9e')
    expect(hasAlready).toBeFalsy()
  })

  test('Should return partner when partner id exist', async () => {
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
    const hasAlready = await partnerRepository.findPartnerById(partner.id)
    expect(hasAlready).toBeTruthy()
  })
})
