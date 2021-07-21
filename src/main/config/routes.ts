import { Router, Express } from 'express'

export default (app: Express): void => {
  const route = Router()
  app.use(route)
  route.get('/teste', (req, res) => {
    res.json({ aqui: 'ui' })
  })
}
