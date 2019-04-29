import { Channel } from 'amqplib'

export abstract class AmqpListener<T> {

    private channel!: Channel

    bootstrap(channel: Channel): Promise<void> {
        return new Promise((resolve, reject) => {
            channel.assertExchange(
                this.getExchangeName(),
                this.getExchangeType()
            ).then(() => {
                channel.assertQueue(
                    this.getQueueName(),
                    {
                        exclusive: true
                    }
                ).then((q) => {
                    channel.bindQueue(q.queue, this.getExchangeName(), this.getRoutingKey())
                    channel.consume(q.queue, (message) => {
                        if (message) {
                            this.onEvent(JSON.parse(message.content.toString()))
                        }
                    })

                    return resolve()
                }).catch((err) => {
                    return reject(err)
                })
            }).catch((err) => {
                return reject(err)
            })

        })

    }

    abstract getQueueName(): string
    abstract getExchangeName(): string
    abstract getRoutingKey(): string
    abstract getExchangeType(): string

    abstract onEvent(event: T): void
}
