export interface PartnerModel {
  id: number
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
