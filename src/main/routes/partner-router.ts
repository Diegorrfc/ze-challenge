import { Router } from 'express'
import { addPartnerControllerFactory } from '../factories/add-partner/add-partner-factory'
import { findPartnerByIdControllerFactory } from '../factories/find-partner-by-id/find-partner-by-id-factory'
import { routeAdapter } from './router-adapter'

export default (router: Router): void => {
  router.post('/partners', routeAdapter(addPartnerControllerFactory()))

  router.get('/partners/:id', routeAdapter(findPartnerByIdControllerFactory()))
}
