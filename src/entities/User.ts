import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    user: string

    @Column({type: 'text'})
    password: string
}