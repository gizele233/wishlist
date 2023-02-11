import { clientRepository } from "../repositories/clientRepository";
import { productRepository } from "../repositories/productRepository";
import { wishlistRepository } from "../repositories/wishlistRepository";
import { Wishlist } from "../entities/Wishlist";



export class WishlistService{
    async createWishlist({res, client_id}: any){
        const clientExists = await clientRepository.findOneBy({client_id: Number(client_id)});
        // const customerAlreadyWishlist = await wishlistRepository.findOneBy({client: client_id});
        
        
        if(!clientExists){
            return res.status(404).json({message: 'Customer does not exist'})
        }
        // if(customerAlreadyWishlist){
        //     return res.status(404).json({message: 'Customer already has a wishlist'})
        // }

        
        const newWishlist = wishlistRepository.create({
            client: clientExists
        });

        await wishlistRepository.save(newWishlist);
        return newWishlist;

    }

    async addProducttoWishlist({res, wishlist_id, product_id}: any){
        const productExists = await productRepository.findOne({where:{product_id: Number(product_id)}});
        
        if(!productExists){
            return res.status(404).json({message: 'Product does not exist'})
        }

        const wishlist = await wishlistRepository.findOne({where: {wishlist_id: Number(wishlist_id)}});

        const productExistsWishlist = await productRepository.createQueryBuilder("product")
                                            .leftJoinAndSelect("product.wishlists", "wishlist")
                                            .where("product.product_id = :id", {id: product_id})
                                            .getOne();
        

        
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist não existe' })
        }

        let newWishlist: Wishlist[] = [wishlist];

        if((wishlist != null && productExistsWishlist != null)){
            if(!productExistsWishlist.wishlists.includes(wishlist)){
                productExistsWishlist.wishlists.push(wishlist);
                newWishlist = productExistsWishlist.wishlists;
            } else {
                return  res.status(409).json({message: 'The wishlist already have this product'})
            }
        }

        const productWishlist = productRepository.create({
            ...productExists,
            wishlists: newWishlist,
         })

        await productRepository.save(productWishlist);

        return productWishlist;
    }

    async listWishlist(){
        const wishlists = await wishlistRepository.find({
            relations:{
                client: true,
                products: true
            }
        })

        return wishlists
    }

    async deleteProductFromWishlist({res, wishlist_id, product_id}: any){
        const productExists = await productRepository.findOneBy({product_id: Number(product_id)});

        if(!productExists){
            return res.status(404).json({message: 'Product does not exist'})
        }


        const wishlist = await wishlistRepository.findOneBy({wishlist_id: Number(wishlist_id)});

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist não existe' })
        }

        const productRemove = await wishlistRepository.createQueryBuilder("wishlists")
                                            .leftJoinAndSelect("wishlists.products", "products")
                                            .where("wishlists.wishlist_id = :id", {id: wishlist_id})
                                            .getOne();

        if(productRemove!=null){
            productRemove.products = productRemove.products.filter(value => {
                return value.product_id != product_id
            })
        }
        
        const productToRemove = wishlistRepository.create({...productRemove})

        await wishlistRepository.save(productToRemove)

        return productRemove; 
    }
}