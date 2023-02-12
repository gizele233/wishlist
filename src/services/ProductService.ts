import { productRepository } from "../repositories/productRepository";


export class ProductService{
    async createProduct({price, image, brand, title, review_score}:any){
        const newProduct = productRepository.create({price, image, brand, title, review_score});
        await productRepository.save(newProduct);
        return newProduct;
    }

    async listProduct(){
        const products = await productRepository.find({});
        return products;
    }

    async deleteProduct({res, product_id}: any){
        const productToRemove = await productRepository.findOneBy({
            product_id: product_id
        })

        if(!productToRemove){
            return res.status(404).json({status: 404, message: 'There is no product with this id'})
        }
        
        await productRepository.remove(productToRemove)
        return productToRemove; 
    }

    async updateProduct({res, product_id, price, image, brand, title, review_score}: any){
        const productUpdate = await productRepository.findOneBy({
            product_id: product_id
        });

        if(!productUpdate){
            return res.status(404).json({status: 404, message: 'There is no product with this id'})
        }
        
        productUpdate.price = price;
        productUpdate.image = image;
        productUpdate.brand = brand;
        productUpdate.title = title;
        productUpdate.review_score = review_score;

        await productRepository.save(productUpdate);
        return productUpdate; 
    }
}