import { PartnerModel } from '../../models/partner-model'
import { AddPartner } from '../../use-cases/interfaces/add-partner-interface'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
import { LoadPartnerById } from '../../use-cases/interfaces/load-partner-by-id-interface'
import { HasPartnerByDocument } from '../../use-cases/has-partner-by-document'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'
import { LoadPartnerByIdRepository } from '../db-interfaces/load-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../db-interfaces/has-partner-by-document-repository'
import { SearchPartner } from '../../use-cases/interfaces/search-partner-interface'
import { SearchPartnerRepository } from '../db-interfaces/search-partner-repository'

export class DbPartner implements AddPartner, HasPartnerByDocument, LoadPartnerById, SearchPartner {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository
  private readonly loadPartnerByIdRepository: LoadPartnerByIdRepository
  private readonly searchPartnerRepository: SearchPartnerRepository

  constructor(
    addPartnerRepository: AddPartnerRepository,
    hasPartnerByDocumentRepository: HasPartnerByDocumentRepository,
    loadPartnerByIdRepository: LoadPartnerByIdRepository,
    searchPartnerRepository: SearchPartnerRepository)
  {
    this.addPartnerRepository = addPartnerRepository
    this.hasPartnerByDocumentRepository = hasPartnerByDocumentRepository
    this.loadPartnerByIdRepository = loadPartnerByIdRepository
    this.searchPartnerRepository = searchPartnerRepository
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

  async searchPartner(longitude: number, latitude: number): Promise<PartnerModel[]> {
    return this.searchPartnerRepository.searchPartner(longitude, latitude)
  }
}
