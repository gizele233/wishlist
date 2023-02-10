import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity('wishlists')
export class Wishlist{

    @PrimaryGeneratedColumn()
    wishlist_id: number

    @OneToOne(() => Client, (client) => client.wishlist,{
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'client_id'})
    client: Client

    @ManyToMany(() => Product, product => product.wishlists)
    @JoinTable({
        name: 'product_wishlist',
        joinColumn:{
            name: 'wishlist_id',
            referencedColumnName: 'wishlist_id'
        },
        inverseJoinColumn:{
            name: 'product_id',
            referencedColumnName: 'product_id'
        },

    })
    products: Product[]
    
}