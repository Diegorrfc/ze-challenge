import { PartnerModel } from '../../models/partner-model'
import { AddPartnerModel } from '../add-partner-model'

export interface AddPartner {
  add(partnerModel: AddPartnerModel): Promise<PartnerModel>
}
