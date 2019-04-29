import { Channel } from 'amqplib'

export abstract class AmqpEmitter<T> {

    private channel: Channel | undefined

    bootstrap(channel: Channel): Promise<void> {
        return new Promise((resolve, reject) => {
            channel
                .assertExchange(
                    this.getExchangeName(),
                    this.getExchangeType()
                ).then(() => {
                    this.channel = channel
                    return resolve()
                }).catch((err) => {
                    return reject(err)
                })
                
        })
    }

    abstract getExchangeName(): string

    getExchangeType(): string {
        return 'fanout'
    }

    publish(event: T) {
        if (this.channel) {
            this.channel
                .publish(this.getExchangeName(), '', Buffer.from(JSON.stringify(event)))
        }
    }
    
}