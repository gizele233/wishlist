const express = require('express');
const { ClientController } = require('./controllers/ClientController');
const { ProductController } = require('./controllers/ProductController');
const { WishlistController } = require('./controllers/WishlistController');

const router = express.Router();

router.put('/product/:product_id/update', new ProductController().updateProduct);
router.put('/client/:client_id/update', new ClientController().updateClient);
router.delete('/product/:product_id/delete', new ProductController().deleteProduct);
router.delete('/client/:client_id/delete', new ClientController().deleteClient);
router.get('/products', new ProductController().listProduct);
router.get('/clients', new ClientController().listClient);
router.get('/wishlists', new WishlistController().listWishlist);
router.post('/clients', new ClientController().createClient);
router.post('/products', new ProductController().createProduct);
router.post('/wishlist/:client_id/create', new WishlistController().createWishlist);
router.post('/wishlist/:wishlist_id/product/:product_id', new WishlistController().addProducttoWishlist);


module.exports = router;