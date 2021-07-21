import { DbAddPartner } from '../../domain/data/usecases/db-add-partner'
import { PartnerRepository } from '../../domain/infra/partner-repository'
import { AddPartnerController } from '../../presentation/controllers/add-partner-controller'
import { Controller } from '../../presentation/controllers/controller'
import { componentValidationFactory } from './composition-validator'

export const addPartnerControllerComposition = (): Controller => {
  const repo = new PartnerRepository()
  const dbPartner = new DbAddPartner(repo)
  const validations = componentValidationFactory()
  return new AddPartnerController(dbPartner, validations)
}
