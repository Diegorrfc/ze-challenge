export class ServerError extends Error {
  errorMessage: string

  constructor(errorStack: string) {
    super()
    this.errorMessage = 'Internal server error'
    this.stack = errorStack
  }
}
