import { DbPartner } from '../../../domain/data/usecases/db-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { AddPartnerController } from '../../../presentation/controllers/add-partner/add-partner-controller'
import { Controller } from '../../../presentation/controllers/controller'
import { addPartnerValidationFactory } from './add-partner-validator-factory'

export const addPartnerControllerFactory = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const dbPartner = new DbPartner(partnerRepository, partnerRepository, partnerRepository)
  const validations = addPartnerValidationFactory()
  return new AddPartnerController(dbPartner, validations, dbPartner)
}
