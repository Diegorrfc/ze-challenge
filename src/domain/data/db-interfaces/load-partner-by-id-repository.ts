import { PartnerModel } from '../../models/partner-model'

export interface LoadPartnerByIdRepository {
  loadPartnerById(id: string): Promise<PartnerModel>
}
