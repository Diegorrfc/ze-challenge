import { PartnerModel } from '../../models/partner-model'
import { AddPartnerModel } from '../../use-cases/add-partner-model'

export interface AddPartnerRepository {
  add(partnerModel: AddPartnerModel): Promise<PartnerModel>
}
