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
            return res.status(200).json(listProduct)
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async listProductById(req: Request, res: Response){
        const {product_id} = req.params;
        try{
            const listProductService = new ProductService();
            const listProduct = await listProductService.listProductById({res, product_id});
            return res.status(200).json(listProduct)
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async deleteProduct(req: Request, res: Response){
        const {product_id} = req.params;

        try{
            const deleteProductService = new ProductService();
        
            const productToRemove = await deleteProductService.deleteProduct({res, product_id});
            return res.status(204).json(productToRemove)
            
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async updateProduct(req: Request, res: Response){

        const {price, image, brand, title, review_score} = req.body;
        const {product_id} = req.params;

        try{
            const updateProductService = new ProductService();
        
            const productUpdate = await updateProductService.updateProduct({res, product_id, price, image, brand, title, review_score});
            return res.status(204).json(productUpdate)
            
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}