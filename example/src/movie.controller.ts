import { Router, Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'

import { Controller, HttpError } from '@mineraljs/http'
import { Page, Pageable } from '@mineraljs/core'

import { Movie } from './movie'
import { MovieService } from './movie.service'

@injectable()
export class MovieController implements Controller {

    constructor(
        @inject('MovieService') private service: MovieService
    ) {
    }
    
    setupRoutes(router: Router): void {
        router.get('/movies', this.getMovies.bind(this))
        router.get('/test', this.createMovie.bind(this))
    }

    getMovies(req: Request, res: Response, next: NextFunction) {
        this.service.getMovies(req.query).then((movies: Page<Movie>) => {
            res
                .json(movies)
            return next()
        }).catch((err: HttpError) => {
            return next(err)
        })
    }

    createMovie(req: Request, res: Response, next: NextFunction) {
        this.service.createMovie()

        res.json({
            message: 'Done'
        })
        
        return next()
    }

}