"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const productRepository_1 = require("../repositories/productRepository");
class ProductService {
    async createProduct({ price, image, brand, title, review_score }) {
        const newProduct = productRepository_1.productRepository.create({ price, image, brand, title, review_score });
        await productRepository_1.productRepository.save(newProduct);
        return newProduct;
    }
    async listProduct() {
        const products = await productRepository_1.productRepository.find({});
        return products;
    }
    async listProductById({ res, product_id }) {
        const products = await productRepository_1.productRepository.findOneBy({ product_id: product_id });
        if (!products) {
            return res.status(404).json({ status: 404, message: 'There is no product with this id' });
        }
        return products;
    }
    async deleteProduct({ res, product_id }) {
        const productToRemove = await productRepository_1.productRepository.findOneBy({
            product_id: product_id
        });
        if (!productToRemove) {
            return res.status(404).json({ status: 404, message: 'There is no product with this id' });
        }
        await productRepository_1.productRepository.remove(productToRemove);
        return productToRemove;
    }
    async updateProduct({ res, product_id, price, image, brand, title, review_score }) {
        const productUpdate = await productRepository_1.productRepository.findOneBy({
            product_id: product_id
        });
        if (!productUpdate) {
            return res.status(404).json({ status: 404, message: 'There is no product with this id' });
        }
        productUpdate.price = price;
        productUpdate.image = image;
        productUpdate.brand = brand;
        productUpdate.title = title;
        productUpdate.review_score = review_score;
        await productRepository_1.productRepository.save(productUpdate);
        return productUpdate;
    }
}
exports.ProductService = ProductService;
