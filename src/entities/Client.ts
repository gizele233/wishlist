import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Wishlist } from './Wishlist';


@Entity('clients')
export class Client{

    @PrimaryGeneratedColumn()
    client_id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    email_address: string

    @OneToOne(() => Wishlist, (wishlist) => wishlist.client)
    wishlist: Wishlist
}