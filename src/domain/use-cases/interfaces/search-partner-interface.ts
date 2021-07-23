import { PartnerModel } from '../../models/partner-model'

export interface SearchPartner {
  searchPartner(longitude: number, latitude: number): Promise<PartnerModel>
}
