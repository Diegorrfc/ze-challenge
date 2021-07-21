import app from './config/app'
import { MongoHelper } from '../domain/infra/mongodb/helpers/mongo-helper'

MongoHelper.connect('mongodb://localhost:27017/clean-node-api').then(() => {
  app.listen(5050, () => console.log('server running'))
})
