import { PartnerModel } from '../../models/partner-model'
export interface AddPartnerRepository {
  add(partnerModel: PartnerModel): Promise<PartnerModel>
}
