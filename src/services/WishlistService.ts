import { rootCertificates } from "tls";
import { clientRepository } from "../repositories/clientRepository";
import { productRepository } from "../repositories/productRepository";
import { wishlistRepository } from "../repositories/wishlistRepository";


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
        const productExists = await productRepository.findOneBy({product_id: Number(product_id)});

        if(!productExists){
            return res.status(404).json({message: 'Product does not exist'})
        }


        const wishlist = await wishlistRepository.findOneBy({wishlist_id: Number(wishlist_id)});

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist não existe' })
        }

        console.log(wishlist)

        const productUpdate = {
            ...productExists,
            wishlists: [wishlist]
        }
       

        await productRepository.save(productUpdate)

        return productUpdate;
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

        console.log(wishlist)

        const productRemove = {
            ...productExists,
            wishlists: [wishlist]
        }

        await productRepository.remove(productRemove)

        return productRemove; 
    }
}