import { DbPartner } from '../../../domain/data/usecases/db-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { AddPartnerController } from '../../../presentation/controllers/add-partner/add-partner-controller'
import { Controller } from '../../../presentation/controllers/controller'
import { componentValidationFactory } from './composition-validator'

export const addPartnerControllerComposition = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const dbPartner = new DbPartner(partnerRepository, partnerRepository)
  const validations = componentValidationFactory()
  return new AddPartnerController(dbPartner, validations, dbPartner)
}
