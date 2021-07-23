import { Controller } from '../../presentation/controllers/controller'
import { HttpRequest } from '../../presentation/controllers/helpers/http/http'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }
    const response = await controller.handle(httpRequest)
    res.status(response.statusCode).send(response.body)
  }
}
