import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController{
    async createProduct(req: Request, res: Response){
        const {price, image, brand, title, review_score} = req.body;

        try{
            const createProductService = new ProductService();
        
            const product = await createProductService.createProduct({price, image, brand, title, review_score});
            return res.status(201).json(product)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listProduct(req: Request, res: Response){
        try{
            const listProductService = new ProductService();
            const listProduct = await listProductService.listProduct();
            return res.status(201).json(listProduct)
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }
}