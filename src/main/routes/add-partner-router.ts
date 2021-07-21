import { Router } from 'express'
import { addPartnerControllerComposition } from './add-partner-composition'
import { routeAdapter } from './express-req-res-adapter'

export default (router: Router): void => {
  router.post('/user', routeAdapter(addPartnerControllerComposition()))
}
