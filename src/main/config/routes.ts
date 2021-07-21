import { Router, Express } from 'express'
import addPartner from '../routes/add-partner/add-partner-router'

export default (app: Express): void => {
  const route = Router()
  app.use(route)
  addPartner(route)
}
