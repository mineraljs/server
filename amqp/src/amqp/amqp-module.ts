import { connect, Channel } from 'amqplib'
import { Container } from 'inversify'

import { Module, Logger } from '@mineraljs/core'

import { AmqpListener } from './amqp-listener'
import { AmqpEmitter } from './amqp-emitter'

export const AmqpTypes = {
    AmqpListener: Symbol.for('AmqpListener'),
    AmqpEmitter: Symbol.for('AmqpEmitter')
}
 
export class AmqpConfig {
    protocol?: string = 'amqp'
    hostname?: string = 'localhost'
    port?: number = 5672
    username?: string = 'guest'
    password?: string = 'guest'
    locale?: string = 'en_US'
    frameMax?: number = 0x1000
    heartbeat?: number = 0
    vhost?: string = '/'
}

export class AmqpModule implements Module {

    private amqpListeners: AmqpListener<any>[]
    private amqpEmitters: AmqpEmitter<any>[]

    constructor(
        private config: AmqpConfig
    ) {

        this.amqpListeners = new Array()
        this.amqpEmitters = new Array()
    }

    bootstrap(container: Container) {
        const logger: Logger = container.get<Logger>('Logger')

        try {
            this.amqpListeners = container.getAll<AmqpListener<any>>(AmqpTypes.AmqpListener)
        } catch (err) {}
        
        logger.debug(`Found ${this.amqpListeners.length} amqp listeners`)

        try {
            this.amqpEmitters = container.getAll<AmqpEmitter<any>>(AmqpTypes.AmqpEmitter)
        } catch (err) {}
        
        logger.debug(`Found ${this.amqpEmitters.length} amqp emitters`)
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            connect(this.config)
                .then((connection) => {
                    connection.createChannel()
                        .then((channel) => {
                            this.bootstrapEmitters(channel)
                            this.bootstrapListeners(channel)

                            return resolve()
                        }).catch((err) => {
                            return reject(err)
                        })
                }).catch((err) => {
                    return reject(err)
                })
        })
    }

    private bootstrapEmitters(channel: Channel) {
        this.amqpEmitters
            .forEach((emitter) => {
                emitter.bootstrap(channel)
            })
    }

    private bootstrapListeners(channel: Channel) {
        this.amqpListeners
            .forEach((listener) => {
                listener.bootstrap(channel)
            })
    }
}

