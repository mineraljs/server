import { injectable } from 'inversify'

import { AmqpListener } from '@mineraljs/amqp'

@injectable()
export class MovieCreatedAmqpListener extends AmqpListener<MovieCreatedEvent> {

    getQueueName(): string {
        return 'test.queue.movie'
    }    
    
    getExchangeName(): string {
        return 'movies.created'
    }
    
    getRoutingKey(): string {
        return ''
    }

    getExchangeType(): string {
        return 'fanout'
    }

    onEvent(event: MovieCreatedEvent): void {
        console.log(`Got event: ${JSON.stringify(event)}`)
    }

}

export interface MovieCreatedEvent {
    id: number
    title: string
}
