export class ServerError extends Error {
  errorMessage: string

  constructor(errorStack: string) {
    super('Internal server error')
    this.errorMessage = 'Internal server error'
    this.stack = errorStack
  }
}
