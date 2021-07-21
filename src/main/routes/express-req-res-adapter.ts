import { Controller } from '../../presentation/controllers/controller'
import { HttpRequest } from '../../presentation/controllers/helpers/http/http'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const response = await controller.handle(httpRequest)
    res.json(response.body)
    res.status(response.statusCode)
  }
}
