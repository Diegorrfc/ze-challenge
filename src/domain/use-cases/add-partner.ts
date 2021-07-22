import { AddPartnerRepository } from '../data/db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../data/db-interfaces/has-partner-by-document-repository'
import { PartnerModel } from '../models/partner-model'
import { AddPartnerModel } from './add-partner-model'
import { HasPartnerByDocument } from './has-partner-by-document'
import { AddPartner } from './interfaces/add-partner-interface'

export class AddPartnerUseCase implements AddPartner, HasPartnerByDocument {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository

  constructor(addPartnerRepository: AddPartnerRepository, hasPartnerByDocumentRepository: HasPartnerByDocumentRepository)
  {
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
