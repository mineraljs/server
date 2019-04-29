export interface Principal {
    name: string

    roles: string[]
    
    loggedIn(): boolean
    
}