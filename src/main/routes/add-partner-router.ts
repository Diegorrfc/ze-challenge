import { Router } from 'express'
import { addPartnerControllerComposition } from './add-partner-composition'
import { routeAdapter } from './request-response-express-adapter'

export default (router: Router): void => {
  router.post('/user', routeAdapter(addPartnerControllerComposition()))
}
