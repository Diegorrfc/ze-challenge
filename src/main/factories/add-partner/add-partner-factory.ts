import { AddPartnerUseCase } from '../../../domain/use-cases/add-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { AddPartnerController } from '../../../presentation/controllers/add-partner/add-partner-controller'
import { Controller } from '../../../presentation/controllers/controller'
import { addPartnerValidationFactory } from './add-partner-validator-factory'

export const addPartnerControllerFactory = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const addPartnerUseCase = new AddPartnerUseCase(partnerRepository, partnerRepository)
  const validations = addPartnerValidationFactory()
  return new AddPartnerController(addPartnerUseCase, validations)
}
