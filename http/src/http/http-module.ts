import { Container } from 'inversify'

import { Module, Logger } from '@mineraljs/core'

import { Server } from './server'
import { Middleware } from '../middleware'
import { Controller } from '../controller'

export const ServerTypes = {
    Controller: Symbol.for('Controller'),
    PreRoutingMiddleware: Symbol.for('PreRoutingMiddleware'),
    PostRoutingMiddleware: Symbol.for('PostRoutingMiddleware')
}
 
export interface ServerConfig {
    port: number
}

export class HttpModule implements Module {
    
    private preRoutingMiddleware: Middleware[]
    private controllers: Controller[]
    private postRoutingMiddleware: Middleware[]

    constructor(
        private config: ServerConfig
    ) {

        this.preRoutingMiddleware = new Array()
        this.controllers = new Array()
        this.postRoutingMiddleware = new Array()
    }

    bootstrap(container: Container) {
        const logger: Logger = container.get<Logger>('Logger')

        try {
            this.preRoutingMiddleware = container.getAll<Middleware>(ServerTypes.PreRoutingMiddleware)
        } catch (err) {}

        logger.debug(`Found ${this.preRoutingMiddleware.length} pre-routing middleware`)

        try {
            this.controllers = container.getAll<Controller>(ServerTypes.Controller)
        } catch (err) {}

        logger.debug(`Found ${this.controllers.length} controllers`)

        try {
            this.postRoutingMiddleware = container.getAll<Middleware>(ServerTypes.PostRoutingMiddleware)
        } catch (err) {}

        logger.debug(`Found ${this.postRoutingMiddleware.length} post-routing middleware`)
    }

    async start() {
        await new Server()
            .withMiddleware(this.preRoutingMiddleware)
            .withControllers(this.controllers)
            .withMiddleware(this.postRoutingMiddleware)
            .start(this.config.port)             
    }

}
