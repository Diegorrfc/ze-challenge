import app from './config/app'
import mongoose from 'mongoose'
import env from './config/db-connection'

mongoose.connect(env.mongoUrl, { useCreateIndex: true }).then(() => {
  app.listen(env.port, () => console.log(`server running at port ${env.port}`))
})
