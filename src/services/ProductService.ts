import { productRepository } from "../repositories/productRepository";


export class ProductService{
    async createProduct({price, image, brand, title, review_score}:any){
        const newProduct = productRepository.create({price, image, brand, title, review_score});
        await productRepository.save(newProduct);
        return {status: 201, message: newProduct};
    }

    async listProduct(){
        const products = await productRepository.find({});
        return {status: 200, message: products};
    }

    async listProductById({product_id}: any){
        const products = await productRepository.findOneBy({product_id: product_id});
        
        if(!products){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is no product with this id'
                }
            };
        }

        return {status: 200, products: products};
    }

    async deleteProduct({product_id}: any){
        const productToRemove = await productRepository.findOneBy({
            product_id: product_id
        })

        if(!productToRemove){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is no product with this id'
                }
            };
        }
        
        await productRepository.remove(productToRemove)
        return {status: 204, message: productToRemove}; 
    }

    async updateProduct({product_id, price, image, brand, title, review_score}: any){
        const productUpdate = await productRepository.findOneBy({
            product_id: product_id
        });

        if(!productUpdate){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is no product with this id'
                }
            };
        }
        
        productUpdate.price = price;
        productUpdate.image = image;
        productUpdate.brand = brand;
        productUpdate.title = title;
        productUpdate.review_score = review_score;

        await productRepository.save(productUpdate);
        return {status: 204, message: productUpdate}; 
    }
}