const express = require('express');
const clientController = require('./controllers/clientController');
const clientMiddleware = require('./middlewares/clientMiddleware');

const router = express.Router();


// router.get('/clients', (req, res) => res.status(200).send('router funcionando!'));
router.get('/clients', clientController.getAll);
router.post('/clients', clientMiddleware.validateBody, clientController.createClient);
router.delete('/clients/:id', clientController.deleteClient);


module.exports = router;