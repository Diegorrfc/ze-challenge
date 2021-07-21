import { Controller } from '../../presentation/controllers/controller'
import { HttpRequest } from '../../presentation/controllers/helpers/http/http'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const response = await controller.handle(httpRequest)
    const body = response.statusCode !== 200 ? { message: response.body.message } : response.body
    res.status(response.statusCode).send(body)
  }
}
