import { Router } from 'express'

export interface Controller {

    setupRoutes(router: Router): void

}