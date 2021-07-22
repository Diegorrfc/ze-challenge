import { PartnerModel } from '../../models/partner-model'
import { AddPartner } from '../../use-cases/add-partner'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { FindPartnerById } from '../../use-cases/find-partner-by-id'
import { HasPartnerByDocument } from '../../use-cases/has-partner-by-document'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { FindPartnerByIdRepository } from '../db-interfaces/find-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'

export class DbPartner implements AddPartner, HasPartnerByDocument, FindPartnerById {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
  private readonly findPartnerByIdRepository: FindPartnerByIdRepository

  constructor(
    addPartnerRepository: AddPartnerRepository,
    hasPartnerByDocumentRepository: HasPartnerByDocumentRepository,
    findPartnerByIdRepository: FindPartnerByIdRepository)
  {
    this.addPartnerRepository = addPartnerRepository
    this.hasPartnerByDocumentRepository = hasPartnerByDocumentRepository
    this.findPartnerByIdRepository = findPartnerByIdRepository
  }

  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    return this.addPartnerRepository.add(partnerModel)
  }

  async hasPartnerByDocument(documentNumber: string): Promise<boolean> {
    return this.hasPartnerByDocumentRepository.hasPartnerByDocument(documentNumber)
  }

  async findPartnerById(id: string): Promise<PartnerModel> {
    return this.findPartnerByIdRepository.findPartnerById(id)
  }
}
