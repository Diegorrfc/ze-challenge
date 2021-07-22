import { AddPartnerRepository } from '../data/db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../data/db-interfaces/has-partner-by-document-repository'
import { PartnerModel } from '../models/partner-model'
import { AddPartnerUseCase } from './add-partner'
import { AddPartnerModel } from './add-partner-model'

interface TypesSut {
  addPartnerUseCase: AddPartnerUseCase
  addPartnerRepository: AddPartnerRepository
  hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
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

export const partnerToAdd =
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
      return Promise.resolve(partnerResponse)
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

export const makeAddPartnerUseCaseSut = (): TypesSut => {
  const addPartnerRepository = makeAddPartnerRepositoryStub()
  const hasPartnerByDocumentRepositoryStub = makeHasPartnerByDocumentRepositoryStub()
  const addPartnerUseCase = new AddPartnerUseCase(addPartnerRepository, hasPartnerByDocumentRepositoryStub)

  return {
    addPartnerUseCase: addPartnerUseCase,
    addPartnerRepository: addPartnerRepository,
    hasPartnerByDocumentRepository: hasPartnerByDocumentRepositoryStub
  }
}

describe('AddPartnerUseCase', () => {
  describe('Add partner', () => {
    test('Should call MongoRespository add with correct values', async () => {
      const { addPartnerUseCase, addPartnerRepository } = makeAddPartnerUseCaseSut()
      const spyMongoRespositoryAdapter = jest.spyOn(addPartnerRepository, 'add')

      await addPartnerUseCase.add(partnerToAdd)

      expect(spyMongoRespositoryAdapter).toHaveBeenCalledWith(partnerToAdd)
    })

    test('Should call return partner with success', async () => {
      const { addPartnerUseCase } = makeAddPartnerUseCaseSut()

      const partner = await addPartnerUseCase.add(partnerToAdd)

      expect(partner).toStrictEqual(partnerResponse)
    })

    test('Should throws error when add partner throws error', async () => {
      const { addPartnerUseCase, addPartnerRepository } = makeAddPartnerUseCaseSut()
      jest.spyOn(addPartnerRepository, 'add').mockRejectedValueOnce(new Error('any_error'))

      const partner = addPartnerUseCase.add(partnerToAdd)
      await expect(partner).rejects.toThrow()
    })
  })

  describe('hasPartnerByDocument', () => {
    const documentNumber = '123456'
    test('Should return true when hasPartnerByDocument returns true', async () => {
      const { addPartnerUseCase } = makeAddPartnerUseCaseSut()

      const result = await addPartnerUseCase.hasPartnerByDocument(documentNumber)

      expect(result).toBeTruthy()
    })

    test('Should return false when hasPartnerByDocument returns false', async () => {
      const { addPartnerUseCase, hasPartnerByDocumentRepository } = makeAddPartnerUseCaseSut()

      jest.spyOn(hasPartnerByDocumentRepository, 'hasPartnerByDocument').mockResolvedValueOnce(false)
      const result = await addPartnerUseCase.hasPartnerByDocument(documentNumber)

      expect(result).toBeFalsy()
    })

    test('Should throw error when hasPartnerByDocument throw error', async () => {
      const { addPartnerUseCase, hasPartnerByDocumentRepository } = makeAddPartnerUseCaseSut()

      jest.spyOn(hasPartnerByDocumentRepository, 'hasPartnerByDocument').mockRejectedValueOnce(new Error())
      const result = addPartnerUseCase.hasPartnerByDocument(documentNumber)

      await expect(result).rejects.toThrow()
    })
  })
})
