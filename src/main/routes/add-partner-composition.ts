import { DbAddPartner } from '../../domain/data/usecases/db-add-partner'
import { PartnerRepository } from '../../domain/infra/partner-repository'
import { AddPartnerController } from '../../presentation/controllers/add-partner-controller'
import { Controller } from '../../presentation/controllers/controller'

export const addPartnerControllerComposition = (): Controller => {
  const repo = new PartnerRepository()
  const dbPartner = new DbAddPartner(repo)
  return new AddPartnerController(dbPartner)
}
