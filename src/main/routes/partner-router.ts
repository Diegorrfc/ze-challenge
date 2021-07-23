import { Router } from 'express'
import { addPartnerControllerFactory } from '../factories/add-partner/add-partner-factory'
import { loadPartnerByIdControllerFactory } from '../factories/load-partner-by-id/load-partner-by-id-factory'
import { searchPartnerControllerFactory } from '../factories/search-partner/search-partner-factory'
import { routeAdapter } from './router-adapter'

export default (router: Router): void => {
  router.post('/partners', routeAdapter(addPartnerControllerFactory()))

  router.get('/partners/:id', routeAdapter(loadPartnerByIdControllerFactory()))

  router.get('/partners', routeAdapter(searchPartnerControllerFactory()))
}
