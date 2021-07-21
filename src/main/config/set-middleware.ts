import { Express } from 'express'
import { jsonParser } from '../middlewares/json-parse'
import routers from './routes'

export default (app: Express): void => {
  app.use(jsonParser)
  routers(app)
}
