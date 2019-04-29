import { createLogger, format, transports, Logger as Winston } from 'winston'

export type LogLevel = 'debug' | 'info' | 'warning' | 'error'

export class Logger {
    
    private winston: Winston

    constructor(private logLevel: LogLevel) {

        this.winston = createLogger({
            level: this.logLevel,
            format: format.json(),
            transports:[
                new transports.File({
                    filename: 'error.log',
                    level: 'error'
                }),
                new transports.File({
                    filename: 'combined.log'
                })
            ]
        })

        if (process.env.NODE_ENV !== 'production') {
            this.winston.add(new transports.Console({
                format: format.simple()
            }))   
        }
    }

    debug(message: string, cb?: Function) {
        this.winston.debug(message, cb)
    }

    info(message: string, cb?: Function) {
        this.winston.info(message, cb)
    }

    warning(message: string, cb?: Function) {
        this.winston.warning(message, cb)
    }

    error(message: string, cb?: Function) {
        this.winston.error(message, cb)
    }
    
}