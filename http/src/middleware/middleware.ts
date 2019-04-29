import { Request, Response, NextFunction } from 'express'

export interface Middleware {
    (req: Request, res: Response, next: NextFunction): void
    (err: any, req: Request, res: Response, next: NextFunction): void
}