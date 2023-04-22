import { corsMiddleware } from './cors.middleware'
import bodyParserMiddleware from './bodyparser.middleware'

const middleware = [
    corsMiddleware,
    bodyParserMiddleware
]

export { middleware }