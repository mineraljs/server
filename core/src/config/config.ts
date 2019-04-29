import { config } from 'dotenv'

import { LogLevel } from '../logger'

export interface Config {
    logLevel: LogLevel
}

config()

export const getConfig = (): Config => {
    return {
        logLevel: <LogLevel>process.env.logLevel
    }
}