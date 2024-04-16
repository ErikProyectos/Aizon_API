import express from 'express'

import authentication from './authentication'
import users from './users'
import solutions from './solutions'
import screens from './screens'
import widgets from './widgets'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  users(router)
  solutions(router)
  screens(router)
  widgets(router)
  return router
}
