import { AddPartnerRepository } from '../data/db-interfaces/add-partner-repository'
import { PartnerModel } from '../domain/models/partner-model'
import { AddPartnerModel } from '../domain/use-cases/add-partner-model'
import { MongoHelper } from './mongodb/helpers/mongo-helper'

export class PartnerRepository implements AddPartnerRepository {
  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    const accountCollection = await MongoHelper.getCollection('partners')
    const accountResult = await accountCollection.insertOne(partnerModel)
    const partnerId = accountResult.insertedId.toHexString()
    return {
      id: partnerId,
      tradingName: partnerModel.tradingName,
      ownerName: partnerModel.ownerName,
      document: partnerModel.document,
      coverageArea: {
        type: partnerModel.coverageArea.type,
        coordinates: partnerModel.coverageArea.coordinates
      },
      address: {
        type: partnerModel.address.type,
        coordinates: partnerModel.address.coordinates
      }
    }
  }
}
