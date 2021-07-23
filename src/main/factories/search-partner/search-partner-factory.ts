import { SearchPartnerUseCase } from '../../../domain/use-cases/search-partner'
import { LogMongoRepository } from '../../../infra/log-repository'
import { PartnerRepository } from '../../../infra/partner-repository'
import { Controller } from '../../../presentation/controllers/controller'
import { SearchPartnerController } from '../../../presentation/controllers/search-partner/search-partner-controller'
import { LogDecorator } from '../../log/log-decorator'
import { searchPartneValidationFactory } from './search-partner-validator.factory'

export const searchPartnerControllerFactory = (): Controller => {
  const logRepository = new LogMongoRepository()
  const partnerRepository = new PartnerRepository()
  const addPartnerUseCase = new SearchPartnerUseCase(partnerRepository)
  const validations = searchPartneValidationFactory()
  const searchPartnerController = new SearchPartnerController(addPartnerUseCase, validations)
  return new LogDecorator(searchPartnerController, logRepository)
}
