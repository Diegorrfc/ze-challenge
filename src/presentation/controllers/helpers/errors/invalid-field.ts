export class InvalidField extends Error {
  errorMessage: string
  constructor(fieldName: string) {
    super()
    this.errorMessage = `Invalid field: ${fieldName}`
  }
}
