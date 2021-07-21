export class PartnerAlreadyExists extends Error {
  constructor() {
    super('Partner already exists')
  }
}
