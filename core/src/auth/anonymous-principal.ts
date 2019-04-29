import { Principal } from './principal'

export class AnonyMousPrincipal implements Principal {

    name: string
    roles: string[]
    
    constructor() {
        this.name = 'ANONYMOUS'  
        this.roles = [] 
    }

    loggedIn(): boolean {
        return false
    }
    
}