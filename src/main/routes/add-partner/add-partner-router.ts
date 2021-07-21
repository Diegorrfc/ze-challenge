import { Router } from 'express'
import { addPartnerControllerComposition } from './add-partner-composition'
import { routeAdapter } from '../router-adapter'

export default (router: Router): void => {
  router.post('/partner', routeAdapter(addPartnerControllerComposition()))
}
