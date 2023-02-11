"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
class ProductController {
    async createProduct(req, res) {
        const { price, image, brand, title, review_score } = req.body;
        try {
            const createProductService = new ProductService_1.ProductService();
            const product = await createProductService.createProduct({ price, image, brand, title, review_score });
            return res.status(201).json(product);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async listProduct(req, res) {
        try {
            const listProductService = new ProductService_1.ProductService();
            const listProduct = await listProductService.listProduct();
            return res.status(200).json(listProduct);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async deleteProduct(req, res) {
        const { product_id } = req.params;
        try {
            const deleteProductService = new ProductService_1.ProductService();
            const productToRemove = await deleteProductService.deleteProduct({ res, product_id });
            return res.status(204).json(productToRemove);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async updateProduct(req, res) {
        const { price, image, brand, title, review_score } = req.body;
        const { product_id } = req.params;
        try {
            const updateProductService = new ProductService_1.ProductService();
            const productUpdate = await updateProductService.updateProduct({ res, product_id, price, image, brand, title, review_score });
            return res.status(204).json(productUpdate);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.ProductController = ProductController;
