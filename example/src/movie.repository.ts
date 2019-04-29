import { PagingRepository } from '@mineraljs/db'

import { Movie } from './movie'
import { EntityRepository } from 'typeorm';

@EntityRepository(Movie)
export class MovieRepository extends PagingRepository<Movie> {

}