import { AddPartnerRepository } from '../domain/data/db-interfaces/add-partner-repository'
import { FindPartnerByIdRepository } from '../domain/data/db-interfaces/find-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../domain/data/db-interfaces/has-partner-by-document-repository'
import { PartnerModel } from '../domain/models/partner-model'
import { AddPartnerModel } from '../domain/use-cases/add-partner-model'
import PartnerSchemaModel from './mongodb/helpers/partner-schema'

export class PartnerRepository implements AddPartnerRepository, HasPartnerByDocumentRepository, FindPartnerByIdRepository {
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

  async findPartnerById(id: string): Promise<PartnerModel> {
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

  // async findNearPartnerByCoordinate(longitude: string, latitude: string): Promise<Array<PartnerModel>> {
  //   const connecticut = await PartnerSchemaModel.find({
  //     coverageArea:
  //     {
  //       $geoWithin:
  //       {
  //         $geometry: {
  //           type: 'Point',
  //           coordinates: [longitude, latitude]
  //         }
  //       }
  //     }
  //   }).exec()
  //   console.log(connecticut)
  // }
}
