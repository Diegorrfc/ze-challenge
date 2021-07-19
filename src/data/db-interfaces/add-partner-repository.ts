import { PartnerModel } from '../../domain/models/partner-model'
import { AddPartnerModel } from '../../domain/use-cases/add-partner-model'

export interface AddPartnerRepository {
  add(partnerModel: AddPartnerModel): Promise<PartnerModel>
}
