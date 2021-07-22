import { PartnerModel } from '../../models/partner-model'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { FindPartnerByIdRepository } from '../db-interfaces/find-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'
import { DbPartner } from './db-partner'

export interface TypesSut {
  dbPartner: DbPartner
  addPartnerRepository: AddPartnerRepository
  hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
  findPartnerByIdRepository: FindPartnerByIdRepository
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

const makeFindPartnerByIdRepositoryStub = (): FindPartnerByIdRepository => {
  class FindPartnerByIdRepositoryStub implements FindPartnerByIdRepository {
    async findPartnerById(id: string): Promise<PartnerModel> {
      return Promise.resolve(partnerResponse)
    }
  }
  return new FindPartnerByIdRepositoryStub()
}

export const makeDbPartnerSut = (): TypesSut => {
  const addPartnerRepository = makeAddPartnerRepositoryStub()
  const hasPartnerByDocumentRepositoryStub = makeHasPartnerByDocumentRepositoryStub()
  const findPartnerByIdRepositoryStub = makeFindPartnerByIdRepositoryStub()
  const db = new DbPartner(addPartnerRepository, hasPartnerByDocumentRepositoryStub, findPartnerByIdRepositoryStub)

  return {
    dbPartner: db,
    addPartnerRepository: addPartnerRepository,
    hasPartnerByDocumentRepository: hasPartnerByDocumentRepositoryStub,
    findPartnerByIdRepository: findPartnerByIdRepositoryStub
  }
}
