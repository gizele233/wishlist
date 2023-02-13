"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const clientRepository_1 = require("../repositories/clientRepository");
const productRepository_1 = require("../repositories/productRepository");
const wishlistRepository_1 = require("../repositories/wishlistRepository");
class WishlistService {
    async createWishlist({ client_id }) {
        const clientExists = await clientRepository_1.clientRepository.findOneBy({ client_id: Number(client_id) });
        if (!clientExists) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Customer does not exist'
                }
            };
        }
        const newWishlist = wishlistRepository_1.wishlistRepository.create({ client: clientExists });
        await wishlistRepository_1.wishlistRepository.save(newWishlist);
        return { status: 201, message: newWishlist };
    }
    async addProducttoWishlist({ res, wishlist_id, product_id }) {
        const productExists = await productRepository_1.productRepository.findOne({ where: { product_id: Number(product_id) } });
        if (!productExists) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Product does not exist'
                }
            };
        }
        const wishlist = await wishlistRepository_1.wishlistRepository.findOne({ where: { wishlist_id: Number(wishlist_id) } });
        const productExistsWishlist = await productRepository_1.productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.wishlists", "wishlist")
            .where("product.product_id = :id", { id: product_id })
            .getOne();
        if (!wishlist) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Wishlist does not exist'
                }
            };
        }
        let newWishlist = [wishlist];
        if ((wishlist != null && productExistsWishlist != null)) {
            if (productExistsWishlist.wishlists.some(e => e.wishlist_id == wishlist.wishlist_id)) {
                return {
                    status: 409,
                    message: {
                        status: 409,
                        message: 'The wishlist already have this product'
                    }
                };
            }
            else {
                productExistsWishlist.wishlists.push(wishlist);
                newWishlist = productExistsWishlist.wishlists;
            }
        }
        const productWishlist = productRepository_1.productRepository.create({
            ...productExists,
            wishlists: newWishlist,
        });
        await productRepository_1.productRepository.save(productWishlist);
        return { status: 201, message: productWishlist };
    }
    async listWishlist() {
        const wishlists = await wishlistRepository_1.wishlistRepository.find({
            relations: {
                client: true,
                products: true
            }
        });
        return { status: 200, message: wishlists };
    }
    async deleteProductFromWishlist({ wishlist_id, product_id }) {
        const productExists = await productRepository_1.productRepository.findOneBy({ product_id: Number(product_id) });
        if (!productExists) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Product does not exist'
                }
            };
        }
        const wishlist = await wishlistRepository_1.wishlistRepository.findOneBy({ wishlist_id: Number(wishlist_id) });
        if (!wishlist) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Wishlist não existe'
                }
            };
        }
        const productRemove = await wishlistRepository_1.wishlistRepository.createQueryBuilder("wishlists")
            .leftJoinAndSelect("wishlists.products", "products")
            .where("wishlists.wishlist_id = :id", { id: wishlist_id })
            .getOne();
        if (productRemove != null) {
            productRemove.products = productRemove.products.filter(value => {
                return value.product_id != product_id;
            });
        }
        const productToRemove = wishlistRepository_1.wishlistRepository.create({ ...productRemove });
        await wishlistRepository_1.wishlistRepository.save(productToRemove);
        return { status: 204, message: productRemove };
    }
}
exports.WishlistService = WishlistService;
