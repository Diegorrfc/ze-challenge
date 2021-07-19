export interface AddPartnerModel {
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
