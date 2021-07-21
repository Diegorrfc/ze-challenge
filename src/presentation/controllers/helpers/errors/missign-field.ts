export class MissingField extends Error {
  constructor(fieldName: string) {
    super(`Missing field ${fieldName}`)
  }
}
