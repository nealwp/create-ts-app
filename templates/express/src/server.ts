import express, { Router } from 'express'

export const createServer = (middleware: any[], router: Router) => {
    const server = express()
    
    server.use(middleware)

    server.get('/', (req, res, next) => {
        res.json({message: 'hello'})
    })

    server.get('/health', (req, res, next) => {
        res.status(200).send()
    })

    server.use(router)

    return server;
}