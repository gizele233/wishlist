const express = require('express');
const { ClientController } = require('./controllers/ClientController');
const clientMiddleware = require('./middlewares/clientMiddleware');

const router = express.Router();


// router.get('/clients', (req, res) => res.status(200).send('router funcionando!'));
// router.get('/clients', clientController.getAll);
router.post('/clients', new ClientController().createClient);
// router.delete('/clients/:id', clientController.deleteClient);
// router.put('/clients/:id', clientMiddleware.validateBody, clientController.updateClient);


module.exports = router;