"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientRepository_1 = require("../repositories/clientRepository");
const productRepository_1 = require("../repositories/productRepository");
const wishlistRepository_1 = require("../repositories/wishlistRepository");
class WishlistService {
    async createWishlist({ res, client_id }) {
        const clientExists = await clientRepository_1.clientRepository.findOneBy({ client_id: Number(client_id) });
        // const customerAlreadyWishlist = await wishlistRepository.findOneBy({client: client_id});
        if (!clientExists) {
            return res.status(404).json({ message: 'Customer does not exist' });
        }
        // if(customerAlreadyWishlist){
        //     return res.status(404).json({message: 'Customer already has a wishlist'})
        // }
        const newWishlist = wishlistRepository_1.wishlistRepository.create({
            client: clientExists
        });
        await wishlistRepository_1.wishlistRepository.save(newWishlist);
        return newWishlist;
    }
    async addProducttoWishlist({ res, wishlist_id, product_id }) {
        const productExists = await productRepository_1.productRepository.findOne({ where: { product_id: Number(product_id) } });
        if (!productExists) {
            return res.status(404).json({ message: 'Product does not exist' });
        }
        const wishlist = await wishlistRepository_1.wishlistRepository.findOne({ where: { wishlist_id: Number(wishlist_id) } });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist não existe' });
        }
        const productWishlist = productRepository_1.productRepository.create({
            ...productExists,
            wishlists: [wishlist],
        });
        await productRepository_1.productRepository.save(productWishlist);
        return productWishlist;
    }
    async listWishlist() {
        const wishlists = await wishlistRepository_1.wishlistRepository.find({
            relations: {
                client: true,
                products: true
            }
        });
        return wishlists;
    }
    async deleteProductFromWishlist({ res, wishlist_id, product_id }) {
        const productExists = await productRepository_1.productRepository.findOneBy({ product_id: Number(product_id) });
        if (!productExists) {
            return res.status(404).json({ message: 'Product does not exist' });
        }
        const wishlist = await wishlistRepository_1.wishlistRepository.findOneBy({ wishlist_id: Number(wishlist_id) });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist não existe' });
        }
        console.log(wishlist);
        const productRemove = {
            ...productExists,
        };
        await productRepository_1.productRepository.remove(productRemove);
        return productRemove;
    }
}
exports.WishlistService = WishlistService;
