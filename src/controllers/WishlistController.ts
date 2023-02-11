import { Request, Response } from "express";
import { WishlistService } from "../services/WishlistService";


export class WishlistController{

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
            return res.status(200).json(listWishlist)
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async deleteProductFromWishlist(req: Request, res: Response){
        const {wishlist_id, product_id} = req.params;

        try{
            const deleteProductWishlistService = new WishlistService();
        
            const productToRemove = await deleteProductWishlistService.deleteProductFromWishlist({res, wishlist_id, product_id});
            return res.status(204).json(productToRemove)
            
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}