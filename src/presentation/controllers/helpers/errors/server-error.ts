export class ServerError extends Error {
  constructor(errorStack: string) {
    super('Server error')
    this.stack = errorStack
  }
}
