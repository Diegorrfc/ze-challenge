import { ServerError } from '../errors/server-error'
import { HttpResponse } from './http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (errorStack: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(errorStack.stack)
})

export const Ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body: body
})

export const notFound = (): HttpResponse => ({
  statusCode: 404
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body: body
})
