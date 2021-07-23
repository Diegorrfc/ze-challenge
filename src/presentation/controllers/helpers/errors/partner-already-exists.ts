export class PartnerAlreadyExists extends Error {
  errorMessage: string
  constructor() {
    super('Document already exists')
    this.errorMessage = 'Document already exists'
  }
}
