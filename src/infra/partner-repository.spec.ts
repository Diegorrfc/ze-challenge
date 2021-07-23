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

  describe('Add partner', () => {
    test('Should call mongo with correct values', async () => {
      const partnerRepository = new PartnerRepository()
      const partner = await partnerRepository.add({
        id: 'id_unique',
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
      expect(partner).toStrictEqual(partner)
    })

    test('Should return true when partner exist', async () => {
      const partnerRepository = new PartnerRepository()
      await partnerRepository.add({
        id: 'id_unique',
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
  })

  describe('Load Partner By Id', () => {
    test('Should return false when not exist partner with document 1432132123891/0001', async () => {
      const partnerRepository = new PartnerRepository()
      const hasAlready = await partnerRepository.hasPartnerByDocument('1432132123891/0001')
      expect(hasAlready).toBeFalsy()
    })

    test('Should return false when not exist partner with id', async () => {
      const partnerRepository = new PartnerRepository()
      const hasAlready = await partnerRepository.loadPartnerById('60f86c26796bab0562182d9e')
      expect(hasAlready).toBeFalsy()
    })

    test('Should return partner when partner id exist', async () => {
      const partnerRepository = new PartnerRepository()
      const partner = await partnerRepository.add({
        id: 'id_unique',
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
      const hasAlready = await partnerRepository.loadPartnerById(partner.id)
      expect(hasAlready).toBeTruthy()
    })
  })

  describe('Search Partner', () => {
    test('Should call find with correct values', async () => {
      const longitude = 30
      const latitude = 20
      const partnerRepository = new PartnerRepository()
      const spyFind = jest.spyOn(PartnerSchemaModel, 'find')
      await partnerRepository.searchPartner(30, 20)
      expect(spyFind).toHaveBeenCalledWith({
        $and: [{
          address:
          {
            $near:
            {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              }
            }
          }
        }, {
          coverageArea:
          {
            $geoIntersects:
            {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              }
            }
          }
        }]
      })
    })

    test('Should return value when found partner', async () => {
      const findReturn = {
        _id: 'id_unique',
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
      jest.mock('./mongodb/helpers/partner-schema', () => ({
        find: () => findReturn
      }))
    })
  })
})
