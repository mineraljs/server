import cors from 'cors'
import * as bodyParser from 'body-parser'
import methodOverride from 'method-override'
import express from 'express'
import { Controller } from '../controller'
import { Middleware } from '../middleware'

export class Server {

    private app: express.Application
    private router: express.Router
    
    constructor() {
        this.app = express()
        this.router = express.Router()

        this.config()
    }

    private config() {
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true}))
        this.app.use(methodOverride())
    }

    withMiddleware(middleware: Middleware[]): Server {
        middleware
            .forEach((m) => this.router.use(m))

        return this
    }

    withControllers(controllers: Controller[]): Server {
        controllers
            .forEach((c) => c.setupRoutes(this.router))
        
        return this
    }

    start(port: number) {
        this.app.use(this.router)

        this.app.listen(port, () => {
            console.log(`Listening to *:${port}`)
        })
    }

}


