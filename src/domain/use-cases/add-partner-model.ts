export interface AddPartnerModel {
  id: string
  tradingName: string
  ownerName: string
  document: string
  coverageArea: {
    type: string
    coordinates: number[][][][]
  }
  address: {
    type: string
    coordinates: number[]
  }
}
