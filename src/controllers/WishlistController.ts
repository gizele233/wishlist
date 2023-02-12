import { Request, Response } from "express";
import { WishlistService } from "../services/WishlistService";


export class WishlistController{

    async addProducttoWishlist(req: Request, res: Response){
        const {wishlist_id, product_id} = req.params
       
        try{
            const addProducttoWishlistService = new WishlistService();
        
            const ProducttoWishlist = await addProducttoWishlistService.addProducttoWishlist({wishlist_id, product_id});
            return res.status(ProducttoWishlist.status).json(ProducttoWishlist.message);
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listWishlist(req: Request, res: Response){
        try{
            const listWishlistService = new WishlistService();
            const listWishlist = await listWishlistService.listWishlist();
            return res.status(listWishlist.status).json(listWishlist.message);
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async deleteProductFromWishlist(req: Request, res: Response){
        const {wishlist_id, product_id} = req.params;

        try{
            const deleteProductWishlistService = new WishlistService();
        
            const productToRemove = await deleteProductWishlistService.deleteProductFromWishlist({wishlist_id, product_id});
            return res.status(productToRemove.status).json(productToRemove.message);
            
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}