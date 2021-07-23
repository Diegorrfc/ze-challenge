import { SearchPartnerRepository } from '../data/db-interfaces/search-partner-repository'
import { PartnerModel } from '../models/partner-model'
import { SearchPartner } from './interfaces/search-partner-interface'

export class SearchPartnerUseCase implements SearchPartner {
  private readonly searchPartnerRepository: SearchPartnerRepository

  constructor(searchPartnerRepository: SearchPartnerRepository) {
    this.searchPartnerRepository = searchPartnerRepository
  }

  async searchPartner(longitude: number, latitude: number): Promise<PartnerModel> {
    return this.searchPartnerRepository.searchPartner(longitude, latitude)
  }
}
