import { Request, Response, NextFunction } from 'express'

import { HttpError } from './http-error'

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (!error || res.headersSent) return next()

    if (error instanceof HttpError) {
        res
            .status(error.httpStatus)
            .json({
                error: error.message
            })
    } else {
        res
            .status(500)
            .json({
                error: error
            })
    }

    next()
}