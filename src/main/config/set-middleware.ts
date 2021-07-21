import { Express } from 'express'
import { jsonParser } from '../middlewares/json-parse'

export default (app: Express): void => {
  app.use(jsonParser)
}
