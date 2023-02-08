import { Request, Response } from "express";
import { WishlistService } from "../services/WishlistService";


export class wishlistController{
    async createWishlist(req: Request, res: Response){
        const {client_id} = req.params
       
        try{
            const createWishlistService = new WishlistService();
        
            const wishlist = await createWishlistService.createWishlist({res, client_id});
            return res.status(201).json(wishlist)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}