import { PartnerModel } from '../../models/partner-model'

export interface SearchPartnerRepository {
  searchPartner(longitude: number, latitude: number): Promise<PartnerModel[]>
}
