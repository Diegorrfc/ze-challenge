import { PartnerModel } from '../../models/partner-model'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'
import { DbPartner } from './db-partner'

interface TypesSut {
  dbPartner: DbPartner
  addPartnerRepository: AddPartnerRepository
  hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
}

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

const makeHasPartnerByDocumentRepositoryStub = (): HasPartnerByDocumentRepository => {
  class HasPartnerByDocumentRepositoryStub implements HasPartnerByDocumentRepository {
    async hasPartnerByDocument(documentNumber: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HasPartnerByDocumentRepositoryStub()
}

const makeDbPartnerSut = (): TypesSut => {
  const addPartnerRepository = makeAddPartnerRepositoryStub()
  const hasPartnerByDocumentRepositoryStub = makeHasPartnerByDocumentRepositoryStub()
  const db = new DbPartner(addPartnerRepository, hasPartnerByDocumentRepositoryStub)

  return {
    dbPartner: db,
    addPartnerRepository: addPartnerRepository,
    hasPartnerByDocumentRepository: hasPartnerByDocumentRepositoryStub
  }
}

describe('Db Add Partner Db', () => {
  test('Should call MongoRespository add with correct values', async () => {
    const { dbPartner, addPartnerRepository } = makeDbPartnerSut()
    const spyMongoRespositoryAdapter = jest.spyOn(addPartnerRepository, 'add')

    await dbPartner.add(partnerToAdd)

    expect(spyMongoRespositoryAdapter).toHaveBeenCalledWith(partnerToAdd)
  })

  test('Should call return partner with success', async () => {
    const { dbPartner } = makeDbPartnerSut()

    const partner = await dbPartner.add(partnerToAdd)

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
    const { dbPartner, addPartnerRepository } = makeDbPartnerSut()
    jest.spyOn(addPartnerRepository, 'add').mockRejectedValueOnce(new Error('any_error'))

    const partner = dbPartner.add(partnerToAdd)
    await expect(partner).rejects.toThrow()
  })
})
