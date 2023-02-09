const express = require('express');
const { ClientController } = require('./controllers/ClientController');
const { ProductController } = require('./controllers/ProductController');
const { WishlistController } = require('./controllers/WishlistController');
const clientMiddleware = require('./middlewares/clientMiddleware');

const router = express.Router();


// router.get('/clients', (req, res) => res.status(200).send('router funcionando!'));
router.delete('/client/:client_id/delete', new ClientController().deleteClient);
router.get('/products', new ProductController().listProduct);
router.get('/clients', new ClientController().listClient);
router.get('/wishlists', new WishlistController().listWishlist);
router.post('/clients', new ClientController().createClient);
router.post('/products', new ProductController().createProduct);
router.post('/wishlist/:client_id/create', new WishlistController().createWishlist);
router.post('/wishlist/:wishlist_id/product/:product_id', new WishlistController().addProducttoWishlist);
// router.delete('/clients/:id', clientController.deleteClient);
// router.put('/clients/:id', clientMiddleware.validateBody, clientController.updateClient);


module.exports = router;