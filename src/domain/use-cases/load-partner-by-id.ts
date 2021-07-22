import { LoadPartnerByIdRepository } from '../data/db-interfaces/load-partner-by-id-repository'
import { PartnerModel } from '../models/partner-model'
import { LoadPartnerById } from './interfaces/load-partner-by-id-interface'

export class LoadPartnerByIdUseCase implements LoadPartnerById {
  private readonly loadPartnerByIdRepository: LoadPartnerByIdRepository

  constructor(loadPartnerByIdRepository: LoadPartnerByIdRepository) {
    this.loadPartnerByIdRepository = loadPartnerByIdRepository
  }

  async loadPartnerById(id: string): Promise<PartnerModel> {
    return this.loadPartnerByIdRepository.loadPartnerById(id)
  }
}
