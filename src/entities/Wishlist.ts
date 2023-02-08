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
    @JoinTable({
        name: 'product_wishlist',
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'wishlist_id'
        },
        inverseJoinColumn:{
            name: 'wishlist_id',
            referencedColumnName: 'product_id'
        }
    })
    products: Product[]
    
}