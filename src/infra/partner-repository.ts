import { AddPartnerRepository } from '../domain/data/db-interfaces/add-partner-repository'
import { LoadPartnerByIdRepository } from '../domain/data/db-interfaces/load-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../domain/data/db-interfaces/has-partner-by-document-repository'
import { SearchPartnerRepository } from '../domain/data/db-interfaces/search-partner-repository'
import { PartnerModel } from '../domain/models/partner-model'
import { AddPartnerModel } from '../domain/use-cases/add-partner-model'
import PartnerSchemaModel from './mongodb/helpers/partner-schema'

export class PartnerRepository implements AddPartnerRepository, HasPartnerByDocumentRepository, LoadPartnerByIdRepository, SearchPartnerRepository {
  async add(partnerModel: AddPartnerModel): Promise<PartnerModel> {
    const validPartner = new PartnerSchemaModel(partnerModel)
    const partner = await validPartner.save()

    return {
      id: partner.id,
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
    return PartnerSchemaModel.exists({ document: documentNumber })
  }

  async loadPartnerById(id: string): Promise<PartnerModel> {
    const partner = await PartnerSchemaModel.findById(id).lean<any>().exec()

    if (!partner) {
      return null
    }

    return {
      id: partner._id,
      tradingName: partner.tradingName,
      ownerName: partner.ownerName,
      document: partner.document,
      coverageArea: {
        type: partner.coverageArea.type,
        coordinates: partner.coverageArea.coordinates
      },
      address: {
        type: partner.address.type,
        coordinates: partner.address.coordinates
      }
    }
  }

  async searchPartner(longitude: number, latitude: number): Promise<PartnerModel[]> {
    const connecticut = await PartnerSchemaModel.find({
      address:
      {
        $near:
        {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        }
      }
    }).lean().exec()
    console.log('inic connecticut')
    console.log(connecticut)
    console.log('inic connecticut')
    return Promise.resolve(null)
  }
}
