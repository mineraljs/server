import { Container } from 'inversify'
import { EventHandler } from '../event'
import { Module } from '../module'
import { Config, getConfig } from '../config'
import { Logger } from '../logger';

export class App {
    
    private modules: Module[]

    private eventHandler: EventHandler
    private logger: Logger

    constructor(
        private container: Container,
    ) {
        this.modules = new Array()
        this.eventHandler = new EventHandler()

        const config: Config = getConfig()

        this.logger = new Logger(config.logLevel)
        this.container.bind<Logger>('Logger').toConstantValue(this.logger)
        this.container.bind<EventHandler>('EventHandler').toConstantValue(this.eventHandler)
    }

    withModule(module: Module): App {
        this.modules.push(module)

        return this
    }

    start() {
        this.modules.forEach((module) => module.bootstrap(this.container))

        this.modules
            .forEach(async (module) => {
                await module.start()
            })
        
        this.logger.debug(`App started`)
        this.eventHandler.emit('App:started')
    }

}
