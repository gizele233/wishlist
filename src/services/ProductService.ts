import { productRepository } from "../repositories/productRepository";


export class ProductService{
    async createProduct({price, image, brand, title, review_score}:any){
       
        const newProduct = productRepository.create({price, image, brand, title, review_score})
        await productRepository.save(newProduct);
        return newProduct;

    }
}