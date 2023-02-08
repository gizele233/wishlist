import { clientRepository } from "../repositories/clientRepository";
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
}