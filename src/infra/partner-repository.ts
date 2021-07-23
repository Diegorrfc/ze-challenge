import { AddPartnerRepository } from '../domain/data/db-interfaces/add-partner-repository'
import { LoadPartnerByIdRepository } from '../domain/data/db-interfaces/load-partner-by-id-repository'
import { HasPartnerByDocumentRepository } from '../domain/data/db-interfaces/has-partner-by-document-repository'
import { SearchPartnerRepository } from '../domain/data/db-interfaces/search-partner-repository'
import { PartnerModel } from '../domain/models/partner-model'
import PartnerSchemaModel from './mongodb/helpers/partner-schema'

export class PartnerRepository implements AddPartnerRepository, HasPartnerByDocumentRepository, LoadPartnerByIdRepository, SearchPartnerRepository {
  async add(partnerModel: PartnerModel): Promise<PartnerModel> {
    const { id, ...partnerModelWthoudId } = partnerModel
    const partnerTosave = {
      _id: id,
      ...partnerModelWthoudId
    }
    const validPartner = new PartnerSchemaModel(partnerTosave)
    await validPartner.save()

    return partnerModel
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
      $and: [{
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
      }, {
        coverageArea:
        {
          $geoIntersects:
          {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            }
          }
        }
      }]
    }).lean().exec()
    console.log(connecticut)
    return Promise.resolve(null)
  }
}
