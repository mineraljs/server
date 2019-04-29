import { EventEmitter } from 'events'

import { injectable } from 'inversify'

@injectable()
export class EventHandler extends EventEmitter {

    constructor() {
        super()
    }
}