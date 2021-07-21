import { PartnerModel } from '../../models/partner-model'
import { AddPartner } from '../../use-cases/add-partner'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { HasPartnerByDocument } from '../../use-cases/has-partner-by-document'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'

export class DbPartner implements AddPartner, HasPartnerByDocument {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository

  constructor(addPartnerRepository: AddPartnerRepository, hasPartnerByDocumentRepository: HasPartnerByDocumentRepository) {
    this.addPartnerRepository = addPartnerRepository
    this.hasPartnerByDocumentRepository = hasPartnerByDocumentRepository
  }

  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    return this.addPartnerRepository.add(partnerModel)
  }

  async hasPartnerByDocument(documentNumber: string): Promise<boolean> {
    return this.hasPartnerByDocumentRepository.hasPartnerByDocument(documentNumber)
  }
}
