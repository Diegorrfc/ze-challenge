export class MissingField extends Error {
  errorMessage: string
  constructor(fieldName: string) {
    super()
    this.errorMessage = `Missing field ${fieldName}`
  }
}
