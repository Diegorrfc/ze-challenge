import express from 'express'
import route from '../main/config/routes'
const app = express()
app.listen(5050, () => console.log('app'))
route(app)
