import { AddPartnerRepository } from '../domain/data/db-interfaces/add-partner-repository'
import { HasPartnerByDocumentRepository } from '../domain/data/db-interfaces/has-partner-by-document-repository'
import { PartnerModel } from '../domain/models/partner-model'
import { AddPartnerModel } from '../domain/use-cases/add-partner-model'
import { MongoHelper } from './mongodb/helpers/mongo-helper'

export class PartnerRepository implements AddPartnerRepository, HasPartnerByDocumentRepository {
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

  async hasPartnerByDocument(documentNumber: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('partners')
    const hasPartner = await accountCollection.findOne({ document: documentNumber })
    return !!hasPartner
  }
}
