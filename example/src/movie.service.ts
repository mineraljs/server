import { injectable, inject } from 'inversify'

import { Page, Pageable } from '@mineraljs/core'
import { Movie } from './movie'
import { MovieRepository } from './movie.repository';
import { getCustomRepository } from 'typeorm';
import { MovieCreatedEventEmitter } from './movie.amqp-handler';
import { AmqpTypes } from '@mineraljs/amqp';

@injectable()
export class MovieService {

    private repository: MovieRepository
    constructor(
        @inject(AmqpTypes.AmqpEmitter) private amqpEmitter: MovieCreatedEventEmitter
    ) {
        this.repository = getCustomRepository(MovieRepository)
    }

    getMovies(pageable: Pageable): Promise<Page<Movie>> {
        return new Promise((resolve, reject) => {
            this.repository
                .page(pageable)
                    .then((page) => {
                        resolve(page)
                    }).catch((err) => {
                        reject(err)
                    })
        })
    }

    createMovie() {
        console.log('publishing event')
        this.amqpEmitter.publish({
            id: 0,
            title: 'Test movie'
        })
    }

}
