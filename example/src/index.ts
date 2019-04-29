import 'reflect-metadata'

import { Container } from 'inversify'

import { App, EventHandler } from '@mineraljs/core'

import { AmqpModule, AmqpTypes } from '@mineraljs/amqp'
import { HttpModule, ServerTypes, errorHandler } from '@mineraljs/http'
import { DbModule } from '@mineraljs/db'

import { MovieCreatedEventEmitter } from './movie.amqp-handler'
import { MovieCreatedAmqpListener } from './movie.amqp-listener'
import { SerieCreatedAmqpListener } from './serie.amqp-listener'
import { SerieController } from './series.controller'
import { MovieRepository } from './movie.repository'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'
import { Movie } from './movie'

const container: Container = new Container({
    skipBaseClassChecks: true
})

const eventHandler: EventHandler = new EventHandler()
container.bind<EventHandler>('EventHandler').toConstantValue(eventHandler)

container.bind(ServerTypes.PostRoutingMiddleware).toConstantValue(errorHandler)
container.bind<MovieController>(ServerTypes.Controller).to(MovieController)
container.bind<SerieController>(ServerTypes.Controller).to(SerieController)
container.bind<MovieService>('MovieService').to(MovieService)
container.bind<MovieRepository>('MovieRepository').to(MovieRepository)
container.bind<MovieCreatedEventEmitter>(AmqpTypes.AmqpEmitter).to(MovieCreatedEventEmitter).inSingletonScope()
container.bind<MovieCreatedAmqpListener>(AmqpTypes.AmqpListener).to(MovieCreatedAmqpListener).inSingletonScope()
container.bind<SerieCreatedAmqpListener>(AmqpTypes.AmqpListener).to(SerieCreatedAmqpListener).inSingletonScope()

const amqpModule: AmqpModule = new AmqpModule({})
const serverModule: HttpModule = new HttpModule({
    port: 1234
})

const dbModule: DbModule = new DbModule({
    username: 'postgres',
    password: 'postgres',
    database: 'movies',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    entities: [
        Movie
    ]
})

new App(container)
    .withModule(amqpModule)
    .withModule(serverModule)
    .withModule(dbModule)
    .start()