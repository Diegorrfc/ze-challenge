import { PartnerModel } from '../../models/partner-model'

export interface FindPartnerByIdRepository {
  findPartnerById(id: string): Promise<PartnerModel>
}
