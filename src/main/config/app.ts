import express from 'express'
import setMiddleware from './set-middleware'
const app = express()
setMiddleware(app)
export default app
