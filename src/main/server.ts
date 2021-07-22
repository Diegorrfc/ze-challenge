import app from './config/app'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/clean-node-api', { useCreateIndex: true }).then(() => {
  app.listen(5050, () => console.log('server running'))
})
