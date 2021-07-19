import { PartnerModel } from '../../domain/models/partner-model'
import { AddPartner } from '../../domain/use-cases/add-partner'
import { AddPartnerModel } from '../../domain/use-cases/add-partner-model'
import { AddPartnerRepository } from '../db-interfaces/add-partner-repository'

export class DbAddPartner implements AddPartner {
  private readonly addPartnerRepository: AddPartnerRepository
  constructor(addPartnerRepository: AddPartnerRepository) {
    this.addPartnerRepository = addPartnerRepository
  }

  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    return this.addPartnerRepository.add(partnerModel)
  }
}
