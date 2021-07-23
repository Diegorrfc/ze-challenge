import { LoadPartnerByIdUseCase } from '../../../domain/use-cases/load-partner-by-id'
import { LogMongoRepository } from '../../../infra/log-repository'
import { PartnerRepository } from '../../../infra/partner-repository'
import { Controller } from '../../../presentation/controllers/controller'
import { LoadPartnerByIdController } from '../../../presentation/controllers/load-partner-by-id/load-partner-by-id-controller'
import { LogDecorator } from '../../log/log-decorator'
import { loadPartnerByIdValidationFactory } from './load-partner-by-id-validator.factory'

export const loadPartnerByIdControllerFactory = (): Controller => {
  const logRepository = new LogMongoRepository()
  const partnerRepository = new PartnerRepository()
  const loadPartnerByIdUseCase = new LoadPartnerByIdUseCase(partnerRepository)
  const validations = loadPartnerByIdValidationFactory()
  const loadPartnerByIdController = new LoadPartnerByIdController(loadPartnerByIdUseCase, validations)
  return new LogDecorator(loadPartnerByIdController, logRepository)
}
