import { injectable } from 'inversify'

import { AmqpListener } from '@mineraljs/amqp'

@injectable()
export class SerieCreatedAmqpListener extends AmqpListener<SerieCreatedEvent> {

    getQueueName(): string {
        return 'test.queue.series'
    }    
    
    getExchangeName(): string {
        return 'series.created'
    }
    
    getRoutingKey(): string {
        return ''
    }

    getExchangeType(): string {
        return 'fanout'
    }

    onEvent(event: SerieCreatedEvent): void {
        console.log(`Got event: ${JSON.stringify(event)}`)
    }

}

export interface SerieCreatedEvent {
    id: number
    title: string
}
