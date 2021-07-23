export class PartnerAlreadyExists extends Error {
  errorMessage: string
  constructor() {
    super()
    this.errorMessage = 'Partner already exists'
  }
}
