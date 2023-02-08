import { Column, Double, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Wishlist, Wishlist => Wishlist.products)
    wishlists: Wishlist[]
} 