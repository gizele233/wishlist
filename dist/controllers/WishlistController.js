"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WishlistService_1 = require("../services/WishlistService");
class WishlistController {
    async createWishlist(req, res) {
        const { client_id } = req.params;
        try {
            const createWishlistService = new WishlistService_1.WishlistService();
            const wishlist = await createWishlistService.createWishlist({ res, client_id });
            return res.status(201).json(wishlist);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async addProducttoWishlist(req, res) {
        const { wishlist_id, product_id } = req.params;
        try {
            const createWishlistService = new WishlistService_1.WishlistService();
            const ProducttoWishlist = await createWishlistService.addProducttoWishlist({ res, wishlist_id, product_id });
            return res.status(201).json(ProducttoWishlist);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async listWishlist(req, res) {
        try {
            const listWishlistService = new WishlistService_1.WishlistService();
            const listWishlist = await listWishlistService.listWishlist();
            return res.status(200).json(listWishlist);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async deleteProductFromWishlist(req, res) {
        const { wishlist_id, product_id } = req.params;
        try {
            const deleteProductWishlistService = new WishlistService_1.WishlistService();
            const productToRemove = await deleteProductWishlistService.deleteProductFromWishlist({ res, wishlist_id, product_id });
            return res.status(204).json(productToRemove);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.WishlistController = WishlistController;
