import { DbPartner } from '../../../domain/data/usecases/db-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { Controller } from '../../../presentation/controllers/controller'
import { FindPartnerByIdController } from '../../../presentation/controllers/find-partner-by-id/find-partner-by-id-controller'

export const findPartnerByIdControllerFactory = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const dbPartner = new DbPartner(partnerRepository, partnerRepository, partnerRepository)
  return new FindPartnerByIdController(dbPartner)
}
