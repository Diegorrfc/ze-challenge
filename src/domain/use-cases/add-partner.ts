import { PartnerAlreadyExists } from '../../presentation/controllers/helpers/errors/partner-already-exists'
import { AddPartnerRepository } from '../data/db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../data/db-interfaces/has-partner-by-document-repository'
import { PartnerModel } from '../models/partner-model'
import { AddPartnerModel } from './add-partner-model'
import { AddPartner } from './interfaces/add-partner-interface'

export class AddPartnerUseCase implements AddPartner {
  private readonly addPartnerRepository: AddPartnerRepository
  private readonly hasPartnerByDocumentRepository: HasPartnerByDocumentRepository

  constructor(addPartnerRepository: AddPartnerRepository, hasPartnerByDocumentRepository: HasPartnerByDocumentRepository) {
    this.addPartnerRepository = addPartnerRepository
    this.hasPartnerByDocumentRepository = hasPartnerByDocumentRepository
  }

  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    const hasPartner = await this.hasPartnerByDocumentRepository.hasPartnerByDocument(partnerModel.document)

    if (hasPartner) {
      throw new PartnerAlreadyExists()
    }

    const partnerWithIndex = AddPartnerUseCase.mapperAddPartnerModel(partnerModel)
    return this.addPartnerRepository.add(partnerWithIndex)
  }

  private static mapperAddPartnerModel(partnerModel: AddPartnerModel): PartnerModel {
    return {
      ...partnerModel
    }
  }
}
