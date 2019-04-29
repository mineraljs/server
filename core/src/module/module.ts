import { Container } from 'inversify'

export interface Module {

    bootstrap(container: Container): void

    start(): Promise<void>

}