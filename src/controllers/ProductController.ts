import { Request, Response } from "express";
import { productService } from "../services/productService";

export class ProductController{
    async createProduct(req: Request, res: Response){
        const {price, image, brand, title, review_score} = req.body;

        try{
            const createProductService = new productService();
        
            const product = await createProductService.createProduct({price, image, brand, title, review_score});
            return res.status(201).json(product)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}