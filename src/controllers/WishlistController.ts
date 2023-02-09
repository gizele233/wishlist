import { Request, Response } from "express";
import { WishlistService } from "../services/WishlistService";


export class WishlistController{
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

    async addProducttoWishlist(req: Request, res: Response){
        const {wishlist_id, product_id} = req.params
       
        try{
            const createWishlistService = new WishlistService();
        
            const ProducttoWishlist = await createWishlistService.addProducttoWishlist({res, wishlist_id, product_id});
            return res.status(201).json(ProducttoWishlist)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listWishlist(req: Request, res: Response){
        try{
            const listWishlistService = new WishlistService();
            const listWishlist = await listWishlistService.listWishlist();
            return res.status(201).json(listWishlist)
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }
}