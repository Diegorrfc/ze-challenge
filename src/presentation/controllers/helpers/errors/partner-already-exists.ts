export class PartnerAlreadyExists extends Error {
  errorMessage: string
  constructor() {
    super('Partner already exists')
    this.errorMessage = 'Partner already exists'
  }
}
