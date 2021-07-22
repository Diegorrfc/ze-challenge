import { PartnerModel } from '../../models/partner-model'
import { AddPartner } from '../../use-cases/add-partner'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { LoadPartnerById } from '../../use-cases/load-partner-by-id'
import { HasPartnerByDocument } from '../../use-cases/has-partner-by-document'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { LoadPartnerByIdRepository } from '../db-interfaces/load-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'

export class DbPartner implements AddPartner, HasPartnerByDocument, LoadPartnerById {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
  private readonly loadPartnerByIdRepository: LoadPartnerByIdRepository

  constructor(
    addPartnerRepository: AddPartnerRepository,
    hasPartnerByDocumentRepository: HasPartnerByDocumentRepository,
    loadPartnerByIdRepository: LoadPartnerByIdRepository)
  {
    this.addPartnerRepository = addPartnerRepository
    this.hasPartnerByDocumentRepository = hasPartnerByDocumentRepository
    this.loadPartnerByIdRepository = loadPartnerByIdRepository
  }

  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    return this.addPartnerRepository.add(partnerModel)
  }

  async hasPartnerByDocument(documentNumber: string): Promise<boolean> {
    return this.hasPartnerByDocumentRepository.hasPartnerByDocument(documentNumber)
  }

  async loadPartnerById(id: string): Promise<PartnerModel> {
    return this.loadPartnerByIdRepository.loadPartnerById(id)
  }
}
