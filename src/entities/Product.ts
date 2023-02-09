import { Column, Double, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wishlist } from "./Wishlist";

@Entity('products')
export class Product{

    @PrimaryGeneratedColumn()
    product_id: number

    @Column({type: "double"})
    price: number

    @Column({type: "text"})
    image: string

    @Column({type: "text"})
    brand: string

    @Column({type: "text"})
    title: string

    @Column({type: "double"})
    review_score: number


    @ManyToMany(() => Wishlist, wishlist => wishlist.products)
    @JoinTable({
        name: 'product_wishlist',
        joinColumn:{
            name: 'wishlist_id',
            referencedColumnName: 'product_id'
        },
        inverseJoinColumn:{
            name: 'product_id',
            referencedColumnName: 'wishlist_id'
        }
    })
    wishlists: Wishlist[]
} 