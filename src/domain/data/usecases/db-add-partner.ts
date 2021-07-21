import { PartnerModel } from '../../models/partner-model'
import { AddPartner } from '../../use-cases/add-partner'
import { AddPartnerModel } from '../../use-cases/add-partner-model'
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
