import app from './config/app'
import StartApplicationWithCluster from './start-app-with-cluster'
import mongoose from 'mongoose'
import env from './config/db-connection'

mongoose.connect(env.mongoUrl, { useCreateIndex: true }).then(() => {
  StartApplicationWithCluster(app)
})
