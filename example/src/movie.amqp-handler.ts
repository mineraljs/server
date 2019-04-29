import { injectable } from 'inversify'
import { AmqpEmitter } from '@mineraljs/amqp'

@injectable()
export class MovieCreatedEventEmitter extends AmqpEmitter<MovieCreatedEvent> {

    getExchangeName(): string {
        return 'movies.created'
    }
    
}

export interface MovieCreatedEvent {
    id: number
    title: string
}
