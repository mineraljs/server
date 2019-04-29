export class Pageable {

    page: number
    pageSize: number
    sort: Sort

    protected constructor(
        _page: number,
        _pageSize: number,
        _sort: Sort
    ) {
        this.page = _page
        this.pageSize = _pageSize
        this.sort = _sort

    }

    toPredicate() : any {
        return {
            [this.sort.by]: this.sort.direction ? this.sort.direction.toUpperCase() : 'ASC'
        }
    }

}

export type Direction  = 'asc' | 'desc'

export interface Sort {

    by: string
    direction?: Direction

}

