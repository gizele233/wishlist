import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity('wishlists')
export class Wishlist{

    @PrimaryGeneratedColumn()
    wishlist_id: number

    @OneToOne(() => Client, (client) => client.wishlist)
    @JoinColumn({name: 'client_id'})
    client: Client

    @ManyToMany(() => Product, product => product.wishlists)
    products: Product[]
    
}