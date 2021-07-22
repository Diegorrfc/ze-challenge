import { Router, Express } from 'express'
import addPartner from '../routes/partner-router'

export default (app: Express): void => {
  const route = Router()
  app.use(route)
  addPartner(route)
}
