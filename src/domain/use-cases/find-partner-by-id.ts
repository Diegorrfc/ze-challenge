import { PartnerModel } from '../models/partner-model'

export interface FindPartnerById {
  findPartnerById(id: string): Promise<PartnerModel>
}
