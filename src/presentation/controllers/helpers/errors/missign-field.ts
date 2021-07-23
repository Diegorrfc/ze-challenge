export class MissingField extends Error {
  errorMessage: string
  constructor(fieldName: string) {
    super(`Missing field ${fieldName}`)
    this.errorMessage = `Missing field ${fieldName}`
  }
}
