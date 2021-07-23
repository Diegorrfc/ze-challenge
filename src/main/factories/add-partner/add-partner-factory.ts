import { AddPartnerUseCase } from '../../../domain/use-cases/add-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { AddPartnerController } from '../../../presentation/controllers/add-partner/add-partner-controller'
import { Controller } from '../../../presentation/controllers/controller'
import { LogDecorator } from '../../log/log-decorator'
import { addPartnerValidationFactory } from './add-partner-validator-factory'
import { LogMongoRepository } from '../../../infra/log-repository'

export const addPartnerControllerFactory = (): Controller => {
  const logRepository = new LogMongoRepository()
  const partnerRepository = new PartnerRepository()
  const addPartnerUseCase = new AddPartnerUseCase(partnerRepository, partnerRepository)
  const validations = addPartnerValidationFactory()
  const addPartnerController = new AddPartnerController(addPartnerUseCase, validations)
  return new LogDecorator(addPartnerController, logRepository)
}
