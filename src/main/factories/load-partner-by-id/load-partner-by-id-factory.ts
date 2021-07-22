import { DbPartner } from '../../../domain/data/usecases/db-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { Controller } from '../../../presentation/controllers/controller'
import { LoadPartnerByIdController } from '../../../presentation/controllers/load-partner-by-id/load-partner-by-id-controller'
import { loadPartnerByIdValidationFactory } from './load-partner-by-id-validator.factory'

export const loadPartnerByIdControllerFactory = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const dbPartner = new DbPartner(partnerRepository, partnerRepository, partnerRepository)
  const validations = loadPartnerByIdValidationFactory()
  return new LoadPartnerByIdController(dbPartner, validations)
}
