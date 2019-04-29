import { Repository, EntityRepository } from 'typeorm'
import { Pageable, Page } from '@mineraljs/core'

@EntityRepository()
export abstract class PagingRepository<T> extends Repository<T> {

    page(pageable: Pageable): Promise<Page<T>> {
        return new Promise((resolve, reject) => {

            let order = {}

            if (pageable.sort) {
                order = {
                    [pageable.sort.by]: (pageable.sort && pageable.sort.direction) ? pageable.sort.direction.toUpperCase() : 'ASC'
                }
            }
            super.findAndCount({
                order: pageable.toPredicate(),
                skip: pageable.page * pageable.pageSize,
                take: pageable.pageSize
            }).then(([items, totalItems]) => {
                return resolve({
                    page: pageable.page,
                    pageSize: pageable.pageSize,
                    items: items,
                    totalItems: totalItems
                })
            }).catch((err) => {
                return reject(err)
            })
        })
    }

}

interface FindOptions<T> {

    order: {
        [key in keyof T]?: 'ASC' | 'DESC'
    }

}