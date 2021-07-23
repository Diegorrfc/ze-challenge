export class InvalidField extends Error {
  errorMessage: string
  constructor(fieldName: string) {
    super(`Invalid field: ${fieldName}`)
    this.errorMessage = `Invalid field: ${fieldName}`
  }
}
