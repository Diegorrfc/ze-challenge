import { PartnerModel } from '../models/partner-model'

export interface LoadPartnerById {
  loadPartnerById(id: string): Promise<PartnerModel>
}
