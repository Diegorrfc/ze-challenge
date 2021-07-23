import { SearchPartnerUseCase } from '../../../domain/use-cases/search-partner'
import { PartnerRepository } from '../../../infra/partner-repository'
import { Controller } from '../../../presentation/controllers/controller'
import { SearchPartnerController } from '../../../presentation/controllers/search-partner/search-partner-controller'

export const searchPartnerControllerFactory = (): Controller => {
  const partnerRepository = new PartnerRepository()
  const addPartnerUseCase = new SearchPartnerUseCase(partnerRepository)
  return new SearchPartnerController(addPartnerUseCase)
}
