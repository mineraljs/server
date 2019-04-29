import { Container } from 'inversify'
import { Module } from '@mineraljs/core'
import { createConnection, ConnectionOptions } from 'typeorm'


export class DbModule implements Module {

    constructor(private config: ConnectionOptions) {}

    bootstrap(container: Container): void {
    }

    async start(): Promise<void> {
        await createConnection(this.config)
    }

}
