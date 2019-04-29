import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
    name: 'movies'
})
export class Movie {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title!: string

    @Column()
    year!: number
}