const express = require('express');
const { ClientController } = require('./controllers/ClientController');
const { ProductController } = require('./controllers/ProductController');
const { UserController } = require('./controllers/UserController');
const { WishlistController } = require('./controllers/WishlistController');
const { authMiddleware } = require('./middlewares/authMiddleware');

const router = express.Router();

router.post('/user', new UserController().createUser
// #swagger.tags = ['User']
// #swagger.description = 'Cria um usuário'
);
router.post('/login', new UserController().login
// #swagger.tags = ['User']
// #swagger.description = 'Faz login no usuário retornando um token'
);

router.use(authMiddleware);

router.get('/wishlists', new WishlistController().listWishlist
// #swagger.tags = ['Wishlist']
// #swagger.description = 'Lista todas wishlist da base'
);

router.post('/wishlist/:wishlist_id/product/:product_id', new WishlistController().addProducttoWishlist
// #swagger.tags = ['Wishlist']
// #swagger.description = 'Adiciona um produto na wishlist'
);

router.delete('/wishlist/:wishlist_id/product/:product_id/delete', new WishlistController().deleteProductFromWishlist
// #swagger.tags = ['Wishlist']
// #swagger.description = 'Deleta um produto da wishlist'
);

router.put('/product/:product_id/update', new ProductController().updateProduct
// #swagger.tags = ['Product']
// #swagger.description = 'Atualiza um produto passando o id'
);
router.post('/products', new ProductController().createProduct
// #swagger.tags = ['Product']
// #swagger.description = 'Cria um produto'
);
router.get('/products', new ProductController().listProduct
// #swagger.tags = ['Product']
// #swagger.description = 'Lista todos os produtos da base'
);
router.get('/products/:product_id', new ProductController().listProductById
// #swagger.tags = ['Product']
// #swagger.description = 'Obtém um produto pelo id'
);
router.delete('/product/:product_id/delete', new ProductController().deleteProduct
// #swagger.tags = ['Product']
// #swagger.description = 'Deleta um produto passando um id'
);

router.put('/client/:client_id/update', new ClientController().updateClient
// #swagger.tags = ['Client']
// #swagger.description = 'Atualiza um cliente passando id'

);
router.delete('/client/:client_id/delete', new ClientController().deleteClient
// #swagger.tags = ['Client']
// #swagger.description = 'Deleta um cliente passando id'
);
router.get('/clients/:client_id', new ClientController().listClientById
// #swagger.tags = ['Client']
// #swagger.description = 'Obtem um cliente pelo ID'

);
router.get('/clients', new ClientController().listClient
// #swagger.tags = ['Client']
// #swagger.description = 'Busca todos os clientes da base'

);
router.post('/clients', new ClientController().createClient
// #swagger.tags = ['Client']
// #swagger.description = 'Cria um cliente'
)




module.exports = router;