import cors, { CorsOptions } from 'cors'
/* 
const options: CorsOptions = {
    origin: ['http://localhost:5173','http://localhost:4200']
}
*/

const corsMiddleware = cors()

export { corsMiddleware }