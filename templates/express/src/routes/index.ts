import { Router } from 'express'
import tempRouter from './temp.routes'

const router = Router()

router.use('/temp', tempRouter)

export { router }